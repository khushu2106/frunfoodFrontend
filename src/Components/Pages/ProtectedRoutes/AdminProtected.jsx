import { Navigate } from "react-router-dom";

const AdminProtected = ({ children }) => {
  const adminToken = localStorage.getItem("adminToken"); // ya jo bhi aap token rakh rahe ho

  if (!adminToken) {
    return <Navigate to="/adminlogin" replace />;
  }

  return children;
};

export default AdminProtected;
