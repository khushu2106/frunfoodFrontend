import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; 
import "./Auth.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(""); 
  const [error, setError] = useState("");     
  const [loading, setLoading] = useState(false); 

  const navigate = useNavigate();   // ✅ yahan hona chahiye

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/api/auth/forgot-password", { email });
      
      if (response.data.success) {
        alert("✅ Password reset link has been sent to your email!");
        navigate("/verify-otp", { state: { email: email } }); 
        setEmail(""); 
      }
    } catch (err) {
      if (err.response && err.response.status === 404) {
        alert(" Please enter a register email ");
      } else {
        alert("⚠️ Something went wrong. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Forgot Password 🔒</h2>
        <p className="auth-subtitle">
          Enter your registered email to reset password
        </p>

        {message && <p style={{ color: "green", fontWeight: "bold" }}>{message}</p>}
        {error && <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? "Sending..." : "Send Otp "}
          </button>
        </form>

        <p className="auth-footer">
          Remember your password?{" "}
          <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
