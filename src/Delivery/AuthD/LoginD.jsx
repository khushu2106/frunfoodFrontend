import { Link } from "react-router-dom";
import { useState } from "react";
import "./LoginD.css";

const LoginD = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Username and Password are required");
      return;
    }

    setError("");
    alert("Login Successful");
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>Delivery Boy Login</h2>

        {error && <p className="error">{error}</p>}

        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Login</button>
        </form>

        {/* ✅ Forget password link */}
        <p className="forget-link">
          <Link to="/delivery-forget-password">Forgot Password?</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginD;
