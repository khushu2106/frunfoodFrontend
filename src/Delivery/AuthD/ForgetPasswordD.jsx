import { useState } from "react";
import { Link } from "react-router-dom";
import "./ForgetPasswordD.css";

const ForgetPasswordD = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      alert("Email is required");
      return;
    }

    alert("Password reset link sent to " + email);
  };

  return (
    <div className="forgetD-container">
      <div className="forgetD-card">
        <h2>Forgot Password</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter registered email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button type="submit">Send Reset Link</button>
        </form>

        <p className="forgetD-back">
          <Link to="/delivery/login">Back to Login</Link>
        </p>
      </div>
    </div>
  );
};

export default ForgetPasswordD;
