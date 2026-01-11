import React from "react";
import "./AdminNavbar.css";

const AdminNavbar = () => {
  return (
    <div className="admin-navbar">
      <input 
        type="text" 
        placeholder="Search..." 
        className="admin-search"
      />

      <div className="admin-profile">
        <span className="admin-name">Admin</span>
        <img 
          src="https://i.pravatar.cc/40" 
          alt="profile" 
          className="admin-avatar"
        />
      </div>
    </div>
  );
};

export default AdminNavbar;
