import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, Toaster } from "sonner"; // Optional: For better alerts
import "./Complaints.css";

const Complaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [replyText, setReplyText] = useState({}); // To store text per complaint

  const fetchComplaints = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/complaint");
      setComplaints(res.data);
    } catch (err) {
      console.error("Fetch Error:", err);
    }
  };

  // 📧 Function to send reply and resolve
  const handleReplyAndResolve = async (id, email, customerName) => {
    const message = replyText[id];
    if (!message || message.trim() === "") {
      alert("Please enter a reply message first.");
      return;
    }

    try {
      // API call to send email and update status
      await axios.put(`http://localhost:5000/api/complaint/${id}`, { 
        status: "resolved",
        replyMessage: message,
        email: email,
        name: customerName
      });

      alert(`Reply sent to ${email} and marked as resolved!`);
      setReplyText({ ...replyText, [id]: "" }); // Clear input
      fetchComplaints();
    } catch (err) {
      alert("Failed to send reply.");
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  return (
    <div className="complaint-container">
      <Toaster richColors />
      <h2>Customer Complaints</h2>

      <table className="complaint-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer</th>
            <th>Subject & Message</th>
            {/* <th>Status</th>
            <th>Admin Reply & Action</th> */}
          </tr>
        </thead>
        <tbody>
          {complaints.map((c) => (
            <tr key={c.complaint_id}>
              <td>{c.complaint_id}</td>
              <td>
                <b>{c.name || `${c.fname} ${c.lname}`}</b> <br />
                <small>{c.email}</small> <br />
                <small>{c.phone}</small>
              </td>
              <td>
                <p><b>Sub:</b> {c.subject}</p>
                <p className="msg-text">{c.message}</p>
              </td>
              {/* <td>
                <span className={`status-badge ${c.status}`}>
                  {c.status}
                </span>
              </td>
              <td>
                {c.status === "pending" ? (
                  <div className="reply-box">
                    <textarea 
                      placeholder="Type your reply here..."
                      value={replyText[c.complaint_id] || ""}
                      onChange={(e) => setReplyText({ ...replyText, [c.complaint_id]: e.target.value })}
                    />
                    <button 
                      className="resolve-btn"
                      onClick={() => handleReplyAndResolve(c.complaint_id, c.email, c.name)}
                    >
                      Send Reply & Resolve
                    </button>
                  </div>
                ) : (
                  <span className="resolved-text">✅ Resolved</span>
                )}
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Complaints;