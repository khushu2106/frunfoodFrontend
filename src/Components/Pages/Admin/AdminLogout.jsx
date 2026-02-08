import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Auth/Auth.css";

const AdminLogout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear auth data
    localStorage.removeItem("adminToken");
    // localStorage.removeItem("userToken");

    // Redirect after 2 seconds
    setTimeout(() => {
      navigate("/");
    }, 1000);
  }, [navigate]);

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Logging you out 👋</h2>
        <p className="auth-subtitle">
          You have been logged out successfully.
        </p>
        <p>Redirecting to home page...</p>
      </div>
    </div>
  );
};

export default AdminLogout;
