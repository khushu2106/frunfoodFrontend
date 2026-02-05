import React, { useState, useEffect } from "react";
import "./ProfileC.css";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({
    fname: "",
    lname: "",
    email: "",
    mobile_no: "",
    address1: "",
  });

  const token = localStorage.getItem("userToken");

  // Fetch Profile Data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };
    if (token) fetchProfile();
  }, [token]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/users/profile/update",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(user),
        }
      );

      if (response.ok) {
        setIsEditing(false);
        alert("Profile Updated Successfully!");
      } else {
        alert("Update failed!");
      }
    } catch (error) {
      console.error("Save Error:", error);
    }
  };

  return (
    <div className="account-layout">
      {/* Sidebar Navigation */}
      <aside className="sidebar">
        <h3>My account</h3>
        <ul>
          <li className="active">My details</li>
          <li>My wishlist</li>
          <li>My orders</li>
          <li>My address book</li>
        </ul>
        <button className="logout-btn">Log out</button>
      </aside>

      {/* Main Content Area */}
      <main className="profile-main-content">
        <h2>My details</h2>

        {/* Profile Card */}
        <div className="profile-card">
          {/* First Name */}
          <div className="profile-field">
            <label>First name</label>
            {isEditing ? (
              <input name="fname" value={user.fname || ""} onChange={handleChange} />
            ) : (
              <p>{user.fname || "Not set"}</p>
            )}
          </div>

          {/* Last Name */}
          <div className="profile-field">
            <label>Last name</label>
            {isEditing ? (
              <input name="lname" value={user.lname || ""} onChange={handleChange} />
            ) : (
              <p>{user.lname || "Not set"}</p>
            )}
          </div>

          {/* Email */}
          <div className="profile-field">
            <label>Email</label>
            {isEditing ? (
              <input name="email" value={user.email || ""} onChange={handleChange} />
            ) : (
              <p>{user.email || "Not set"}</p>
            )}
          </div>

          {/* Mobile */}
          <div className="profile-field">
            <label>Mobile number</label>
            {isEditing ? (
              <input name="mobile_no" value={user.mobile_no || ""} onChange={handleChange} />
            ) : (
              <p>{user.mobile_no || "Not set"}</p>
            )}
          </div>

          {/* Address1 */}
          <div className="profile-field full-width">
            <label>Address 1</label>
            {isEditing ? (
              <textarea name="address1" value={user.address1 || ""} onChange={handleChange} />
            ) : (
              <p>{user.address1 || "Not set"}</p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="profile-actions">
            {isEditing ? (
              <button onClick={handleSave} className="save-btn">Save my details</button>
            ) : (
              <button onClick={() => setIsEditing(true)} className="edit-btn">Edit Details</button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
