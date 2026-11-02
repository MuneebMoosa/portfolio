import { useEffect, useRef, useState } from "react";
import { Bot , ChevronRight } from "lucide-react";
import { X } from 'lucide-react';
import { AnimatePresence, motion } from "framer-motion";
import { deleteChatSession, sendChatMessage } from "../services/aiApi";

const SESSION_STORAGE_KEY = "portfolio_chat_session_id";

function LinkifiedText({ text }) {
  const parts = [];
  const urlPattern =
    /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)|(https?:\/\/[^\s<>"']+)/g;
  let lastIndex = 0;
  let match;

  while ((match = urlPattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    const label = match[1] || match[3];
    let url = match[2] || match[3];
    let trailing = "";

    if (!match[1]) {
      const trailingMatch = url.match(/[.,!?;:]+$/);

      if (trailingMatch) {
        trailing = trailingMatch[0];
        url = url.slice(0, -trailing.length);
      }
    }

    parts.push(
      <a
        key={`${match.index}-${url}`}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="underline break-all hover:text-[#D4B783]"
      >
        {label}
      </a>
    );

    if (trailing) {
      parts.push(trailing);
    }

    lastIndex = urlPattern.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
}

const Chatbot = () => {
  const [open, setOpen] = useState(false);

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const sessionIdRef = useRef(sessionStorage.getItem(SESSION_STORAGE_KEY));
  const sendingRef = useRef(false);
  const messagesRef = useRef(null);

  useEffect(() => {
    const container = messagesRef.current;

    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages, loading, open]);

  const startSession = () => {
    let sessionId =
      sessionIdRef.current || sessionStorage.getItem(SESSION_STORAGE_KEY);

    if (!sessionId) {
      sessionId = crypto.randomUUID();
      sessionStorage.setItem(SESSION_STORAGE_KEY, sessionId);
    }

    sessionIdRef.current = sessionId;
    return sessionId;
  };

  const openChat = () => {
    startSession();
    setOpen(true);
  };

  const closeChat = () => {
    const sessionId =
      sessionIdRef.current || sessionStorage.getItem(SESSION_STORAGE_KEY);

    sessionIdRef.current = null;
    sessionStorage.removeItem(SESSION_STORAGE_KEY);

    setOpen(false);
    setMessages([]);
    setInput("");
    setLoading(false);
    sendingRef.current = false;

    if (sessionId) {
      deleteChatSession(sessionId).catch(() => {});
    }
  };

  const sendMessage = async () => {
    const userInput = input.trim();

    if (!userInput || sendingRef.current) return;

    const sessionId = startSession();
    sendingRef.current = true;

    const userMsg = {
      sender: "user",
      text: userInput,
    };

    setMessages((prev) => [...prev, userMsg]);

    setInput("");
    setLoading(true);

    try {
      const reply = await sendChatMessage(sessionId, userInput);

      if (sessionIdRef.current === sessionId) {
        const botMsg = {
          sender: "bot",
          text: reply,
        };

        setMessages((prev) => [...prev, botMsg]);
      }
    } catch {
      if (sessionIdRef.current === sessionId) {
        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text: "Sorry, the assistant is unavailable right now. Please try again in a moment.",
          },
        ]);
      }
    } finally {
      if (sessionIdRef.current === sessionId) {
        sendingRef.current = false;
        setLoading(false);
      }
    }
  };
  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 40 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-20 right-4 w-80 h-[420px] bg-[#0A0D16] rounded-2xl border border-[#D4B783] shadow-2xl z-50   flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#D4B783] text-black h-10 p-2  flex items-center justify-between rounded-t-xl">
              <div className="flex items-center gap-2">
                <Bot size={20} />
                <span className="font-semibold">Ask Muneeb's Ai</span>
              </div>
              <button className='cursor-pointer' onClick={closeChat}><X/></button>
            </div>

            {/* Messages Area */}
            <div
              ref={messagesRef}
              className="flex-1 mt-2 p-3 overflow-y-auto space-y-2 rounded-xl"
            >
              {messages.length === 0 && (
                <div className="bg-[#2a3441] text-white p-2 rounded-lg w-fit max-w-[75%] whitespace-pre-wrap break-words text-left">
                  Hello!!! How can I help you?
                </div>
              )}
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`p-2 rounded-lg w-fit max-w-[75%] whitespace-pre-wrap break-words ${
                    msg.sender === "user"
                      ? "bg-[#D4B783] text-black ml-auto text-left"
                      : "bg-[#2a3441] text-white mr-auto text-left"
                  }`}
                >
                  {msg.sender === "user" ? (
                    msg.text
                  ) : (
                    <LinkifiedText text={msg.text} />
                  )}
                </div>
              ))}
              {loading && (
                <div className="text-gray-400 text-sm text-left mr-auto">
                  Typing...
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="mt-2 border-t border-[#D4B783] p-2 bg-[#0A0D16]  flex gap-2 ">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                type="text"
                placeholder="Type a message..."
                className="flex-1 border border-[#D4B783] rounded-lg px-3 py-2 text-sm text-[#D4B783] outline-none bg-[#192029]"
              />
              <button 
              onClick={sendMessage}
              className="bg-[#D4B783] border border-[#D4B783] text-[#192029] px-1 rounded-lg text-sm  cursor-pointer">
                <ChevronRight/>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <div
        onClick={() => (open ? closeChat() : openChat())}
        className="fixed bottom-4 right-4 w-14 h-14 rounded-full bg-[#D4B783] text-black flex justify-center items-center cursor-pointer shadow-lg hover:scale-110 transition"
      >
        <Bot size={28} />
      </div>
    </>
  );
};

export default Chatbot;