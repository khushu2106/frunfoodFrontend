import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PurchaseChart from "./PurchaseChart";
import './AdminNavbar.css';

const Transaction = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const successMessage = location.state?.successMessage || "";

  return (
    <div className="transaction-container">
      <h2>Admin Purchase Management</h2>

      <button
        className="add-purchase-btn"
        onClick={() => navigate("/admin/add-purchase")}
      >
        Add New Purchase
      </button>

      {successMessage && (
        <div style={{
          margin: "15px 0",
          padding: "10px",
          backgroundColor: "#d4edda",
          color: "#155724",
          border: "1px solid #c3e6cb",
          borderRadius: "5px"
        }}>
          {successMessage}
        </div>
      )}

      <PurchaseChart />
    </div>
  );
};

export default Transaction;
