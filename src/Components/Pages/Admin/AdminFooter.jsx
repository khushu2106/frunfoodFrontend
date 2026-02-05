import React from "react";
import "./AdminFooter.css";

const AdminFooter = () => {
  return (
    <footer className="admin-footer">
      <div className="admin-footer-container">
        
        {/* LEFT */}
        <div className="admin-footer-left">
          <h4>Fur & Food Admin Panel</h4>
          <p>Manage products, categories, brands & orders easily.</p>
        </div>

        {/* CENTER */}
        <div className="admin-footer-center">
          <p>© {new Date().getFullYear()} Fur & Food</p>
          <p>All rights reserved.</p>
        </div>

        {/* RIGHT */}
        <div className="admin-footer-right">
          <span>Admin Dashboard</span>
          <span className="dot">•</span>
          <span>v1.0</span>
        </div>

      </div>
    </footer>
  );
};

export default AdminFooter;
