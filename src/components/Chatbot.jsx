import { useState } from "react";
import { Bot , ChevronRight } from "lucide-react";
import { X } from 'lucide-react';
import { AnimatePresence, motion } from "framer-motion";

const Chatbot = () => {
  const [open, setOpen] = useState(false);

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
  if (!input.trim()) return;

  const userMsg = { sender: "user", text: input };
  setMessages(prev => [...prev, userMsg]);
  setInput("");
  setLoading(true);

  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();

    const botMsg = { sender: "bot", text: data.reply };
    setMessages(prev => [...prev, botMsg]);
  } catch {
    setMessages(prev => [
      ...prev,
      { sender: "bot", text: "Error occurred" },
    ]);
  }

  setLoading(false);
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
            className="fixed bottom-20 right-4 w-80 h-[420px] bg-[#0A0D16] rounded-2xl border border-[#D4B783] shadow-2xl z-11  flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#D4B783] text-black h-10 p-2  flex items-center justify-between rounded-t-xl">
              <div className="flex items-center gap-2">
                <Bot size={20} />
                <span className="font-semibold">Ask Muneeb's Ai</span>
              </div>
              <button className='cursor-pointer' onClick={() => setOpen(false)}><X/></button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 mt-2 p-3 overflow-y-auto space-y-2 rounded-xl">
              {messages.length === 0 && (
                <div className="bg-[#2a3441] text-white p-2 rounded-lg w-fit max-w-[75%]">
                  Hello!!! How can I help you?
                </div>
              )}
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`p-2 rounded-lg w-fit max-w-[75%] ${
                    msg.sender === "user"
                      ? "bg-[#D4B783] text-black ml-auto"
                      : "bg-[#2a3441] text-white"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
              {loading && (
                <div className="text-gray-400 text-sm">Typing...</div>
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
        onClick={() => setOpen(!open)}
        className="fixed bottom-4 right-4 w-14 h-14 rounded-full bg-[#D4B783] text-black flex justify-center items-center cursor-pointer shadow-lg hover:scale-110 transition"
      >
        <Bot size={28} />
      </div>
    </>
  );
};

export default Chatbot;