import { Link, useNavigate } from "react-router-dom";
import "./LoginD.css";

function LoginD() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // set login flag
    localStorage.setItem("deliveryLogin", "true");

    // go to dashboard
    navigate("/delivery/dashboard");
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Delivery Login</h2>

        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />

        <button onClick={handleLogin}>Login</button>

        <p style={{ marginTop: "10px" }}>
          <Link to="/delivery/forgot-password">Forgot Password?</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginD;
