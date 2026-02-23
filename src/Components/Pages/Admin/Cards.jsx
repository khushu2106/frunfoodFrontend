import React, { useEffect, useState } from "react";
import axios from "axios";

const Cards = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/feedback");
      setFeedbacks(res.data);
    } catch (error) {
      console.error("Error fetching feedback:", error);
    } finally {
      setLoading(false);
    }
  };

  // Filter logic for search
  const filteredFeedbacks = feedbacks.filter((fb) =>
    fb.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    fb.user_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Helper function to render stars
  const renderStars = (rating) => {
    return "⭐".repeat(Math.min(5, Math.max(1, rating)));
  };

  if (loading) return <div style={{textAlign: 'center', padding: '50px'}}>Loading Feedbacks...</div>;

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h2>Product Feedback & Ratings</h2>
        <input
          type="text"
          placeholder="Search product or user..."
          style={searchBarStyle}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredFeedbacks.length === 0 ? (
        <p style={{ textAlign: "center", color: "#666" }}>No feedbacks found.</p>
      ) : (
        <div style={cardGridStyle}>
          {filteredFeedbacks.map((fb) => (
            <div key={fb.feedback_id} style={cardStyle}>
              <div style={cardHeader}>
                <span style={userIconStyle}>{fb.user_name.charAt(0)}</span>
                <div>
                  <h4 style={{ margin: 0 }}>{fb.user_name}</h4>
                  <small style={{ color: "#888" }}>ID: #{fb.feedback_id}</small>
                </div>
              </div>

              <div style={productInfoStyle}>
                <strong>Product:</strong> {fb.product_name}
              </div>

              <div style={ratingStyle}>
                {renderStars(fb.rate)} <span style={{fontSize: '14px', color: '#555'}}>({fb.rate}/5)</span>
              </div>

              <p style={commentStyle}>
                " {fb.comment} "
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// --- Modern Styling ---

const containerStyle = {
  padding: "30px",
  background: "#f0f2f5",
  minHeight: "100vh",
  fontFamily: "'Segoe UI', Roboto, sans-serif"
};

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "30px",
  flexWrap: "wrap",
  gap: "15px"
};

const searchBarStyle = {
  padding: "10px 15px",
  borderRadius: "20px",
  border: "1px solid #ddd",
  width: "250px",
  outline: "none",
  boxShadow: "0 2px 5px rgba(0,0,0,0.05)"
};

const cardGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
  gap: "20px"
};

const cardStyle = {
  background: "#fff",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  transition: "transform 0.2s",
  borderTop: "4px solid #007bff"
};

const cardHeader = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  marginBottom: "15px"
};

const userIconStyle = {
  width: "40px",
  height: "40px",
  background: "#007bff",
  color: "white",
  borderRadius: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontWeight: "bold",
  fontSize: "18px"
};

const productInfoStyle = {
  fontSize: "14px",
  color: "#444",
  marginBottom: "10px",
  padding: "5px 10px",
  background: "#eef6ff",
  borderRadius: "5px",
  display: "inline-block"
};

const ratingStyle = {
  marginBottom: "10px",
  color: "#ffc107"
};

const commentStyle = {
  fontStyle: "italic",
  color: "#555",
  lineHeight: "1.5",
  margin: 0
};

export default Cards;