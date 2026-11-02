import logging

from uuid import UUID
from pydantic import BaseModel
from fastapi import APIRouter, HTTPException

from app.schemas.chat import ChatRequest, ChatResponse
from app.services.chat_service import generate_reply
from app.services.portfolio_service import get_all_portfolio_data
from app.services.memory_service import  ( get_history, save_message, delete_session )

router = APIRouter()
logger = logging.getLogger(__name__)

class SessionRequest(BaseModel):
    session_id: UUID

@router.post("/chat", response_model=ChatResponse)

def chat(request: ChatRequest, session_id: UUID):
    session_key = str(session_id)
    try:
        history = get_history(session_key)
        portfolio_data = get_all_portfolio_data()

        reply = generate_reply(
            request.message,
            portfolio_data,
            history
        )

        save_message(session_key, "user", request.message)
        save_message(session_key, "assistant", reply)

        return ChatResponse(reply=reply)

    except Exception:
        logger.exception("Groq API request failed")
        
        raise HTTPException(
            status_code=502,
            detail="Failed to get a response from the AI provider.",
        )

@router.delete("/chat/session/{session_id}")
def close_chat_session(session_id: UUID):
    delete_session(str(session_id))

    return {
        "success": True,
        "message": "Conversation session closed."
    }


