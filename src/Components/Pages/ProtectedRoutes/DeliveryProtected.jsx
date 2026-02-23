import { Navigate } from "react-router-dom";

const DeliveryProtected = ({ children }) => {
  const deliveryToken = localStorage.getItem("deliveryToken");

  if (!deliveryToken) {
    return <Navigate to="/delivery/login" />;
  }

  return children;
};

export default DeliveryProtected;