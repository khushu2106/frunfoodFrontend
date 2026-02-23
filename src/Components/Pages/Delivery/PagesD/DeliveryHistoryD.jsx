import React, { useState, useEffect } from "react";
import "./DeliveryHistoryD.css";

const DeliveryHistoryD = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const deliveryBoyId = 1; 

  useEffect(() => {
    fetch(`http://localhost:5000/api/delivery-boy/orders/${deliveryBoyId}`)
      .then(res => res.json())
      .then(data => {
        if(data.success) {
          // Hum sirf wo orders filter kar rahe hain jo 'delivered' hain
          const completedOrders = data.orders.filter(
            (order) => order.order_status === "delivered"
          );
          setHistory(completedOrders);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("History fetch error:", err);
        setLoading(false);
      });
  }, []);

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
                  <span className="order-id">#{item.sales_id}</span>
                  <span className="order-date">
                    {new Date(item.s_date).toLocaleDateString('en-GB', {
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
                <div className="status-pill">
                  <span className="dot"></span> Delivered
                </div>
                <button className="receipt-btn">View Receipt</button>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-history">
            <p>No completed deliveries found in your history yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeliveryHistoryD;