import os
import yaml
from pathlib import Path
from typing import Optional, List, Literal
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, Field, ConfigDict
from dotenv import load_dotenv
import httpx

# Load .env from project root (not from backend directory)
env_path = Path(__file__).parent.parent / ".env"
load_dotenv(dotenv_path=env_path, override=True)
print(f"📁 Loading .env from: {env_path}")
print(f"✅ .env exists: {env_path.exists()}")

app = FastAPI(title="JAC-IA Portfolio API", version="1.0.0")

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configuration
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
OPENROUTER_BASE_URL = "https://openrouter.ai/api/v1"

# Load content YAML files
def load_yaml(filename: str):
    filepath = Path(__file__).parent.parent / "content" / f"{filename}.yml"
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            return yaml.safe_load(f)
    except Exception as e:
        print(f"Error loading {filename}: {e}")
        return {}

PROFILE = load_yaml("profile")
EXPERIENCE = load_yaml("experience")
PROJECTS = load_yaml("projects")
STORY = load_yaml("story")
PUBLICATIONS = load_yaml("publications")

def build_system_prompt():
    """Build system prompt with Jaime's information."""
    profile = PROFILE or {}

    prompt = """Eres JAC-IA, el asistente conversacional de Jaime Cardona Montero.

SOBRE JAIME CARDONA MONTERO:
"""

    # Profile info
    if profile.get('name'):
        prompt += f"- Nombre: {profile.get('name')}\n"
    if profile.get('title'):
        prompt += f"- Profesión: {profile.get('title')}\n"
    if profile.get('location'):
        prompt += f"- Ubicación: {profile.get('location')}\n"
    if profile.get('brand_statement'):
        prompt += f"- Lema: {profile.get('brand_statement')}\n"

    # Quick experience summary
    prompt += "\nEXPERIENCIA PROFESIONAL:\n"
    if EXPERIENCE and EXPERIENCE.get('experiences'):
        for exp in EXPERIENCE['experiences'][:3]:  # Top 3
            prompt += f"- {exp.get('company', 'N/A')}: {exp.get('position', 'N/A')}\n"

    # Projects summary
    prompt += "\nPROYECTOS DESTACADOS:\n"
    if PROJECTS and PROJECTS.get('projects'):
        for proj in PROJECTS['projects'][:4]:  # Top 4
            if proj.get('featured'):
                prompt += f"- {proj.get('name', 'N/A')}: {proj.get('tagline', 'N/A')}\n"

    prompt += """

INSTRUCCIONES:
1. Responde en español, de forma amable pero técnica.
2. Sé autén­tico y refleja la personalidad de Jaime: fuerte, técnico, ambicioso, auténtico.
3. Proporciona información real basada en el contexto disponible.
4. Si no tienes información sobre algo, sé honesto y sugiere otras preguntas.
5. Evita respuestas genéricas; sé específico y contundente.
6. Mantén respuestas concisas pero completas (máximo 200 palabras).
"""

    return prompt

# Models
class ChatHistoryItem(BaseModel):
    role: Literal["user", "assistant"]
    content: str = Field(min_length=1, max_length=4000)

class ChatRequest(BaseModel):
    message: str = Field(min_length=1, max_length=2000)
    session_id: str = Field(min_length=1, max_length=120)
    history: List[ChatHistoryItem] = Field(default_factory=list)
    route: str = Field(default="/", max_length=300)
    language: Literal["es", "en"] = "es"

class ChatSource(BaseModel):
    type: str
    slug: str
    title: str
    section: Optional[str] = None
    route: Optional[str] = None

class ChatAction(BaseModel):
    label: str
    route: str

class ChatResponse(BaseModel):
    model_config = ConfigDict(protected_namespaces=())

    answer: str
    model_used: str
    fallback_used: bool = False
    retrieval_used: bool = False
    sources: List[ChatSource] = Field(default_factory=list)
    actions: List[ChatAction] = Field(default_factory=list)

# Endpoints
@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "message": "JAC-IA Portfolio API is running"
    }

