import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./Chatbot.css";

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [chat, setChat] = useState([{ sender: "bot", text: "Woof! 🐾 How can I help you today?" }]);
    const [isTyping, setIsTyping] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const chatEndRef = useRef(null);
    const token = localStorage.getItem("userToken");
    const userId = localStorage.getItem("userId");

    useEffect(() => { if (isOpen) chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [chat, isOpen]);

    // --- NAVIGATION LOGIC ---
    // const handleNavigation = (type, id) => {
    //     // Change this URL to match your website's actual route structure
    //     window.location.href = `/shop/${type}/${id}`;
    // };

    const handleNavigation = (type, id) => {
    if (type === "category") {
        window.location.href = `/category/${id}`;
    } else if (type === "product") {
        window.location.href = `/product/${id}`;
    } else if (type === "brand") {
        window.location.href = `/brands/${id}`;
    }
};

    // --- MESSAGE PARSER ---
    const renderMessageWithLinks = (text) => {
        const regex = /\[(.*?)\]\(route:(.*?):(.*?)\)/g;
        const parts = [];
        let lastIndex = 0;
        let match;

        while ((match = regex.exec(text)) !== null) {
            parts.push(text.substring(lastIndex, match.index));
            const [_, name, type, id] = match;
            parts.push(
                <button key={match.index} className="chat-nav-link" onClick={() => handleNavigation(type, id)}>
                    {name}
                </button>
            );
            lastIndex = regex.lastIndex;
        }
        parts.push(text.substring(lastIndex));
        return parts;
    };

    const sendMessage = async () => {
        if ((!message.trim() && !selectedImage) || isTyping) return;

        const userMsg = message;
        const userImg = selectedImage;

        setChat(prev => [...prev, { sender: "user", text: userMsg, img: userImg }]);
        setMessage("");
        setSelectedImage(null);
        setIsTyping(true);

        try {
            const res = await axios.post("http://localhost:5000/api/chatbot/send", 
                { user_id: userId, message: userMsg, image: userImg },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setChat(prev => [...prev, { sender: "bot", text: res.data.reply }]);
        } catch (err) {
            setChat(prev => [...prev, { sender: "bot", text: "Connection error. 🐾" }]);
        } finally {
            setIsTyping(false);
        }
    };

    if (!token) return null;

    return (
        <>
            <div className={`chat-icon ${isOpen ? "active" : ""}`} onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? "✕" : "🐾"}
            </div>

            {isOpen && (
                <div className="chat-window">
                    <div className="chat-header">
                        <span>Fur & Food AI</span>
                        <span onClick={() => setIsOpen(false)} style={{cursor:'pointer'}}>✕</span>
                    </div>

                    <div className="chat-body">
                        {chat.map((msg, i) => (
                            <div key={i} className={`message-bubble ${msg.sender}`}>
                                {msg.img && <img src={msg.img} alt="upload" className="chat-preview-img" />}
                                <div className="msg-text-container">
                                    {msg.sender === "bot" ? renderMessageWithLinks(msg.text) : msg.text}
                                </div>
                            </div>
                        ))}
                        {isTyping && <div className="typing">Typing .. 🐶</div>}
                        <div ref={chatEndRef} />
                    </div>

                    {/* ... rest of your footer code (voice, image input, etc) ... */}
                    <div className="chat-footer">
                         <input 
                            type="text" 
                            value={message} 
                            placeholder="Ask about brands..." 
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                        />
                        <button onClick={sendMessage}>➤</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Chatbot;