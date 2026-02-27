import React, { useState } from "react";
import axios from "axios";
import { FiSend, FiUser, FiMail, FiPhone, FiTag, FiMessageCircle } from "react-icons/fi";
import "./Complaint.css";

const Complaint = () => {
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", subject: "", message: ""
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Complaint.js mein handleSubmit update karein
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // 1. Get user_id from token or localStorage
    const token = localStorage.getItem("userToken");
    let userId = 1; // Default
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      userId = payload.id || payload.userId;
    }

    try {
      // 2. Data ke saath userId bhi bhejein
      await axios.post("http://localhost:5000/api/complaint", {
        ...formData,
        user_id: userId
      });

      alert("Success! Your complaint has been sent.");
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (err) {
      alert("Error submitting complaint: " + (err.response?.data?.error || "Server Error"));
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="complaint-page">
      <div className="complaint-card">
        <div className="card-header">
          <h2>Submit a Complaint</h2>
          <p>We usually respond within 24 hours</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="input-box">
              <label><FiUser /> Full Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="John Doe" />
            </div>

            <div className="input-box">
              <label><FiPhone /> Phone Number</label>
              <input type="text" name="phone" value={formData.phone} onChange={handleChange} required placeholder="+91 0000000000" />
            </div>
          </div>

          <div className="input-box">
            <label><FiMail /> Email Address</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="john@example.com" />
          </div>

          <div className="input-box">
            <label><FiTag /> Subject</label>
            <input type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder="Brief title of issue" />
          </div>

          <div className="input-box">
            <label><FiMessageCircle /> Message</label>
            <textarea name="message" value={formData.message} onChange={handleChange} rows="4" required placeholder="Describe your issue in detail..."></textarea>
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Processing..." : <><FiSend /> Send Complaint</>}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Complaint;