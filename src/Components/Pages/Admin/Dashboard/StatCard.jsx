import React from "react";

const StatCard = ({ title, value }) => {
  return (
    <div style={{
      background: "#f5f5f5",
      padding: "20px",
      borderRadius: "8px",
      flex: 1,
      textAlign: "center",
      boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
    }}>
      <h3>{title}</h3>
      <p style={{ fontSize: "24px", fontWeight: "bold" }}>{value}</p>
    </div>
  );
};

export default StatCard;
