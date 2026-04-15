import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FaComments, FaTimes, FaDog, FaPaperPlane, FaRobot } from 'react-icons/fa';
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

    useEffect(() => { 
        if (isOpen) chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); 
    }, [chat, isOpen]);

    const handleNavigation = (type, id) => {
        if (type === "category") {
            window.location.href = `/category/${id}`;
        } else if (type === "product") {
            window.location.href = `/product/${id}`;
        } else if (type === "brand") {
            window.location.href = `/brands/${id}`;
        }
    };

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
            {/* FLOATING ICON */}
            <div className={`chat-icon ${isOpen ? "active" : ""}`} onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <FaTimes /> : <FaComments size={32} />}
            </div>

            {isOpen && (
                <div className="chat-window">
                    {/* HEADER */}
                    <div className="chat-header">
                        <div className="header-info">
                            <div className="bot-avatar">
                                <FaDog size={18} />
                            </div>
                            <div className="header-text">
                                <strong>Fur & Food AI</strong>
                                <span className="online-status"><span className="dot"></span> Online</span>
                            </div>
                        </div>
                        <FaTimes className="close-x" onClick={() => setIsOpen(false)} />
                    </div>

                    {/* CHAT BODY */}
                    <div className="chat-body">
                        {chat.map((msg, i) => (
                            <div key={i} className={`message-bubble ${msg.sender}`}>
                                {msg.img && <img src={msg.img} alt="upload" className="chat-preview-img" />}
                                <div className="msg-text-container">
                                    {msg.sender === "bot" ? renderMessageWithLinks(msg.text) : msg.text}
                                </div>
                            </div>
                        ))}
                        {isTyping && <div className="typing">Typing ...  🐶</div>}
                        <div ref={chatEndRef} />
                    </div>

                    {/* FOOTER */}
                    <div className="chat-footer">
                         <input 
                            type="text" 
                            value={message} 
                            placeholder="Type a message..." 
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                        />
                        <button className="send-btn" onClick={sendMessage}>
                            <FaPaperPlane />
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Chatbot;