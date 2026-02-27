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

  const assignDelivery = async (sales_id) => {
    try {
      await axios.post(
        `http://localhost:5000/api/admin/delivery/assign/${sales_id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`
          }
        }
      );

      alert("Delivery Assigned!");

      // remove assigned order from list
      setOrders(prev => prev.filter(order => order.sales_id !== sales_id));

    } catch (err) {
      console.error("Assign error", err);
    }
  };

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
                    onClick={() => assignDelivery(order.sales_id)}
                    style={{
                      padding: "6px 10px",
                      background: "#28a745",
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
