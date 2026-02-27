import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";
import { AuthContext } from "./Authcontext";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  /* 🔐 STRONG PASSWORD VALIDATION (FRONTEND ONLY) */
  // const isStrongPassword = (password) => {
  //   const strongPasswordRegex =
  //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  //   return strongPasswordRegex.test(password);
  // };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          expectedRole: "user",
        }),
      });

      const data = await response.json();

      if (response.ok) {

        login(data.token, data.user);

        const guestCart = JSON.parse(localStorage.getItem("guestCart") || "[]");
        if (guestCart.length > 0) {
          await fetch("http://localhost:5000/api/cart/sync", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${data.token}`
            },
            body: JSON.stringify({ items: guestCart }),
          });
          localStorage.removeItem("guestCart");
        }

        const guestWish = JSON.parse(localStorage.getItem("guestWishlist") || "[]");
        if (guestWish.length > 0) {
          await fetch("http://localhost:5000/api/wishlist/sync", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${data.token}`
            },
            body: JSON.stringify({ items: guestWish }),
          });
          localStorage.removeItem("guestWishlist");
        }

        navigate("/", { state: { welcomeUser: data.user.name } });
      } else {
        setError(data.error || "Invalid email or password");
      }
    } catch (err) {
      setError("Server error. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Welcome Back 👋</h2>
        <p className="auth-subtitle">Login to your account</p>

        {/* ERROR MESSAGE */}
        {error && <p className="error-text">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* PASSWORD WITH EYE ICON */}
          <div className="form-group password-group">
            <label>Password</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <span
                className="eye-icon"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁"}
              </span>
            </div>
          </div>

          <div className="form-extra">
            <p className="forgot">
              <Link to="/forgot-password">Forgot password?</Link>
            </p>
          </div>

          <button type="submit" className="btn-primary" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="auth-footer">
          Don’t have an account? <Link to="/register">Register</Link>
        </p>
      </div>
      {/* <div className="puppy-container">
          <div className="puppy-main">
            <span className="puppy-paw"></span>
            <div className="puppy-face"></div>
          </div>
        </div> */}
    </div>
  );
};

export default Login;
