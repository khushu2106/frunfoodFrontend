import React from "react";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";

const PaymentFailed = () => {
  const navigate = useNavigate();

  return (
    <div className="payment-failed">
      <div className="failed-card">
        <h1>❌ Payment Failed</h1>
        <p>Your payment could not be completed.</p>
        <p>Please try again.</p>

        <div className="btn-group">
          {/* 🔁 RETRY PAYMENT */}
          <button
            className="retry"
            onClick={() => navigate("/payment")}
          >
            Retry Payment
          </button>

          <button
            className="home"
            onClick={() => navigate("/")}
          >
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailed;