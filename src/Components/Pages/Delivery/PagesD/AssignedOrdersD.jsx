import React, { useState, useEffect } from "react";
import "./AssignedOrdersD.css";
import axios from "axios";

const AssignedOrdersD = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const deliveryBoyId = localStorage.getItem("userId") || 5;
  const token = localStorage.getItem("token");

  // Orders fetch karne ka function
  const fetchOrders = async () => {
    console.log("Checking Delivery Boy ID:", deliveryBoyId); // Check karein kya ye '5' hai?
    try {
      const url = `http://localhost:5000/api/delivery-boy/assigned-orders/${deliveryBoyId}`;
      console.log("Requesting URL:", url);

      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` }
      });

      console.log("Data received from Backend:", response.data);
      if (response.data.success) {
        setOrders(response.data.data);
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [deliveryBoyId]);

  // Status update karne ka function
  const updateStatus = async (orderId, status) => {
    const statusText = status.replace(/_/g, ' ');

    if (window.confirm(`Are you sure you want to mark this as ${statusText}?`)) {
      try {
        // 3. Status update API call
        const response = await axios.put(`http://localhost:5000/api/delivery-boy/order-status`, {
          orderId: orderId,
          status: status
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (response.data.success) {
          alert(`Status updated to ${statusText}!`);
          fetchOrders(); // List refresh karein
        } else {
          alert("Update failed: " + response.data.message);
        }
      } catch (err) {
        console.error("Update error:", err);
        alert("Server error while updating status.");
      }
    }
  };

  if (loading) return <div className="loader">Loading your delivery tasks...</div>;

  return (
    <div className="page-d">
      <div className="delivery-header">
        <h2>Active Assignments</h2>
        <p className="welcome-msg">Delivery Partner ID: #{deliveryBoyId}</p>
      </div>

      {orders.length > 0 ? (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order.sales_id} className={`order-card ${order.order_status}`}>

              <div className="order-info">
                <div className="card-header">
                  <h4>Order #{order.sales_id}</h4>
                  <span className={`mode-tag ${order.payment_mode.toLowerCase()}`}>
                    {order.payment_mode}
                  </span>
                </div>

                <div className="customer-details">
                  <p><strong>👤 Customer:</strong> {order.fname}</p>
                  <p><strong>📍 Address:</strong> {order.delivery_add1}</p>
                  <p className="price-tag">
                    <strong>💰 Total Amount:</strong> ₹{order.total_amount}
                  </p>
                </div>
              </div>

              <div className="order-action-footer">
                {/* Status Badge */}
                <span className={`status-badge ${order.order_status}`}>
                  {order.order_status.replace(/_/g, ' ').toUpperCase()}
                </span>

                <div className="action-buttons">
                  {/* Agar status 'assigned' hai toh 'Start Delivery' dikhega */}
                  {order.order_status === "assigned" && (
                    <button
                      className="btn-start"
                      onClick={() => updateStatus(order.sales_id, "out_for_delivery")}
                    >
                      🚚 Start Delivery
                    </button>
                  )}

                  {/* Agar status 'out_for_delivery' hai toh 'Mark Delivered' dikhega */}
                  {order.order_status === "out_for_delivery" && (
                    <button
                      className="btn-delivered"
                      onClick={() => updateStatus(order.sales_id, "delivered")}
                    >
                      ✅ Mark Delivered
                    </button>
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>
      ) : (
        <div className="no-data">
          <div className="coffee-icon">☕</div>
          <p>No active orders for you right now.</p>
        </div>
      )}
    </div>
  );
};

export default AssignedOrdersD;