import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddSupplier = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fname: "",
    lname: "",
    address1: "",
    address2: "",
    mobile_no: "",
    email: ""
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.fname || !form.mobile_no || !form.email) {
      setErrorMessage("First name, mobile & email are required");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/suppliers", form);

      navigate("/admin/view-suppliers", {
        state: { successMessage: "Supplier added successfully!" }
      });
    } catch (err) {
      setErrorMessage(err.response?.data?.error || "Failed to add supplier");
    }
  };

  return (
    <div style={containerStyle}>
      <h3>Add Supplier</h3>

      <button
        onClick={() => navigate("/admin/view-suppliers")}
        style={secondaryBtn}
      >
        View All Suppliers
      </button>

      <form onSubmit={handleSubmit}>
        <input name="fname" placeholder="First Name" onChange={handleChange} />
        <input name="lname" placeholder="Last Name" onChange={handleChange} />
        <input name="address1" placeholder="Address Line 1" onChange={handleChange} />
        <input name="address2" placeholder="Address Line 2" onChange={handleChange} />
        <input name="mobile_no" placeholder="Mobile Number" onChange={handleChange} />
        <input name="email" placeholder="Email" onChange={handleChange} />

        <button type="submit" style={primaryBtn}>
          Add Supplier
        </button>
      </form>

      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );
};

const containerStyle = {
  maxWidth: "500px",
  margin: "20px auto",
  padding: "20px",
  background: "#fff",
  borderRadius: "8px",
  boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
};

const primaryBtn = {
  backgroundColor: "#007bff",
  color: "#fff",
  padding: "10px",
  border: "none",
  borderRadius: "5px",
  marginTop: "10px",
  cursor: "pointer",
  width: "100%"
};

const secondaryBtn = {
  backgroundColor: "#6c757d",
  color: "#fff",
  padding: "8px 12px",
  border: "none",
  borderRadius: "5px",
  marginBottom: "15px",
  cursor: "pointer"
};

export default AddSupplier;