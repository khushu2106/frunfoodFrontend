import React, { useState } from "react";
import "./NotificationsD.css";

const NotificationsD = () => {
  // Filhal dummy data, baad mein API se replace kar sakte hain
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New Order Assigned!",
      message: "Order #1025 has been assigned to you. Pick it up from Store A.",
      time: "2 mins ago",
      isUnread: true,
    },
    {
      id: 2,
      title: "Payment Received",
      message: "Your weekly earnings of ₹2500 have been credited.",
      time: "1 hour ago",
      isUnread: false,
    }
  ]);

  return (
    <div className="page-d notifications-page">
      <h2>Notifications 🔔</h2>
      <div className="notifications-list">
        {notifications.length > 0 ? (
          notifications.map((note) => (
            <div key={note.id} className={`notification-item ${note.isUnread ? "unread" : ""}`}>
              <div className="note-icon">
                {note.isUnread ? "🔵" : "⚪"}
              </div>
              <div className="note-content">
                <h4>{note.title}</h4>
                <p>{note.message}</p>
                <span className="note-time">{note.time}</span>
              </div>
            </div>
          ))
        ) : (
          <div className="no-notes">
            <p>No new notifications</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsD;