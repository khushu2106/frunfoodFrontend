import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Profile.css";

const Profile = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    role: ""
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [message, setMessage] = useState("");

  // Fetch admin profile on load
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/admin/profile", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });
        setProfile(res.data);
        setFormData({ name: res.data.name, email: res.data.email, password: "" });
      } catch (err) {
        console.error("Error fetching profile:", err.response || err);
      }
    };
    fetchProfile();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        "http://localhost:5000/api/admin/profile",
        formData,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setMessage(res.data.message);
      setProfile({ ...profile, name: formData.name, email: formData.email });
      setFormData({ ...formData, password: "" }); // clear password
    } catch (err) {
      console.error("Error updating profile:", err.response || err);
      setMessage("Update failed!");
    }
  };

  return (
    <div className="profile-container">
      <h2>Admin Profile</h2>

      <div className="profile-card">
        <img
          src="https://i.pravatar.cc/150"
          alt="Admin"
          className="profile-img"
        />
        <div className="profile-info">
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Role:</strong> {profile.role}</p>
        </div>
      </div>

      <h3>Edit Profile</h3>
      <form className="profile-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          placeholder="New Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit">Update Profile</button>
      </form>

      {message && <p style={{ marginTop: "10px", color: "green" }}>{message}</p>}
    </div>
  );
};

export default Profile;
