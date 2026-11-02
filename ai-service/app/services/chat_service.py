
import json
import re

from groq import Groq
from app.core.config import GROQ_API_KEY
from app.core.prompt import SYSTEM_PROMPT

client = Groq(api_key=GROQ_API_KEY)

CV_QUERY_PATTERN = re.compile(
    r"\b(cv|resume|résumé|curriculum\s+vitae)\b",
    re.IGNORECASE,
)


def add_cv_download_link(message, reply, portfolio_data):
    if not CV_QUERY_PATTERN.search(message):
        return reply

    cv = portfolio_data.get("cv") or {}
    download_url = cv.get("downloadUrl") if isinstance(cv, dict) else None

    if download_url:
        if download_url in reply:
            return reply

        return f"{reply.rstrip()}\n\nDownload CV: {download_url}"

    lowered_reply = reply.lower()

    if (
        "not available" in lowered_reply
        or "not uploaded" in lowered_reply
        or "hasn't uploaded" in lowered_reply
        or "has not uploaded" in lowered_reply
    ):
        return reply

    return f"{reply.rstrip()}\n\nMuneeb has not uploaded a CV yet."


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

    reply = (
        completion.choices[0].message.content
        or "I couldn't generate a response."
    )

    return add_cv_download_link(message, reply, portfolio_data)
