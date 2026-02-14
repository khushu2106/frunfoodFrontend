import React, { useEffect, useState } from "react";
import axios from "axios";

const Cards = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/feedback");
      setFeedbacks(res.data);
    } catch (error) {
      console.error("Error fetching feedback:", error);
    }
  };

  return (
    <div style={{ padding: "20px", background: "#f5f5f5", borderRadius: "8px" }}>
      <h2>Product Feedback & Ratings</h2>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Feedback ID</th>
            <th>User Name</th>
            <th>Product Name</th>
            <th>Avg. Rating</th>
            <th>Comment</th>
          </tr>
        </thead>
        <tbody>
          {feedbacks.map((fb) => (
            <tr key={fb.feedback_id}>
              <td>{fb.feedback_id}</td>
              <td>{fb.user_name}</td>
              <td>{fb.product_name}</td>
              <td>{fb.rate} ⭐</td>
              <td>{fb.comment}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Cards;
