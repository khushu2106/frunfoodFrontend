import { useState } from "react";
import { Link } from "react-router-dom";
import "./Auth.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Password reset link sent to: ${email}`);
    // TODO: Call Forgot Password API
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Forgot Password 🔒</h2>
        <p className="auth-subtitle">
          Enter your registered email to reset password
        </p>

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

          <button type="submit" className="btn-primary">
            Send Reset Link
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
