import React, { useState, useEffect } from "react";
import "./AssignedOrdersD.css";

const AssignedOrdersD = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const deliveryBoyId = 1;

  const fetchOrders = () => {
    fetch(`http://localhost:5000/api/admin/delivery/assign`)
      .then(res => res.json())
      .then(resData => {
        if (resData.success) {
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

  const updateStatus = (orderId, status) => {
    if (window.confirm(`Change status to ${status}?`)) {
      fetch(`http://localhost:5000/api/delivery-boy/order-status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId,
          status
        })
      })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          fetchOrders();
        } else {
          alert("Update failed");
        }
      })
      .catch(err => console.error(err));
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
                <p className="price-tag">
                  <strong>Total:</strong> ₹{order.total_amount}
                </p>
              </div>

              <div className="order-action-footer">
                <span className={`status-badge ${order.order_status}`}>
                  {order.order_status}
                </span>

                {order.order_status === "assigned" && (
                  <button
                    className="deliver-btn"
                    onClick={() => updateStatus(order.sales_id, "out_for_delivery")}
                  >
                    Start Delivery
                  </button>
                )}

                {order.order_status === "out_for_delivery" && (
                  <button
                    className="deliver-btn"
                    onClick={() => updateStatus(order.sales_id, "delivered")}
                  >
                    Mark Delivered
                  </button>
                )}

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