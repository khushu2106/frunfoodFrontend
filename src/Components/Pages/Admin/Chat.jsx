import React, { useState, useEffect } from "react";
import axios from "axios";
import './AdminNavbar.css';

const FAQ = () => {

  const [faqs, setFaqs] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);
  const [newFaq, setNewFaq] = useState({ question: "", answer: "" });
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState("");

  const BASE_URL = "http://localhost:5000";

  /* ================= ROLE CHECK ================= */

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userData"));

    if (storedUser && storedUser.role === "admin") {
      setRole("admin");
    } else {
      setRole("user");
    }
  }, []);

  /* ================= FETCH FAQ ================= */

  const fetchFAQs = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/faqs`);
      setFaqs(res.data);
    } catch (err) {
      console.error("Error fetching FAQs:", err);
    }
  };

  useEffect(() => {
    fetchFAQs();
  }, []);

  /* ================= ADD FAQ ================= */

  const handleAddFaq = async (e) => {
    e.preventDefault();

    const { question, answer } = newFaq;

    const repeatPattern = /(.)\1{3,}/;

    if (question.trim().length < 10 || answer.trim().length < 10) {
      alert("Both Question & Answer must be at least 10 characters.");
      return;
    }

    if (repeatPattern.test(question) || repeatPattern.test(answer)) {
      alert("Avoid repetitive characters.");
      return;
    }

    const uniqueChars = new Set(answer.toLowerCase().replace(/\s/g, "").split(""));
    if (uniqueChars.size < 5 && answer.length > 15) {
      alert("Answer looks meaningless.");
      return;
    }

    setLoading(true);
    try {
      await axios.post(`${BASE_URL}/api/faqs`, newFaq);
      alert("FAQ Added Successfully!");
      setNewFaq({ question: "", answer: "" });
      fetchFAQs();
    } catch (err) {
      alert("Error saving FAQ.");
    } finally {
      setLoading(false);
    }
  };

  /* ================= DELETE ================= */

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this FAQ?")) return;

    try {
      await axios.delete(`${BASE_URL}/api/faqs/${id}`);
      fetchFAQs();
    } catch (err) {
      alert("Delete failed");
    }
  };

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-container" style={containerStyle}>

      <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>
        Manage FAQs
      </h2>

      {/* ================= ADMIN ONLY FORM ================= */}
      {role === "admin" && (
        <div style={formCardStyle}>
          <h3>Add New Question</h3>

          <form onSubmit={handleAddFaq}>
            <div style={{ marginBottom: '15px' }}>
              <label style={labelStyle}>Question</label>
              <input
                type="text"
                value={newFaq.question}
                style={inputStyle}
                onChange={(e) => setNewFaq({ ...newFaq, question: e.target.value })}
                required
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={labelStyle}>Answer</label>
              <textarea
                value={newFaq.answer}
                style={{ ...inputStyle, height: '80px' }}
                onChange={(e) => setNewFaq({ ...newFaq, answer: e.target.value })}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={loading ? { ...addBtnStyle, opacity: 0.6 } : addBtnStyle}
            >
              {loading ? "Saving..." : "Save FAQ"}
            </button>
          </form>
        </div>
      )}

      {/* ================= FAQ LIST ================= */}
      <div style={{ marginTop: '20px' }}>
        {faqs.map((item, index) => (
          <div key={item.faq_id} style={faqItemStyle}>

            <div style={faqQuestionStyle} onClick={() => toggleFAQ(index)}>

              <span>{item.question}</span>

              <div style={{ display: 'flex', gap: '10px' }}>
                <span>{openIndex === index ? "-" : "+"}</span>

                {/* ADMIN ONLY DELETE */}
                {role === "admin" && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(item.faq_id);
                    }}
                    style={deleteBtnStyle}
                  >
                    🗑️
                  </button>
                )}

              </div>
            </div>

            {openIndex === index && (
              <div style={faqAnswerStyle}>
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>

    </div>
  );
};


/* ================= STYLES ================= */

const containerStyle = { maxWidth: '750px', margin: '0 auto', padding: '20px' };
const formCardStyle = { background: '#fff', padding: '20px', borderRadius: '8px', marginBottom: '25px' };
const labelStyle = { display: 'block', marginBottom: '5px', fontWeight: '600' };
const inputStyle = { width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' };
const addBtnStyle = { background: '#2ecc71', color: '#fff', border: 'none', padding: '10px', borderRadius: '5px', cursor: 'pointer', width: '100%' };

const faqItemStyle = { background: '#fff', border: '1px solid #eee', marginBottom: '10px', borderRadius: '6px' };
const faqQuestionStyle = { padding: '15px', display: 'flex', justifyContent: 'space-between', cursor: 'pointer' };
const faqAnswerStyle = { padding: '15px', borderTop: '1px solid #eee' };
const deleteBtnStyle = { background: '#ff7675', color: '#fff', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer' };

export default FAQ;