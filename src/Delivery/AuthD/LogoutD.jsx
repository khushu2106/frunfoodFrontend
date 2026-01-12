import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LogoutD.css"

function LogoutD() {
  <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>You have been logged out</h2>
      <p>Thank you for delivering pet happiness 🐶🐱</p>
    </div>
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("deliveryLogin");
    navigate("/");
  }, [navigate]);

  return null;
}

export default LogoutD;
