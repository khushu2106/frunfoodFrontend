import React from "react";
import "./AdminFooter.css";

const AdminFooter = () => {
  return (
    <footer className="admin-footer">
      <div className="admin-footer-container">

        {/* LEFT */}
        <div className="footer-section">
          <h3>Fur & Food Admin</h3>
          <p>Smart management system for products, orders & customers.</p>
        </div>

        {/* CENTER */}
        <div className="footer-section center">
          <p>© {new Date().getFullYear()} Fur & Food</p>
          <p className="sub-text">All rights reserved</p>
        </div>

        {/* RIGHT */}
        <div className="footer-section right">
          <p>Admin Dashboard</p>
          <p className="version">Version 1.0</p>
        </div>

      </div>
    </footer>
  );
};

export default AdminFooter;