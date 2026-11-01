
from fastapi import FastAPI

from app.routes.chat import router as chat_router

app = FastAPI(title="Portfolio AI Service")

app.include_router(chat_router)


@app.get("/health")
def health_check():
    return {
        "status": "ok",
        "service": "portfolio-ai",
    }
