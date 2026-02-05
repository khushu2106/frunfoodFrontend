import React, { useState } from "react";
import "./FAQ.css";

const faqData = [
  {
    question: "How do I place an order?",
    answer: "You can place an order by selecting products, adding them to cart and completing checkout."
  },
  {
    question: "What payment methods are available?",
    answer: "We accept UPI, Debit Card, Credit Card and Cash on Delivery."
  },
  {
    question: "How long does delivery take?",
    answer: "Delivery usually takes 3–5 working days."
  },
  {
    question: "Can I return a product?",
    answer: "Yes, products can be returned within 7 days if unused and in original packaging."
  }
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      <h2 className="faq-title">Frequently Asked Questions</h2>

      {faqData.map((item, index) => (
        <div className="faq-item" key={index}>
          <div className="faq-question" onClick={() => toggleFAQ(index)}>
            {item.question}
            <span>{activeIndex === index ? "-" : "+"}</span>
          </div>

          {activeIndex === index && (
            <div className="faq-answer">{item.answer}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQ;