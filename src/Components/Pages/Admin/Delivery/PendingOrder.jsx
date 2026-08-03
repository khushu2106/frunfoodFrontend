import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PendingOrders = () => {
  const [orders, setOrders] = useState([]);
  const [deliveryBoys, setDeliveryBoys] = useState([]);
  const [selectedBoy, setSelectedBoy] = useState({});
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const adminToken = localStorage.getItem("adminToken");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = {
          headers: { Authorization: `Bearer ${adminToken}` },
        };

        const [ordersRes, boysRes] = await Promise.all([
          axios.get("http://localhost:5000/api/admin/delivery/pending", config),
          axios.get("http://localhost:5000/api/admin/delivery/boys", config),
        ]);

        setOrders(Array.isArray(ordersRes.data) ? ordersRes.data : []);
        setDeliveryBoys(Array.isArray(boysRes.data) ? boysRes.data : []);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    if (adminToken) {
      fetchData();
    }
  }, [adminToken]);

  const assignDelivery = async (sales_id) => {
    const delivery_id = selectedBoy[sales_id];

    if (!delivery_id) {
      alert("Please select a delivery boy first!");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/admin/delivery/assign",
        {
          orderId: sales_id,
          deliveryBoyId: delivery_id,
        },
        { headers: { Authorization: `Bearer ${adminToken}` } }
      );

      alert("Delivery Assigned Successfully! 📦");

      // 1. Remove order from UI
      setOrders((prev) => prev.filter((order) => order.sales_id !== sales_id));
      
      // 2. Cleanup selectedBoy state for this specific order
      setSelectedBoy((prev) => {
        const newState = { ...prev };
        delete newState[sales_id];
        return newState;
      });
    } catch (err) {
      console.error("Assign error", err);
      alert(err.response?.data?.message || "Failed to assign delivery.");
    }
  };

  const handleBoyChange = (sales_id, boy_id) => {
    setSelectedBoy((prev) => ({ ...prev, [sales_id]: boy_id }));
  };

  const handleView = (orderId) => {
    navigate(`/admin/Details/${orderId}`);
  };

  if (loading) return <p style={{ padding: "20px" }}>Loading data...</p>;

  return (
    <div
      style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        margin: "20px",
      }}
    >
      <h3 style={{ marginBottom: "20px", color: "#333" }}>Assign Pending Orders</h3>

      {orders.length === 0 ? (
        <p>No pending orders found.</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f8fafc", textAlign: "left", borderBottom: "2px solid #e2e8f0" }}>
              <th style={{ padding: "12px" }}>Order ID</th>
              <th>Customer</th>
              <th>Amount</th>
              <th>Select Delivery Partner</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.sales_id} style={{ borderBottom: "1px solid #edf2f7" }}>
                <td style={{ padding: "12px", fontWeight: "bold" }}>#{order.sales_id}</td>
                <td>{order.fname}</td>
                <td>₹{Number(order.total_amount).toLocaleString("en-IN")}</td>
                <td>
                  <select
                    value={selectedBoy[order.sales_id] || ""}
                    onChange={(e) => handleBoyChange(order.sales_id, e.target.value)}
                    style={{ padding: "6px", borderRadius: "4px", border: "1px solid #cbd5e1" }}
                  >
                    <option value="">-- Choose Boy --</option>
                    {deliveryBoys.map((boy) => (
                      <option key={boy.user_id} value={boy.user_id}>
                        {boy.fname} {boy.lname || ""} {boy.status === 'busy' ? '(Busy)' : ''}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <button
                    onClick={() => assignDelivery(order.sales_id)}
                    style={{
                      backgroundColor: "#22c55e",
                      color: "white",
                      border: "none",
                      padding: "6px 12px",
                      borderRadius: "4px",
                      cursor: "pointer",
                      marginRight: "8px",
                    }}
                  >
                    Assign
                  </button>
                  <button
                    onClick={() => handleView(order.sales_id)}
                    style={{
                      backgroundColor: "#f97316",
                      color: "white",
                      border: "none",
                      padding: "6px 12px",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PendingOrders;