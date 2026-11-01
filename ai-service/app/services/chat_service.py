
import json
from groq import Groq
from app.core.config import GROQ_API_KEY
from app.core.prompt import SYSTEM_PROMPT

client = Groq(api_key=GROQ_API_KEY)


def generate_reply( message: str, portfolio_data: dict, conversation_history: list ) -> str:

    context = json.dumps( portfolio_data, indent=2, ensure_ascii=False )
    messages = [
        {
            "role": "system",
            "content": (
                f"{SYSTEM_PROMPT}\n\n"
                f"Portfolio information:\n{context}"
            )
        },
        *conversation_history,
        {
            "role": "user",
            "content": message
        }
    ]

    completion = client.chat.completions.create(
        model="openai/gpt-oss-120b",
        messages=messages,
        temperature=0.3,
        max_completion_tokens=500
    )

    return (
        completion.choices[0].message.content
        or "I couldn't generate a response."
    )
