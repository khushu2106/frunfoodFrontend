import React from "react";

const gradients = [
  "linear-gradient(135deg,#667eea,#764ba2)",
  "linear-gradient(135deg,#f093fb,#f5576c)",
  "linear-gradient(135deg,#43e97b,#38f9d7)",
  "linear-gradient(135deg,#ff9966,#ff5e62)"
];

const StatCard = ({ title, value, onClick, index }) => {
  return (
    <div
      onClick={onClick}
      style={{
        background: gradients[index % gradients.length],
        color: "#fff",
        padding: "25px",
        borderRadius: "16px",
        flex: 1,
        cursor: "pointer",
        boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
        transition: "0.3s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-6px)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0px)")}
    >
      <h4 style={{ margin: 0, opacity: 0.9 }}>{title}</h4>
      <p style={{ fontSize: "28px", fontWeight: "bold", marginTop: "10px" }}>
        {value}
      </p>
    </div>
  );
};

export default StatCard;