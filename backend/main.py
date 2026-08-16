import os
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

# Models
class ChatMessage(BaseModel):
    role: str
    content: str

class ConversationRequest(BaseModel):
    messages: list[ChatMessage]
    model: str = "google/gemma-3-4b-it:free"

class ConversationResponse(BaseModel):
    response: str
    model_used: str

# Endpoints
@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "message": "JAC-IA Portfolio API is running"
    }

@app.post("/api/chat", response_model=ConversationResponse)
async def chat_with_jac_ia(request: ConversationRequest):
    """
    Conversational endpoint for JAC-IA assistant with OpenRouter integration.
    Cascade: google/gemma-3-4b-it:free -> openrouter/free
    """
    if not OPENROUTER_API_KEY:
        raise HTTPException(status_code=500, detail="OpenRouter API key not configured")

    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json",
        "HTTP-Referer": "https://jaime-cardona.com",
        "X-Title": "JAC-IA Portfolio Assistant"
    }

    models_to_try = [
        "google/gemma-3-4b-it:free",
        "openrouter/free"
    ]

    # Format messages for OpenRouter API
    messages = [
        {"role": msg.role, "content": msg.content}
        for msg in request.messages
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
                        "max_tokens": 1000,
                        "temperature": 0.7
                    },
                    timeout=30.0
                )

                if response.status_code == 200:
                    data = response.json()
                    assistant_message = data["choices"][0]["message"]["content"]
                    return ConversationResponse(
                        response=assistant_message,
                        model_used=model
                    )
                elif response.status_code == 429:
                    # Rate limited, try next model
                    continue
                else:
                    # Try next model
                    continue

        except Exception as e:
            # Try next model on error
            continue

    raise HTTPException(
        status_code=503,
        detail="All OpenRouter models unavailable. Please try again later."
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
    """
    Get Jaime Cardona's profile information.
    """
    return {
        "name": "Jaime Cardona",
        "title": "Software Engineer & Agrotech Innovator",
        "email": "jaime.cardona@rckt.es",
        "bio": "Building intelligent systems at the intersection of technology and agriculture."
    }

# Serve static files (built frontend)
if os.path.exists("static"):
    app.mount("/", StaticFiles(directory="static", html=True), name="static")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
