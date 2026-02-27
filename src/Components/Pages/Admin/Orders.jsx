import React, { useState, useEffect } from "react";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("userToken"); // Auth token for security
  const [searchTerm, setSearchTerm] = useState("");

  const filteredOrders = orders.filter((order) => {
    const term = searchTerm.toLowerCase();

    return (
      order.sales_id.toString().includes(term) ||
      (order.fname && order.fname.toLowerCase().includes(term)) ||
      (order.order_status && order.order_status.toLowerCase().includes(term))
    );
  });

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/sales", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Status update karne ka function
  const handleStatusChange = async (sales_id, newStatus) => {
    try {
      // Naya status backend ko bhejna
      await axios.put(
        `http://localhost:5000/api/sales/status`,
        { sales_id, status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert(`Order #${sales_id} status updated to ${newStatus}`);
      fetchOrders(); // List refresh karne ke liye
    } catch (error) {
      console.error("Error updating status:", error);
      alert(error.response?.data?.error || "Failed to update status");
    }
  };

  // Status ke hisaab se color change karne ke liye helper
  const getStatusStyle = (status) => {
    switch (status) {
      case 'delivered': return { color: '#28a745', fontWeight: 'bold' };
      case 'cancelled': return { color: '#dc3545', fontWeight: 'bold' };
      case 'shipped': return { color: '#fd7e14', fontWeight: 'bold' };
      case 'confirmed': return { color: '#007bff', fontWeight: 'bold' };
      default: return { color: '#666' };
    }
  };

  return (
    <div style={{ padding: "30px", background: "#fff", borderRadius: "12px", boxShadow: "0 4px 15px rgba(0,0,0,0.05)" }}>
      <h2 style={{ marginBottom: "25px", color: "#333", display: 'flex', alignItems: 'center', gap: '10px' }}>
        📦 Order Management
      </h2>

      <div style={{ marginBottom: "20px", display: "flex", justifyContent: "flex-start" }}>
        <label htmlFor="" style={{marginRight:"10px"}}>Search by order id, customer : </label>
        <input
          type="text"
          placeholder="🔍 Search by Order ID, Customer or Status..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: "10px 14px",
            width: "300px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            outline: "none"
          }}
        />
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
        <thead>
          <tr style={{ background: "#f8f9fa", borderBottom: "2px solid #eee", textAlign: "left" }}>
            <th style={{ padding: "15px" }}>Order ID</th>
            <th style={{ padding: "15px" }}>Customer</th>
            <th style={{ padding: "15px" }}>Date</th>
            <th style={{ padding: "15px" }}>Amount</th>
            <th style={{ padding: "15px" }}>Current Status</th>
            <th style={{ padding: "15px" }}>Update Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((order) => (
            <tr key={order.sales_id} style={{ borderBottom: "1px solid #f1f1f1", transition: "0.3s" }}>
              <td style={{ padding: "15px", fontWeight: "600" }}>#{order.sales_id}</td>
              <td style={{ padding: "15px" }}>{order.fname || "Guest User"}</td>
              <td style={{ padding: "15px" }}>{new Date(order.s_date).toLocaleDateString()}</td>
              <td style={{ padding: "15px", fontWeight: "bold" }}>₹{order.total_amount}</td>
              <td style={{ padding: "15px" }}>
                <span style={getStatusStyle(order.order_status)}>
                  {order.order_status.toUpperCase()}
                </span>
              </td>
              <td style={{ padding: "15px" }}>
                <select
                  value={order.order_status}
                  onChange={(e) => handleStatusChange(order.sales_id, e.target.value)}
                  style={{
                    padding: "8px",
                    borderRadius: "6px",
                    border: "1px solid #ccc",
                    cursor: "pointer",
                    outline: "none",
                    background: "#fff"
                  }}
                >
                  <option value="placed">Placed</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {filteredOrders.length === 0 && (
        <div style={{ textAlign: 'center', padding: '40px', color: '#999' }}>
          No orders found in the database.
        </div>
      )}
    </div>
  );
};

export default Orders;