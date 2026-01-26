import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./Auth.css";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email; 

  const handleVerify = async (e) => {
    e.preventDefault();

    if (!otp) {
      setError("Please enter OTP");
      return;
    }

    if (otp.length !== 6) {
      setError("OTP must be 6 digits");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/auth/verify-otp", {
        email,
        otp,
      });

      if (res.data.success) {
        setSuccess("OTP verified successfully");

        const otpId = res.data.otpId;
        navigate("/reset-password", { state: { otpId } });
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP");
    }
  };

  return (
    <div className="otp-container">
      <form className="otp-box" onSubmit={handleVerify}>
        <h2>Verify OTP</h2>
        <p>Enter the 6-digit OTP sent to your email</p>

        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}

        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
          maxLength="6"
        />

        <button type="submit">Verify OTP</button>

        <div className="resend">
          Didn’t receive OTP?
          <span> Resend</span>
        </div>
      </form>
    </div>
  );
};

export default VerifyOtp;
