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

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); // Loading state added

  // Regex Patterns
  const nameRegex = /^[A-Za-z\s]{2,30}$/;
  const addressRegex = /^[A-Za-z0-9\s,.'-]{5,100}$/;
  const mobileRegex = /^[6-9]\d{9}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "fname":
        if (!value.trim()) error = "First name is required";
        else if (!nameRegex.test(value)) error = "Only letters allowed (2-30 chars)";
        break;
      case "mobile_no":
        if (!value) error = "Mobile number is required";
        else if (!mobileRegex.test(value)) error = "Enter valid 10-digit Indian number";
        break;
      case "email":
        if (!value) error = "Email is required";
        else if (!emailRegex.test(value)) error = "Enter a valid email address";
        break;
      case "address1":
        if (value && !addressRegex.test(value)) error = "Invalid address format";
        break;
      default:
        break;
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    // Live validation
    const error = validateField(name, value);
    setErrors({ ...errors, [name]: error, api: "" });
  };

  const validateForm = () => {
    let newErrors = {};
    Object.keys(form).forEach((key) => {
      const error = validateField(key, form[key]);
      if (error) newErrors[key] = error;
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      // Data trim karke bhejna achhi practice hai
      const cleanForm = Object.fromEntries(
        Object.entries(form).map(([k, v]) => [k, v.trim()])
      );

      await axios.post("http://localhost:5000/api/suppliers", cleanForm);

      navigate("/admin/view-suppliers", {
        state: { successMessage: "Supplier added successfully!" }
      });
    } catch (err) {
      setErrors({
        api: err.response?.data?.error || "Server error! Please try again later."
      });
    } finally {
      setLoading(false);
    }
  };

  // Input fields ke liye common style helper
  const getInputStyle = (fieldName) => ({
    ...inputStyle,
    borderColor: errors[fieldName] ? "red" : "#ccc",
  });

  return (
    <div style={containerStyle}>
      <h3 style={{ textAlign: "center", marginBottom: "20px" }}>Add New Supplier</h3>

      <button onClick={() => navigate("/admin/view-suppliers")} style={secondaryBtn}>
        ← Back to List
      </button>

      <form onSubmit={handleSubmit}>
        <div style={inputGroup}>
          <label style={labelStyle}>First Name *</label>
          <input 
            name="fname" 
            placeholder="e.g. Rahul" 
            style={getInputStyle("fname")} 
            onChange={handleChange} 
          />
          {errors.fname && <p style={errorStyle}>{errors.fname}</p>}
        </div>

        <div style={inputGroup}>
          <label style={labelStyle}>Last Name</label>
          <input 
            name="lname" 
            placeholder="e.g. Sharma" 
            style={getInputStyle("lname")} 
            onChange={handleChange} 
          />
          {errors.lname && <p style={errorStyle}>{errors.lname}</p>}
        </div>

        <div style={inputGroup}>
          <label style={labelStyle}>Address Line 1</label>
          <input 
            name="address1" 
            placeholder="Street address" 
            style={getInputStyle("address1")} 
            onChange={handleChange} 
          />
          {errors.address1 && <p style={errorStyle}>{errors.address1}</p>}
        </div>

        <div style={inputGroup}>
          <label style={labelStyle}>Mobile Number *</label>
          <input 
            name="mobile_no" 
            placeholder="10-digit number" 
            maxLength="10"
            style={getInputStyle("mobile_no")} 
            onChange={handleChange} 
          />
          {errors.mobile_no && <p style={errorStyle}>{errors.mobile_no}</p>}
        </div>

        <div style={inputGroup}>
          <label style={labelStyle}>Email Address *</label>
          <input 
            name="email" 
            type="email"
            placeholder="email@example.com" 
            style={getInputStyle("email")} 
            onChange={handleChange} 
          />
          {errors.email && <p style={errorStyle}>{errors.email}</p>}
        </div>

        <button 
          type="submit" 
          disabled={loading} 
          style={{...primaryBtn, opacity: loading ? 0.7 : 1}}
        >
          {loading ? "Adding..." : "Add Supplier"}
        </button>

        {errors.api && <p style={{...errorStyle, textAlign: 'center', marginTop: '10px'}}>{errors.api}</p>}
      </form>
    </div>
  );
};

// --- Styles ---

const containerStyle = {
  maxWidth: "450px",
  margin: "30px auto",
  padding: "25px",
  background: "#f9f9f9",
  borderRadius: "12px",
  boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
  fontFamily: "Arial, sans-serif"
};

const inputGroup = {
  marginBottom: "15px"
};

const labelStyle = {
  display: "block",
  fontSize: "14px",
  fontWeight: "bold",
  marginBottom: "5px",
  color: "#333"
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  borderRadius: "5px",
  border: "1px solid #ccc",
  boxSizing: "border-box", // Important for width
  fontSize: "15px"
};

const errorStyle = {
  color: "#d9534f",
  fontSize: "12px",
  margin: "4px 0 0"
};

const primaryBtn = {
  backgroundColor: "#28a745", // Green for 'Add' actions
  color: "#fff",
  padding: "12px",
  border: "none",
  borderRadius: "5px",
  marginTop: "10px",
  cursor: "pointer",
  width: "100%",
  fontSize: "16px",
  fontWeight: "bold"
};

const secondaryBtn = {
  backgroundColor: "transparent",
  color: "#007bff",
  border: "none",
  padding: "0",
  marginBottom: "20px",
  cursor: "pointer",
  textDecoration: "underline"
};

export default AddSupplier;