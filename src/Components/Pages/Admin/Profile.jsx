import React from "react";
import "./Profile.css";

const Profile = () => {
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
          <p><strong>Name:</strong> Admin User</p>
          <p><strong>Email:</strong> admin@gmail.com</p>
          <p><strong>Role:</strong> Administrator</p>
        </div>
      </div>

      <h3>Edit Profile</h3>
      <form className="profile-form">
        <input type="text" placeholder="Full Name" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="New Password" />
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default Profile;
