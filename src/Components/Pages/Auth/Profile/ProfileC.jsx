import React, { useState } from "react";
import "./ProfileC.css";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);

  const [user, setUser] = useState({
    name: "Khushbu Gupta",
    email: "khushbu@gmail.com",
    phone: "9876543210",
    address: "Ahmedabad, Gujarat",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here you will call API to update profile
    console.log("Updated Data:", user);
  };

  return (
    <div className="profile-container">
      <h2>My Profile</h2>

      <div className="profile-card">
        <div className="profile-field">
          <label>Name</label>
          {isEditing ? (
            <input name="name" value={user.name} onChange={handleChange} />
          ) : (
            <p>{user.name}</p>
          )}
        </div>

        <div className="profile-field">
          <label>Email</label>
          {isEditing ? (
            <input name="email" value={user.email} onChange={handleChange} />
          ) : (
            <p>{user.email}</p>
          )}
        </div>

        <div className="profile-field">
          <label>Phone</label>
          {isEditing ? (
            <input name="phone" value={user.phone} onChange={handleChange} />
          ) : (
            <p>{user.phone}</p>
          )}
        </div>

        <div className="profile-field">
          <label>Address</label>
          {isEditing ? (
            <textarea name="address" value={user.address} onChange={handleChange} />
          ) : (
            <p>{user.address}</p>
          )}
        </div>

        <div className="profile-actions">
          {isEditing ? (
            <button onClick={handleSave} className="save-btn">Save</button>
          ) : (
            <button onClick={() => setIsEditing(true)} className="edit-btn">
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
