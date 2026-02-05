import { Navigate, Outlet } from "react-router-dom";

const AdminAuth = () => {
  const token = localStorage.getItem("adminToken");
  const user = JSON.parse(localStorage.getItem("user"));

  if (!token || !user) {
    return <Navigate to="/admin-login" />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/unauthorized" />;
  }

  return <Outlet />;
};

export default AdminAuth;
