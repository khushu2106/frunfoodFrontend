// import React from "react";
// import { Outlet } from "react-router-dom";
// import AdminSidebar from "./AdminSidebar";
// import AdminNavbar from "./AdminNavbar";

// const AdminLayout = () => {
//   return (
//     <div style={{ display: "flex" }}>
//       <AdminSidebar />
//      <div style={{ flex: 1, minHeight: "100vh" }}>
//         <AdminNavbar />
//         <div style={{ padding: "20px" }}>
//           <Outlet />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminLayout;
import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";
import AdminFooter from "./AdminFooter";

const AdminLayout = () => {
  return (
    <div style={{ display: "flex", minHeight: "100vh",marginTop:"0" }}>
      
      {/* Sidebar */}
      <AdminSidebar />

      {/* Right Side Content */}
      <div 
        style={{ 
          flex: 1, 
          display: "flex", 
          flexDirection: "column",
          minHeight: "100vh"
        }}
      >
        {/* Navbar */}
        <AdminNavbar />

        {/* Page Content */}
        <div 
          style={{ 
            flex: 1, 
            padding: "20px" 
          }}
        >
          <Outlet />
        </div>

        {/* Footer */}
        <AdminFooter />
      </div>
    </div>
  );
};

export default AdminLayout;