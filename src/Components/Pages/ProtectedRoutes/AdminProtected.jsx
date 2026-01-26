import { Navigate } from "react-router-dom";

const AdminProtected = ({ children }) => {
  const adminToken = localStorage.getItem("adminToken"); 

  if (!adminToken) {
    return <Navigate to="/adminlogin" replace />;
  }

  return children;
};

export default AdminProtected;
