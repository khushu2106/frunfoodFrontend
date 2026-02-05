import React, { useState, useEffect } from "react";
import "./AssignedOrdersD.css";

const AssignedOrdersD = () => {
  const [orders, setOrders] = useState([]);
  const deliveryBoyId = 1; // Filhal static, baad mein auth se aayega

  useEffect(() => {
    fetch(`http://localhost:5000/api/delivery-boy/orders/${deliveryBoyId}`)
      .then(res => res.json())
      .then(data => {
        if(data.success) setOrders(data.orders);
      });
  }, []);

  return (
    <div className="page-d">
      <h2>Assigned Orders</h2>
      {orders.length > 0 ? (
        orders.map((order) => (
          <div key={order._id} className="order-card">
            <p>Order #{order.orderId} – {order.customerName} – {order.paymentMethod}</p>
            <button>View Details</button>
          </div>
        ))
      ) : (
        <p>No orders assigned yet.</p>
      )}
    </div>
  );
};

export default AssignedOrdersD;