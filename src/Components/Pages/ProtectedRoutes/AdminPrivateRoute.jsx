 import { Navigate } from "react-router-dom";
 
 const AdminPrivateRoute = ({ Children }) =>{
    const adminToken = localStorage.getItem("adminToken");

    if(!adminToken){
      return <Navigate to="/admin-login" />;
    }
    return Children;
  }

  export default AdminPrivateRoute;