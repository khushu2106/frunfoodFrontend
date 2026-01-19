import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const VerifyOTP = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email; // ForgotPassword page se email receive karna

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/verify-otp", { email, otp });
      if (res.data.success) {
        navigate("/reset-password", { state: { email: email } });
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Verify OTP 🔑</h2>
        <p>Sent to: <b>{email}</b></p>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form onSubmit={handleVerify}>
          <input 
            type="text" 
            placeholder="Enter 6-digit OTP" 
            value={otp} 
            onChange={(e) => setOtp(e.target.value)} 
            maxLength="6"
            required 
          />
          <button type="submit" className="btn-primary">Verify OTP</button>
        </form>
      </div>
    </div>
  );
};

export default VerifyOTP;