
from collections import defaultdict, deque

# Each session stores a maximum of 10 messages.
conversation_memory = defaultdict(
    lambda: deque(maxlen=10)
)


def get_history(session_id: str):
    return list(conversation_memory.get(session_id, []))


def save_message(session_id: str, role: str, content: str):
    conversation_memory[session_id].append({
        "role": role,
        "content": content
    })


def delete_session(session_id: str):
    conversation_memory.pop(session_id, None)
