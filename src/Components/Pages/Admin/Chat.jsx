import React, { useState } from "react";
import './AdminNavbar.css';

const FAQ = () => {
  const faqData = [
    { question: "How can I place an order?", answer: "You can add products to your cart and proceed to checkout." },
    { question: "What payment methods are available?", answer: "We accept Credit/Debit cards, UPI, and Cash on Delivery." },
    { question: "How can I track my order?", answer: "After placing the order, you can track it from the 'My Orders' section." },
    { question: "Can I return a product?", answer: "Yes, products can be returned within 7 days of delivery as per our return policy." },
    { question: "Do you offer discounts?", answer: "We frequently offer discounts and offers. Check the 'Offers' section for current deals." },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      <h2>Frequently Asked Questions</h2>
      <div className="faq-list">
        {faqData.map((item, index) => (
          <div key={index} className="faq-item">
            <div className="faq-question" onClick={() => toggleFAQ(index)}>
              {item.question}
              <span className="faq-toggle">{openIndex === index ? "-" : "+"}</span>
            </div>
            {openIndex === index && <div className="faq-answer">{item.answer}</div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
