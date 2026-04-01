import React, { useState, useEffect } from "react";
import "./DeliveryHistoryD.css";
import axios from "axios"; // Consistency ke liye axios use karein

const DeliveryHistoryD = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Dynamic ID: localStorage se uthayein (Jo login ke waqt save ki thi)
  const deliveryBoyId = localStorage.getItem("userId") || 5;
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        // 2. Dashboard wala same prefix use karein
        const response = await axios.get(`http://localhost:5000/api/delivery-boy/orders/${deliveryBoyId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (response.data.success) {
          // 3. Status filter check (Make sure it matches 'delivered')
          const completedOrders = response.data.orders.filter(
            (order) => order.order_status === "delivered"
          );
          setHistory(completedOrders);
        }
      } catch (err) {
        console.error("History fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [deliveryBoyId]);

  if (loading) return <div className="history-loader">Loading History...</div>;

  return (
    <div className="history-page">
      <div className="history-header">
        <h2>Delivery History ✅</h2>
        <span className="count-tag">{history.length} Completed</span>
      </div>

      <div className="history-list">
        {history.length > 0 ? (
          history.map((item) => (
            <div key={item.sales_id} className="history-item-card">
              <div className="item-main">
                <div className="id-section">
                  <span className="order-id">Order #{item.sales_id}</span>
                  <span className="order-date">
                    📅 {new Date(item.s_date).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </span>
                </div>
                <div className="amount-section">
                  <span className="amount-label">Earned</span>
                  <span className="amount-val">₹{item.total_amount}</span>
                </div>
              </div>

              <div className="item-footer">
                <div className="status-pill delivered">
                  <span className="dot"></span> Successfully Delivered
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-history">
             <div className="box-icon">📦</div>
            <p>No completed deliveries found in your history yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeliveryHistoryD;