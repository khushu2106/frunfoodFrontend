import React, { useState, useEffect } from "react";
import axios from "axios";
import './AdminNavbar.css';

const FAQ = () => {
  const [faqs, setFaqs] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);
  const [newFaq, setNewFaq] = useState({ question: "", answer: "" });
  const [loading, setLoading] = useState(false);

  const BASE_URL = "http://localhost:5000";

  // 1. Fetch FAQs
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

  // 2. Validation & Add Logic
  const handleAddFaq = async (e) => {
    e.preventDefault();
    const { question, answer } = newFaq;

    // 1. Regex to detect 4 or more repeating characters (e.g., qqqq, hhhh, 1111)
    const repeatPattern = /(.)\1{3,}/;

    // 2. Validation Logic
    if (question.trim().length < 10 || answer.trim().length < 10) {
      alert("Validation Error: Both Question and Answer must be at least 10 characters long.");
      return;
    }

    if (repeatPattern.test(question) || repeatPattern.test(answer)) {
      alert("Spam Detected: Please avoid using repetitive characters (e.g., 'qqqq', 'hhhh'). Provide a meaningful sentence.");
      return;
    }

    // 3. Unique Character Check (To prevent gibberish like 'abcabcabcabc')
    const uniqueChars = new Set(answer.toLowerCase().replace(/\s/g, "").split(""));
    if (uniqueChars.size < 5 && answer.length > 15) {
      alert("Invalid Content: The answer seems to be repetitive or meaningless. Please provide more details.");
      return;
    }

    // Proceed with API call if all validations pass
    setLoading(true);
    try {
      await axios.post(`${BASE_URL}/api/faqs`, newFaq);
      alert("Success: The FAQ has been added successfully!");
      setNewFaq({ question: "", answer: "" });
      fetchFAQs();
    } catch (err) {
      console.error(err);
      alert("Server Error: Failed to save the FAQ. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // 3. Delete Logic
  const handleDelete = async (id) => {
    if (!window.confirm("Do you want to delete this ?")) return;
    try {
      await axios.delete(`${BASE_URL}/api/faqs/${id}`);
      fetchFAQs();
    } catch (err) {
      alert("There are some error while deleting this ");
    }
  };

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-container" style={containerStyle}>
      <h2 style={{ textAlign: 'center', color: '#2c3e50', marginBottom: '30px' }}>
        ⚙️ Manage FAQs
      </h2>

      {/* ADD FAQ FORM */}
      <div style={formCardStyle}>
        <h3 style={{ marginTop: 0, fontSize: '18px', color: '#34495e' }}>Add New Question</h3>
        <form onSubmit={handleAddFaq}>
          <div style={{ marginBottom: '15px' }}>
            <label style={labelStyle}>Question</label>
            <input
              type="text"
              placeholder="e.g. How to track my order?"
              value={newFaq.question}
              style={inputStyle}
              onChange={(e) => setNewFaq({ ...newFaq, question: e.target.value })}
              required
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label style={labelStyle}>Answer</label>
            <textarea
              placeholder="e.g. You can track it from the My Orders section."
              value={newFaq.answer}
              style={{ ...inputStyle, height: '80px', resize: 'none' }}
              onChange={(e) => setNewFaq({ ...newFaq, answer: e.target.value })}
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            style={loading ? { ...addBtnStyle, opacity: 0.6, cursor: 'not-allowed' } : addBtnStyle}
          >
            {loading ? "Processing..." : "Save FAQ"}
          </button>
        </form>
      </div>

      {/* FAQ DISPLAY LIST */}
      <div className="faq-list" style={{ marginTop: '20px' }}>
        {faqs.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#bdc3c7' }}>No FAQs available. Add one above!</p>
        ) : (
          faqs.map((item, index) => (
            <div key={item.faq_id} style={faqItemStyle}>
              <div style={faqQuestionStyle} onClick={() => toggleFAQ(index)}>
                <span style={{ fontWeight: '600', color: '#2c3e50' }}>{item.question}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <span style={{ color: '#3498db', fontSize: '20px' }}>
                    {openIndex === index ? "−" : "+"}
                  </span>
                  {/* Delete Button - Hamesha visible */}
                  <button
                    onClick={(e) => { e.stopPropagation(); handleDelete(item.faq_id); }}
                    style={deleteBtnStyle}
                    title="Delete"
                  >
                    🗑️
                  </button>
                </div>
              </div>

              {openIndex === index && (
                <div style={faqAnswerStyle}>
                  {item.answer}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// --- Professional Styles ---
const containerStyle = { maxWidth: '750px', margin: '0 auto', padding: '20px', fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" };
const formCardStyle = { background: '#ffffff', padding: '25px', borderRadius: '10px', border: '1px solid #e0e0e0', marginBottom: '30px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' };
const labelStyle = { display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '5px', color: '#2c3e50' };
const inputStyle = { width: '100%', padding: '12px', borderRadius: '5px', border: '1px solid #dcdde1', boxSizing: 'border-box', outline: 'none', fontSize: '14px' };
const addBtnStyle = { background: '#2ecc71', color: 'white', border: 'none', padding: '12px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', width: '100%', fontSize: '16px' };

const faqItemStyle = { background: '#fff', border: '1px solid #f1f2f6', borderRadius: '8px', marginBottom: '10px', overflow: 'hidden' };
const faqQuestionStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px', cursor: 'pointer', background: '#fdfdfd' };
const faqAnswerStyle = { padding: '15px 18px', color: '#57606f', background: '#fff', borderTop: '1px solid #f1f2f6', lineHeight: '1.5' };
const deleteBtnStyle = { background: '#ff7675', color: 'white', border: 'none', padding: '5px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '14px' };

export default FAQ;