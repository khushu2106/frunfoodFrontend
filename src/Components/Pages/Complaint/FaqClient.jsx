import React, { useEffect, useState } from "react";
import axios from "axios";

const FaqClient = () => {

  const [faqs, setFaqs] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);

  const BASE_URL = "http://localhost:5000";

  useEffect(() => {
    fetchFAQs();
  }, []);

  const fetchFAQs = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/faqs`);
      setFaqs(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div style={containerStyle}>
      <h2 style={{marginBottom:"40px"}}>Frequently Asked Questions</h2>

      {faqs.map((item, index) => (
        <div key={item.faq_id} style={faqItemStyle}>

          <div
            style={faqQuestionStyle}
            onClick={() => toggleFAQ(index)}
          >
            {item.question}
            <span>{openIndex === index ? "-" : "+"}</span>
          </div>

          {openIndex === index && (
            <div style={faqAnswerStyle}>
              {item.answer}
            </div>
          )}

        </div>
      ))}
    </div>
  );
};

const containerStyle = { maxWidth: "700px", margin: "auto", padding: "20px" };
const faqItemStyle = { border: "1px solid #eee", marginBottom: "10px", borderRadius: "6px" };
const faqQuestionStyle = { padding: "15px", cursor: "pointer", display: "flex", justifyContent: "space-between" };
const faqAnswerStyle = { padding: "15px", borderTop: "1px solid #eee" };

export default FaqClient;