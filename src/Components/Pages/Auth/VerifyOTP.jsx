import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./Auth.css";

const VerifyOTP = () => {
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(30);
  const [resending, setResending] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location.state || {};

  // ⏳ Timer Countdown
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [timer]);

  // ✅ Verify OTP
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
      alert("Invalid or expired OTP ❌");
    }
  };

  // 🔁 Resend OTP (same forgot-password API reuse)
  const handleResend = async () => {
    try {
      setResending(true);

      await axios.post(
        "http://localhost:5000/api/auth/forgot-password",
        { email }
      );

      alert("OTP resent successfully 📩");
      setTimer(30); // reset cooldown
    } catch (err) {
      alert("Failed to resend OTP ❌");
    } finally {
      setResending(false);
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
          onChange={(e) => setOtp(e.target.value)}
          className="otp-input"
        />

        <button className="otp-btn" onClick={handleVerify}>
          Verify OTP
        </button>

        {/* 🔁 Resend Section */}
        <p style={{ marginTop: "12px", fontSize: "14px" }}>
          Didn’t receive OTP?{" "}
          {timer > 0 ? (
            <span style={{ color: "gray" }}>
              Resend in {timer}s
            </span>
          ) : (
            <button
              onClick={handleResend}
              disabled={resending}
              style={{
                border: "none",
                background: "none",
                color: "#007bff",
                cursor: "pointer",
                fontWeight: "bold"
              }}
            >
              {resending ? "Sending..." : "Resend OTP"}
            </button>
          )}
        </p>
      </div>
    </div>
  );
};

export default VerifyOTP;