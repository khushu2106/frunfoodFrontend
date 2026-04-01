import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./Chatbot.css";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([{ sender: "bot", text: "Woof! 🐾 How can I help your furry friend today?" }]);
  const chatEndRef = useRef(null);

  const token = localStorage.getItem("userToken");

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [chat, isOpen]);

  if (!token) return null;

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMsg = { sender: "user", text: message };
    setChat(prev => [...prev, userMsg]);
    const currentInput = message;
    setMessage("");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/chatbot/send",
        { message: currentInput },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setChat(prev => [...prev, { sender: "bot", text: res.data.reply }]);
    } catch (err) {
      setChat(prev => [...prev, { sender: "bot", text: "Something went wrong. Please try again later. 🦴" }]);
    }
  };

  return (
    <>
      {/* Floating Message Icon */}
      <div className={`chat-icon ${isOpen ? 'active' : ''}`} onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? (
          "✕"
        ) : (
          <svg viewBox="0 0 24 24" width="30" height="30" fill="currentColor">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12z" />
          </svg>
        )}
      </div>

      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <div className="header-info">
              <span className="dot"></span>
              <span>Fur & Food Assistant</span>
            </div>
            <span className="close-x" onClick={() => setIsOpen(false)}>✕</span>
          </div>

          <div className="chat-body">
            {chat.map((msg, index) => (
              <div key={index} className={`message-bubble ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          <div className="chat-footer">
            <input
              type="text"
              value={message}
              placeholder="Type your message..."
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button className="send-btn" onClick={sendMessage}>
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;