@app.post("/api/chat")
async def chat_with_jac_ia(request: ChatRequest):
    """
    Conversational endpoint for JAC-IA assistant with OpenRouter integration.
    Expects: message, session_id, history, route, language.
    """
    user_message = request.message.strip()

    if not user_message:
        raise HTTPException(status_code=400, detail="Message cannot be empty")

    if not OPENROUTER_API_KEY:
        print("⚠️ OPENROUTER_API_KEY not configured")
        raise HTTPException(status_code=500, detail="API key not configured. JAC-IA cannot respond.")

    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json",
        "HTTP-Referer": "https://jaime-cardona.dev",
        "X-Title": "JAC-IA Portfolio Assistant"
    }

    models_to_try = [
        "google/gemma-3-4b-it:free",
        "openrouter/free"
    ]

    system_prompt = build_system_prompt()

    # Include conversation history for context
    messages = []
    for item in request.history[-10:]:  # Last 10 messages for context
        messages.append({
            "role": item.role,
            "content": item.content
        })
    # Add current message
    messages.append({
        "role": "user",
        "content": user_message
    })

    for model in models_to_try:
        try:
            print(f"🤖 Trying model: {model}")
            async with httpx.AsyncClient(timeout=30.0) as client:
                response = await client.post(
                    f"{OPENROUTER_BASE_URL}/chat/completions",
                    headers=headers,
                    json={
                        "model": model,
                        "messages": [
                            {"role": "system", "content": system_prompt},
                            *messages
                        ],
                        "max_tokens": 800,
                        "temperature": 0.7,
                        "top_p": 0.8
                    }
                )

                print(f"📡 Response status: {response.status_code}")

                if response.status_code == 200:
                    data = response.json()
                    assistant_message = data["choices"][0]["message"]["content"]
                    print(f"✅ Success with {model}")
                    return ChatResponse(
                        answer=assistant_message,
                        model_used=model,
                        fallback_used=False,
                    )
                elif response.status_code == 429:
                    print(f"⏳ Rate limited on {model}, trying next...")
                    continue
                else:
                    print(f"❌ Error {response.status_code} on {model}")
                    print(f"Response: {response.text}")
                    continue

        except httpx.TimeoutException:
            print(f"⏱️ Timeout on {model}")
            continue
        except Exception as e:
            print(f"❌ Exception with {model}: {type(e).__name__}: {e}")
            continue

    # All models failed
    print("🚨 All models failed, cannot provide response")
    raise HTTPException(
        status_code=503,
        detail="All LLM models are currently unavailable. Please try again later."
    )


def _get_fallback_response(user_message: str) -> str:
    """Get contextual fallback response when LLM is unavailable."""
    return f"Lo siento, los modelos de IA no están disponibles en este momento. Tu pregunta fue: '{user_message}'. Por favor, intenta de nuevo en unos momentos."

@app.post("/api/rag")
async def rag_query(query: dict):
    """
    RAG endpoint with pgvector placeholder (Supabase-ready).
    """
    return {
        "query": query.get("text"),
        "results": [],
        "message": "RAG implementation ready for pgvector backend"
    }

@app.get("/api/profile")
async def get_profile():
    """Get Jaime Cardona's profile information."""
    profile = PROFILE or {}
    return {
        "name": profile.get("name", "Jaime Cardona"),
        "title": profile.get("title", "AI & Data Engineer"),
        "email": profile.get("email", "jaime.cardona@rckt.es"),
        "location": profile.get("location", "Cali, Colombia"),
        "bio": profile.get("bio", "Building intelligent systems.")
    }

@app.get("/api/projects")
async def get_projects():
    """Get featured projects."""
    projects = PROJECTS or {}
    featured = [p for p in projects.get("projects", []) if p.get("featured")]
    return {"projects": featured}

@app.get("/api/experience")
async def get_experience():
    """Get professional experience."""
    experience = EXPERIENCE or {}
    return {"experiences": experience.get("experiences", [])}

# Serve static files (built frontend)
if os.path.exists("static"):
    app.mount("/", StaticFiles(directory="static", html=True), name="static")

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", "8100"))
    uvicorn.run(app, host="0.0.0.0", port=port)
