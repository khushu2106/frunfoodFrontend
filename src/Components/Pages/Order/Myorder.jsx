import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Order.css";
import axios from "axios";

const MyOrders = () => {
  const navigate = useNavigate();
  const [orders, setOrdesr] = useState();
  
  const token = localStorage.getItem("userToken");
  let userId = null;

  if(token){
    const payload = JSON.parse(atob)
  }
  

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