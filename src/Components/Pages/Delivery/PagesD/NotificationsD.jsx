// import React, { useState } from "react";
// import "./NotificationsD.css";

// const NotificationsD = () => {
//   // Filhal dummy data, baad mein API se replace kar sakte hain
//   const [notifications, setNotifications] = useState([
//     {
//       id: 1,
//       title: "New Order Assigned!",
//       message: "Order #1025 has been assigned to you. Pick it up from Store A.",
//       time: "2 mins ago",
//       isUnread: true,
//     },
//     {
//       id: 2,
//       title: "Payment Received",
//       message: "Your weekly earnings of ₹2500 have been credited.",
//       time: "1 hour ago",
//       isUnread: false,
//     }
//   ]);

//   return (
//     <div className="page-d notifications-page">
//       <h2>Notifications 🔔</h2>
//       <div className="notifications-list">
//         {notifications.length > 0 ? (
//           notifications.map((note) => (
//             <div key={note.id} className={`notification-item ${note.isUnread ? "unread" : ""}`}>
//               <div className="note-icon">
//                 {note.isUnread ? "🔵" : "⚪"}
//               </div>
//               <div className="note-content">
//                 <h4>{note.title}</h4>
//                 <p>{note.message}</p>
//                 <span className="note-time">{note.time}</span>
//               </div>
//             </div>
//           ))
//         ) : (
//           <div className="no-notes">
//             <p>No new notifications</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default NotificationsD;

import React, { useEffect, useState } from "react";
import axios from "axios";

function NotificationsD() {

  const deliveryBoyId = localStorage.getItem("deliveryBoyId");
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (!deliveryBoyId) return;

    axios
      .get(`http://localhost:5000/api/delivery/notifications/${deliveryBoyId}`)
      .then(res => {
        console.log("Notifications API Response:", res.data);
        if (res?.data?.success) {
          setNotifications(res.data.data || []);
        }
      })
      .catch(err => {
        console.error("Notification error:", err);
        setNotifications([]);
      });
  }, [deliveryBoyId]);

  return (
    <div>
      <h2>Notifications</h2>

      {notifications.length === 0 ? (
        <p>No new orders</p>
      ) : (
        notifications.map(n => (
          <div key={n.sales_id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
            <p><b>New Order Assigned</b></p>
            <p>Order ID: #{n.sales_id}</p>
            <p>Amount: ₹{n.total_amount}</p>
            <p>Date: {n.s_date}</p>
          </div>
        ))
      )}

    </div>
  );
}

export default NotificationsD;