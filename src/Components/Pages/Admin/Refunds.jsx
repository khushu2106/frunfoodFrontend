import React, { useState, useEffect } from "react";
import axios from "axios";

const Refunds = () => {
  const [refunds, setRefunds] = useState([]);
  const token = localStorage.getItem("userToken");

  const fetchRefundableOrders = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/sales", {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // Filter: Sirf Cancelled orders jo Online/UPI payment the
      const filtered = response.data.filter(order => 
        order.order_status === 'cancelled' && order.payment_mode !== 'COD'
      );
      setRefunds(filtered);
    } catch (error) {
      console.error("Error fetching refunds:", error);
    }
  };

  useEffect(() => {
    fetchRefundableOrders();
  }, []);

  const handleRefundComplete = async (sales_id) => {
    if (window.confirm("Mark this refund as completed? (Make sure you have sent money via Gateway/Bank)")) {
      try {
        // Aap ek naya status 'refunded' use kar sakte hain
        await axios.put(`http://localhost:5000/api/sales/status`, 
          { sales_id, status: 'refunded' },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        alert("Refund status updated!");
        fetchRefundableOrders();
      } catch (err) {
        alert("Update failed");
      }
    }
  };

  return (
    <div style={{ padding: "30px", background: "#fff", borderRadius: "12px" }}>
      <h2 style={{ color: "#3d1c12", marginBottom: "20px" }}>💸 Refund Management</h2>
      <p style={{ color: "#666", marginBottom: "20px" }}>List of cancelled online orders that require refunds.</p>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#fdf0ed", textAlign: "left" }}>
            <th style={{ padding: "12px" }}>Order ID</th>
            <th style={{ padding: "12px" }}>Customer</th>
            <th style={{ padding: "12px" }}>Amount to Refund</th>
            <th style={{ padding: "12px" }}>Payment Mode</th>
            <th style={{ padding: "12px" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {refunds.length > 0 ? refunds.map((order) => (
            <tr key={order.sales_id} style={{ borderBottom: "1px solid #eee" }}>
              <td style={{ padding: "12px" }}>#{order.sales_id}</td>
              <td style={{ padding: "12px" }}>{order.fname}</td>
              <td style={{ padding: "12px", color: "red", fontWeight: "bold" }}>₹{order.total_amount}</td>
              <td style={{ padding: "12px" }}>
                <span style={{ background: "#e3f2fd", color: "#0d47a1", padding: "3px 8px", borderRadius: "5px" }}>
                  {order.payment_mode}
                </span>
              </td>
              <td style={{ padding: "12px" }}>
                <button 
                  onClick={() => handleRefundComplete(order.sales_id)}
                  style={{
                    padding: "6px 12px",
                    background: "#28a745",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer"
                  }}
                >
                  Mark Refunded ✅
                </button>
              </td>
            </tr>
          )) : (
            <tr>
              <td colSpan="5" style={{ textAlign: "center", padding: "20px", color: "#999" }}>
                No pending refunds found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Refunds;