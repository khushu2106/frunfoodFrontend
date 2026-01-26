import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./AdminNavbar.css";

const AdminNavbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="admin-navbar">
      <input 
        type="text" 
        placeholder="Search..." 
        className="admin-search"
      />

      <div className="admin-profile" onClick={() => setOpen(!open)}>
        <span className="admin-name">Admin</span>
        <img 
          src="" 
          alt="profile"
          className="admin-avatar"
        />

        {open && (
          <div className="auth-dropdown">
            <Link to="/admin/profile">Profile</Link>
            <Link to="/admin/Logout">Logout</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminNavbar;
