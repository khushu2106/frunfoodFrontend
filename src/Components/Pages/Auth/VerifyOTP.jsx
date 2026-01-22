import React, { useState } from "react";
import "./VerifyOtp.css";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleVerify = (e) => {
    e.preventDefault();

    if (!otp) {
      setError("Please enter OTP");
      return;
    }

    if (otp.length !== 6) {
      setError("OTP must be 6 digits");
      return;
    }

    setError("");
    setSuccess("OTP verified successfully");

    /*
      🔗 API CALL HERE
      ----------------------------------
      POST /api/verify-otp
      body: {
        email: userEmail,  // from forgot password step
        otp: otp
      }

      On success:
      👉 redirect to Reset Password page
    */
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
          {/* 🔗 API CALL: resend OTP */}
        </div>
      </form>
    </div>
  );
};

export default VerifyOtp;