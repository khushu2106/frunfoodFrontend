import React, { useState, useEffect } from "react";
import "./AssignedOrdersD.css";

const AssignedOrdersD = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const deliveryBoyId = 1; 

  // Data fetch karne ka function
  const fetchOrders = () => {
    fetch(`http://localhost:5000/api/delivery-boy/assigned-orders/${deliveryBoyId}`)
      .then(res => res.json())
      .then(resData => {
        if(resData.success) {
            setOrders(resData.data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching orders:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Delivered status update karne ka function
  const handleDeliver = (orderId) => {
    if (window.confirm("Are you sure this order is delivered?")) {
      fetch(`http://localhost:5000/api/delivery-boy/order-status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: orderId,
          status: "delivered"
        })
      })
      .then(res => res.json())
      .then(data => {
        if(data.success) {
          alert("Order marked as Delivered! 🎉");
          fetchOrders(); // List ko refresh karne ke liye
        } else {
          alert("Update failed: " + data.message);
        }
      })
      .catch(err => console.error("Error updating status:", err));
    }
  };

  if (loading) return <div className="loader">Loading assigned orders...</div>;

  return (
    <div className="page-d">
      <h2>Active Assignments</h2>
      {orders.length > 0 ? (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order.sales_id} className="order-card assigned">
              <div className="order-info">
                <div className="card-header">
                   <h4>Order #{order.sales_id}</h4>
                   <span className="mode-tag">{order.payment_mode}</span>
                </div>
                <p><strong>Customer:</strong> {order.fname}</p>
                <p><strong>Address:</strong> {order.delivery_add1}</p>
                <p className="price-tag"><strong>Total:</strong> ₹{order.total_amount}</p>
              </div>
              
              <div className="order-action-footer">
                 <span className={`status-badge ${order.order_status}`}>
                    {order.order_status}
                 </span>
                 <button 
                   className="deliver-btn"
                   onClick={() => handleDeliver(order.sales_id)}
                 >
                   Mark as Delivered
                 </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-data">
          <p>No active orders at the moment. Take a rest! ☕</p>
        </div>
      )}
    </div>
  );
};

export default AssignedOrdersD;