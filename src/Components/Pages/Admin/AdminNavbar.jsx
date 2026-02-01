import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "./AdminNavbar.css";

const AdminNavbar = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="admin-navbar">
      {/* <input 
        type="text" 
        placeholder="Search..." 
        className="admin-search"
      /> */}

      <div className="admin-profile" onClick={() => setOpen(!open)} >
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
