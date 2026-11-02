import os

from dotenv import load_dotenv

load_dotenv()

GROQ_API_KEY = os.getenv("GROQ_API_KEY")

if not GROQ_API_KEY:
    raise ValueError("GROQ_API_KEY is not configured")

BACKEND_URL = os.getenv("BACKEND_URL", "http://backend:8000").rstrip("/")

PUBLIC_BACKEND_URL = os.getenv(
    "PUBLIC_BACKEND_URL", "http://localhost:8000"
).rstrip("/")

FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5173").rstrip("/")

CORS_ORIGINS = [
    origin.strip().rstrip("/")
    for origin in os.getenv(
        "CORS_ORIGINS",
        f"{FRONTEND_URL},http://127.0.0.1:5173",
    ).split(",")
    if origin.strip()
]
