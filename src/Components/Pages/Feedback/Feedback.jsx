import { useState } from "react";
import "./Feedback.css";

const Feedback = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (rating === 0) {
      alert("Please select a rating");
      return;
    }

    const feedbackData = {
      rating,
      comment,
    };

    console.log("Feedback Submitted:", feedbackData);
    alert("Thank you for your feedback ❤️");
    // TODO: API call
  };

  return (
    <div className="feedback-container">
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
                className={
                  starValue <= (hover || rating) ? "star active" : "star"
                }
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
  );
};

export default Feedback;
