import "./Profile.css";
import { useState, useEffect } from "react";
import axios from "axios";

function Profile() {
  const [profile, setProfile] = useState({
    // user_id: "",
    fname: "",
    lname: "",
    email: "",
    mobile_no: "",
    address1: "",
    address2: "",
    area_id: ""
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("userToken"); // ✅ same as old working code

        const res = await axios.get(
          "http://localhost:5000/api/users/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        console.log("PROFILE DATA:", res.data);

        const data = res.data; // ✅ direct use

        setProfile({
          // user_id: data.user_id || "",
          fname: data.fname || "",
          lname: data.lname || "",
          email: data.email || "",
          mobile_no: data.mobile_no || "",
          address1: data.address1 || "",
          address2: data.address2 || "",
          area_id: data.area_id || "",
        });

      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("userToken");

      const updateData = {
        fname: profile.fname,
        lname: profile.lname,
        email: profile.email,
        mobile_no: profile.mobile_no,
        address1: profile.address1
      };

      await axios.put(
        "http://localhost:5000/api/users/profile/update",
        updateData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Update error:", error.response?.data || error);
    }
  };

  return (
    <div className="profile-container">
      <form className="profile-card" onSubmit={handleSubmit}>
        <h2>My Profile</h2>

        <div className="form-grid">

          {/* <div>
            <label>User ID</label>
            <input type="text" value={profile.user_id} readOnly />
          </div> */}

          <div>
            <label>First Name</label>
            <input
              type="text"
              name="fname"
              value={profile.fname}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Last Name</label>
            <input
              type="text"
              name="lname"
              value={profile.lname}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Mobile Number</label>
            <input
              type="text"
              name="mobile_no"
              value={profile.mobile_no}
              onChange={handleChange}
            />
          </div>

          <div className="full-width">
            <label>Address Line 1</label>
            <textarea
              name="address1"
              rows="3"
              value={profile.address1}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Address Line 2</label>
            <input
              type="text"
              name="address2"
              value={profile.address2}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Area ID</label>
            <input
              type="text"
              name="area_id"
              value={profile.area_id}
              onChange={handleChange}
            />
          </div>

        </div>

        <button type="submit" className="save-btn">
          Save My Details
        </button>
      </form>
    </div>
  );
}

export default Profile;