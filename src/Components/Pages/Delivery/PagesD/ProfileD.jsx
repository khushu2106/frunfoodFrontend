import { useState, useEffect } from "react";
import "./ProfileD.css";

function ProfileD() {
  const [profile, setProfile] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    vehicleType: "",
    vehicleNumber: "",
    address: "",
    image: ""
  });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("deliveryProfile"));
    if (saved) {
      setProfile(saved);
    } else {
      setProfile({
        name: "Rahul Sharma",
        phone: "9876543210",
        email: "delivery@petfood.com",
        password: "",
        vehicleType: "Bike",
        vehicleNumber: "GJ01AB1234",
        address: "Ahmedabad, Gujarat",
        image: ""
      });
    }
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile({ ...profile, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("deliveryProfile", JSON.stringify(profile));
    alert("Profile updated successfully ✅");
  };

  return (
    <div className="profile-page">
      <h2>Edit Profile</h2>

      <form className="profile-card" onSubmit={handleSubmit}>
        {/* Profile Image */}
        <div className="image-box">
          <img
            src={profile.image || "https://via.placeholder.com/120"}
            alt="Profile"
          />
          <input type="file" accept="image/*" onChange={handleImage} />
        </div>

        <label>Name</label>
        <input name="name" value={profile.name} onChange={handleChange} />

        <label>Phone Number</label>
        <input name="phone" value={profile.phone} onChange={handleChange} />

        <label>Email</label>
        <input name="email" type="email" value={profile.email} onChange={handleChange} />

        <label>Password</label>
        <input name="password" type="password" value={profile.password} onChange={handleChange} />

        <label>Vehicle Type</label>
        <select name="vehicleType" value={profile.vehicleType} onChange={handleChange}>
          <option>Bike</option>
          <option>Cycle</option>
          <option>Scooter</option>
        </select>

        <label>Vehicle Number</label>
        <input name="vehicleNumber" value={profile.vehicleNumber} onChange={handleChange} />

        <label>Address</label>
        <textarea name="address" value={profile.address} onChange={handleChange} />

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default ProfileD;
