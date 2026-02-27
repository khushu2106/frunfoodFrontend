import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode"; // ✅ Vite compatible version 3.1.2
import "./Feedback.css";

const Feedback = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { sales_id, product_id } = location.state || {};
  const token = localStorage.getItem("userToken");

  // --- Decode user_id from token ---
  let user_id = null;
  if (token) {
    try {
      const decoded = jwt_decode(token); // decode token
      user_id = decoded.user_id || decoded.id; // backend me jo key hai uske hisab se
    } catch (err) {
      console.error("Token decode failed", err);
    }
  }

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (rating === 0) {
      alert("Please select a rating");
      return;
    }

    if (!user_id) {
      alert("User not identified. Please login again.");
      navigate("/login");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/feedback",
        {
          user_id,
          product_id,
          rate: rating,
          comment,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert(res.data.message || "Feedback submitted successfully ❤️");
      navigate("/myorders");
    } catch (err) {
      console.error(err);

      // Friendly message for duplicate entry
      if (
        err.response?.data?.error &&
        err.response.data.error.includes("Duplicate entry")
      ) {
        alert("You have already submitted feedback for this product. ✅");
      } else {
        alert(err.response?.data?.error || "Feedback submission failed ❌");
      }
    }
  };

  return (
    <>
      <div className="back-wrapper">
        <h4 className="back-home" onClick={() => navigate("/")}>
          ← Back to Home
        </h4>
      </div>

      <div className="feedback-container">

        {/* 🔙 Back Button - LEFT SIDE */}
        <div className="feedback-card">
          <h2>Customer Feedback</h2>
          <p className="subtitle">Rate your experience</p>

          {/* ⭐ Rating */}
          <div className="stars">
            {[...Array(5)].map((_, index) => {
              const starValue = index + 1;
              return (
                <span
                  key={starValue}
                  className={starValue <= (hover || rating) ? "star active" : "star"}
                  onClick={() => setRating(starValue)}
                  onMouseEnter={() => setHover(starValue)}
                  onMouseLeave={() => setHover(0)}
                >
                  ★
                </span>
              );
            })}
          </div>

          {/* 📝 Feedback */}
          <form onSubmit={handleSubmit}>
            <textarea
              placeholder="Write your feedback here..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows="4"
            />
            <button type="submit" className="btn-submit">
              Submit Feedback
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Feedback;