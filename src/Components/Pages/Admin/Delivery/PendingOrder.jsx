import React, { useEffect, useState } from "react";
import axios from "axios";

const PendingOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/admin/delivery/pending", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`
        }
      })
      .then(res => {
        if (Array.isArray(res.data)) {
          setOrders(res.data);
        } else {
          setOrders([]);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Pending orders error", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading pending orders...</p>;

  return (
    <div style={{ background: "#fff", padding: "20px", borderRadius: "8px" }}>
      <h3>Pending Orders</h3>

      {orders.length === 0 ? (
        <p>No pending orders</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Total Amount</th>
              <th>Order Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.map(order => (
              <tr key={order.sales_id}>
                <td>{order.sales_id}</td>
                <td>{order.fname}</td>
                <td>₹{order.total_amount}</td>
                <td>{new Date(order.s_date).toLocaleDateString()}</td>
                <td>
                  <button
                    style={{
                      padding: "6px 10px",
                      background: "#007bff",
                      color: "#fff",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer"
                    }}
                  >
                    Assign Delivery
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
