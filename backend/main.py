import os
import yaml
from pathlib import Path
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from dotenv import load_dotenv
import httpx

load_dotenv()

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
class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    response: str
    model_used: str

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
    """
    user_message = request.message.strip()
    if not user_message:
        raise HTTPException(status_code=400, detail="Message cannot be empty")

    if not OPENROUTER_API_KEY:
        # Fallback: return helpful local response
        return ChatResponse(
            response="Lo siento, el servicio de IA no está configurado en este momento. Intenta de nuevo más tarde.",
            model_used="local-fallback"
        )

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
    messages = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": user_message}
    ]

    for model in models_to_try:
        try:
            async with httpx.AsyncClient() as client:
                response = await client.post(
                    f"{OPENROUTER_BASE_URL}/chat/completions",
                    headers=headers,
                    json={
                        "model": model,
                        "messages": messages,
                        "max_tokens": 800,
                        "temperature": 0.7
                    },
                    timeout=30.0
                )

                if response.status_code == 200:
                    data = response.json()
                    assistant_message = data["choices"][0]["message"]["content"]
                    return ChatResponse(
                        response=assistant_message,
                        model_used=model
                    )
                elif response.status_code == 429:
                    continue
                else:
                    continue

        except Exception as e:
            print(f"Error with model {model}: {e}")
            continue

    # All models failed, return local fallback
    fallback_responses = {
        "¿quién es jaime": "Jaime Cardona Montero es un Ingeniero de Sistemas graduado de la Universidad de San Buenaventura Cali, especializado en IA, datos y arquitectura de software. Construye sistemas completos que conectan problemas reales con inteligencia artificial.",
        "agropilot": "Agropilot CM es un ecosistema inteligente para modernizar la gestión agropecuaria colombiana. Integra React frontend, FastAPI backend, PostgreSQL, modelos de ML y asistentes conversacionales con RAG.",
        "rckt": "En RCKT, Jaime trabaja como AI & Data Engineer, construyendo soluciones AI-first orientadas a producto. Participa en proyectos como Elite Beauty Agent, Voz Estratégica y arquitectura de sistemas escalables.",
        "ieee": "Jaime tiene dos publicaciones en IEEE CONCAPAN 2025 sobre arquitecturas híbridas de IA para agricultura y dimensiones ambientales de la inteligencia artificial.",
    }

    for key, value in fallback_responses.items():
        if key in user_message.lower():
            return ChatResponse(response=value, model_used="local-fallback")

    return ChatResponse(
        response="Interesante pregunta. Lamentablemente, el servicio de IA está temporalmente no disponible, pero te recomiendo explorar las secciones de Historia, Proyectos y Experiencia en el portafolio.",
        model_used="local-fallback"
    )

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
    uvicorn.run(app, host="0.0.0.0", port=8000)
