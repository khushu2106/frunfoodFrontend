import React from "react";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="payment-success">
      <div className="success-card">
        <h1>✅ Payment Successful</h1>
        <p>Thank you for shopping with us 💖</p>
        <p>Your order has been placed successfully.</p>

        <button onClick={() => navigate("/")}>
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;