import { Navigate, Outlet } from "react-router-dom";

const AdminAuth = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) return <Navigate to="/admin-login" />;
  if (user.role !== "ADMIN") return <Navigate to="/unauthorized" />;

  return <Outlet />;
};

export default AdminAuth;
