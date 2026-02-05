import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Order.css";
import axios from "axios";

const MyOrders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("userToken");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/sales/my",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setOrders(res.data || []);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token, navigate]);

  if (loading) return <p>Loading your orders...</p>;

  return (
    <div className="my-orders-page">
      <h1>📦 My Orders</h1>

      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        <div className="orders-list">
          {orders.map(order => (
            <div className="order-card" key={order.sales_id}>
              <div>
                <p><b>Order ID:</b> #{order.sales_id}</p>
                <p>
                  <b>Date:</b>{" "}
                  {new Date(order.S_date).toLocaleDateString()}
                </p>
                <p>
                  <b>Status:</b>{" "}
                  <span className={`status ${order.order_status}`}>
                    {order.order_status}
                  </span>
                </p>
              </div>

              <div className="order-right">
                <h3>₹{order.total_amount}</h3>
                <button
                  onClick={() => navigate(`/myorders/${order.sales_id}`)}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
