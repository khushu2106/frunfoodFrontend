import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./Auth.css";

const VerifyOTP = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location.state || {};

  const handleVerify = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/verify-otp",
        { email, otp }
      );

      if (res.data.success) {
        navigate("/reset-password", {
          state: { otpId: res.data.otpId }
        });
      }
    } catch (err) {
      alert("Invalid OTP");
    }
  };

  return (
    <div className="otp-container">
      <div className="otp-card">
        <h2>Verify OTP</h2>
        <p>Enter the OTP sent to your email</p>

        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={e => setOtp(e.target.value)}
          className="otp-input"
        />

        <button className="otp-btn" onClick={handleVerify}>
          Verify OTP
        </button>
      </div>
    </div>
  );
};

export default VerifyOTP;
