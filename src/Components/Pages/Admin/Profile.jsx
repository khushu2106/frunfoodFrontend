import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Auth/Profile/ProfileC.css"; // Wahi CSS use karein jo humne pehle banayi thi

const Profile = () => {
  const [profile, setProfile] = useState({ name: "", email: "", role: "" });
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("adminToken"); // Uniform token name

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/admin/profile", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProfile(res.data);
        setFormData({ name: res.data.name, email: res.data.email, password: "" });
      } catch (err) {
        console.error("Error fetching profile:", err.response || err);
      }
    };
    if (token) fetchProfile();
  }, [token]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        "http://localhost:5000/api/admin/profile",
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(res.data.message);
      setProfile({ ...profile, name: formData.name, email: formData.email });
      setFormData({ ...formData, password: "" });
      
      setTimeout(() => setMessage(""), 3000); 
       } catch (err) {
      setMessage("Update failed!");
    }
  };

  return (
    <div className="account-layout">
      {/* Sidebar (Consistency ke liye) */}
      <aside className="sidebar">
        <h3>Admin Panel</h3>
        <ul>
          <li className="active">Admin Profile</li>
          <li>Manage Users</li>
          <li>Site Settings</li>
        </ul>
      </aside>

      <main className="profile-main-content">
        <h2>Admin Details</h2>
        
        <div className="profile-card">
          <div className="profile-header" style={{gridColumn: "span 2"}}>
             <img src="https://i.pravatar.cc/150" alt="Admin" className="avatar" />
             <div className="header-info">
                <h4>{profile.name}</h4>
                <p style={{color: "gray"}}>{profile.role}</p>
             </div>
          </div>

          <form onSubmit={handleSubmit} className="form-grid" style={{gridColumn: "span 2", display: "grid", gap: "20px"}}>
            <div className="profile-field">
              <label>Full Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </div>

            <div className="profile-field">
              <label>Email Address</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>

            <div className="profile-field full-width">
              <label>New Password (Optional)</label>
              <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Leave blank to keep current" />
            </div>

            <div className="profile-actions">
              <button type="submit" className="save-btn">Update Admin Profile</button>
            </div>
          </form>

          {message && <p className="status-msg">{message}</p>}
        </div>
      </main>
    </div>
  );
};

export default Profile;