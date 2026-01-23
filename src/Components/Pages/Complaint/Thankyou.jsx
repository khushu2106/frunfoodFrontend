import React from "react";
import { Link } from "react-router-dom";
import "./Complaint.css";

const ThankYou = () => {
  return (
    <div className="thankyou-container">
      <h1>🎉 Thank You for Shopping!</h1>
      <p>Your order has been placed successfully.</p>

      <div className="thankyou-actions">
        <Link to="/" className="btn">Continue Shopping</Link>
        <Link to="/orders" className="btn outline">View Orders</Link>
      </div>
    </div>
  );
};

export default ThankYou;