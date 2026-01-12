import "./Profile.css";
import { useState } from "react";

function Profile() {
  const [profile, setProfile] = useState({
    name: "Gaurang",
    email: "gaurang@email.com",
    phone: "9876543210",
    address: "Ahmedabad, Gujarat",
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Profile updated successfully!");
    console.log(profile);
  };

  return (
    <div className="profile-container">
      <form className="profile-card" onSubmit={handleSubmit}>
        <h2>My Profile</h2>

        <label>Name</label>
        <input
          type="text"
          name="name"
          value={profile.name}
          onChange={handleChange}
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={profile.email}
          onChange={handleChange}
        />

        <label>Phone</label>
        <input
          type="text"
          name="phone"
          value={profile.phone}
          onChange={handleChange}
        />

        <label>Address</label>
        <textarea
          name="address"
          rows="3"
          value={profile.address}
          onChange={handleChange}
        />

        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
}

export default Profile;
