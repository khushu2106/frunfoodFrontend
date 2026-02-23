import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LogoutD.css";

const DeliveryLogoutD = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("deliveryToken");

    setTimeout(() => {
      navigate("/delivery/login");
    }, 1000);
  }, [navigate]);

  return (
    <div className="logout-container">
      <div className="logout-card">
        <h2>You have been logged out</h2>
        <p>Thank you for delivering pet happiness 🐶🐱</p>
      </div>
    </div>
  );
};

export default DeliveryLogoutD;
