const AI_API_URL = (
  import.meta.env.VITE_AI_API_URL || "http://localhost:8001"
).replace(/\/$/, "");

export const sendChatMessage = async (sessionId, message) => {
  const response = await fetch(
    `${AI_API_URL}/chat?session_id=${encodeURIComponent(sessionId)}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    }
  );

  if (!response.ok) {
    throw new Error(`AI service request failed with status ${response.status}`);
  }

  const data = await response.json();

  if (!data || typeof data.reply !== "string") {
    throw new Error("AI service returned an invalid response");
  }

  return data.reply;
};

export const deleteChatSession = async (sessionId) => {
  const response = await fetch(
    `${AI_API_URL}/chat/session/${encodeURIComponent(sessionId)}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    throw new Error(`AI session deletion failed with status ${response.status}`);
  }
};
