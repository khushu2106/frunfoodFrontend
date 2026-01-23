import React from "react";
import { useNavigate } from "react-router-dom";
import "./MyOrders.css";

const MyOrders = () => {
  const navigate = useNavigate();

  // 🔴 Abhi static orders (API later)
  const orders = [
    {
      id: 1001,
      date: "22 Jan 2026",
      total: 998,
      status: "Delivered",
      payment: "Paid"
    },
    {
      id: 1002,
      date: "20 Jan 2026",
      total: 450,
      status: "Confirmed",
      payment: "Paid"
    },
    {
      id: 1003,
      date: "18 Jan 2026",
      total: 299,
      status: "Cancelled",
      payment: "Refunded"
    }
  ];

  return (
    <div className="my-orders-page">
      <h1>📦 My Orders</h1>

      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        <div className="orders-list">
          {orders.map(order => (
            <div className="order-card" key={order.id}>
              <div>
                <p><b>Order ID:</b> #{order.id}</p>
                <p><b>Date:</b> {order.date}</p>
                <p><b>Status:</b> 
                  <span className={`status ${order.status.toLowerCase()}`}>
                    {order.status}
                  </span>
                </p>
                <p><b>Payment:</b> {order.payment}</p>
              </div>

              <div className="order-right">
                <h3>₹{order.total}</h3>
                <button
                  onClick={() => navigate(`/order/${order.id}`)}
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