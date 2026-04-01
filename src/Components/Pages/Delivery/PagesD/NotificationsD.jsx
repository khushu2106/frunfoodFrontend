import React, { useEffect, useState } from "react";
import axios from "axios";

function NotificationsD() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const deliveryBoyId = localStorage.getItem("deliveryBoyId");

  useEffect(() => {
    if (!deliveryBoyId) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/delivery-boy/notifications/${deliveryBoyId}`);
        console.log("API Se Aaya Data:", res.data); // Console mein check karein data aa raha hai ya nahi

        if (res.data && res.data.success) {
          setNotifications(res.data.data || []);
        }
      } catch (err) {
        console.error("Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [deliveryBoyId]);

  // WhatsApp style "Read" action
  const handleRead = async (salesId) => {
    // 1. UI se turant remove karein (WhatsApp Archive ki tarah)
    setNotifications(notifications.filter(n => n.sales_id !== salesId));

    // 2. Backend ko update karein (Optional: Agar aapne update API banayi hai)
    /*
    try {
      await axios.put(`http://localhost:5000/api/delivery-boy/mark-read/${salesId}`);
    } catch (err) {
      console.log("Status update failed in backend");
    }
    */
  };

  if (loading) return <p style={{ textAlign: "center", padding: "20px" }}>Checking for orders...</p>;

  return (
    <div style={{ padding: "15px", backgroundColor: "#f4f7f6", minHeight: "100vh" }}>
      <h2 style={{ color: "#075e54", marginBottom: "20px" }}>Notifications 🔔</h2>

      {notifications.length === 0 ? (
        <div style={{ textAlign: "center", padding: "40px", background: "#fff", borderRadius: "10px" }}>
          <p style={{ fontSize: "18px", color: "#666" }}>No new orders assigned.</p>
          <p style={{ fontSize: "12px", color: "#ccc" }}>Delivery Boy ID: {deliveryBoyId}</p>
        </div>
      ) : (
        notifications.map((n) => (
          <div 
            key={n.sales_id} 
            style={{ 
              background: "#fff", 
              marginBottom: "12px", 
              padding: "15px", 
              borderRadius: "10px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderLeft: "6px solid #25D366" // WhatsApp Green accent
            }}
          >
            <div style={{ flex: 1 }}>
              <h4 style={{ margin: "0 0 5px 0", color: "#333" }}>📦 Order #{n.sales_id}</h4>
              <p style={{ margin: "2px 0", fontSize: "14px", fontWeight: "bold" }}>Amount: ₹{n.total_amount}</p>
              {/* API mein property 'date' hai, isliye n.date use karein */}
              <p style={{ margin: "0", fontSize: "12px", color: "#888" }}>Assigned on: {n.date}</p>
            </div>

            <button 
              onClick={() => handleRead(n.sales_id)}
              style={{
                backgroundColor: "#075e54",
                color: "#fff",
                border: "none",
                padding: "10px 18px",
                borderRadius: "25px",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "13px",
                transition: "0.3s"
              }}
            >
              Read ✅
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default NotificationsD;