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
          src="https://i.pravatar.cc/40" 
          alt="profile"
          className="admin-avatar"
        />

        {open && (
          <div className="auth-dropdown">
            <Link to="/admin/login">Sign In</Link>
            <Link to="/admin/register">Sign Up</Link>
            <button className="logout-btn">Logout</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminNavbar;
