import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginD.css";
import { AuthContext } from "../../Auth/Authcontext";

function LoginD() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          expectedRole: "delivery_boy",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Invalid delivery credentials");
      }

      // ✅ Save delivery specific auth
      localStorage.setItem("deliveryToken", data.token);
      localStorage.setItem("deliveryRole", "delivery_boy");
      localStorage.setItem("deliveryLogin", "true");

      navigate("/delivery/dashboard");

    } catch (err) {
      alert(err.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Delivery Login</h2>

        {error && <p className="error-text" style={{ color: "red" }}>{error}</p>}

        <form onSubmit={handleLogin}>
          <input
            type="email"
            name="email"
            placeholder="Delivery Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button type="submit" disabled={isLoading}>
            {isLoading ? "Checking..." : "Login"}
          </button>
        </form>

        <p style={{ marginTop: "10px" }}>
          <Link to="/delivery/forgot-password">Forgot Password?</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginD;