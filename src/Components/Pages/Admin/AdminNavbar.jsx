import React, { useState, useRef, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa"; 
import { Link } from "react-router-dom";
import "./AdminNavbar.css";

const AdminNavbar = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null); // ref should cover both icon and dropdown

  useEffect(() => {
    const handleClickOutside = (event) => {
      // if click is outside the dropdown container, close it
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="admin-navbar" style={{ position: "relative" }}>
      {/* attach ref to this container */}
      <div
        className="admin-profile"
        ref={dropdownRef}
        onClick={() => setOpen(!open)}
        style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
      >
        <FaUserCircle size={40} style={{ marginRight: "8px" }} />
        {/* <span className="admin-name">Admin</span> */}

        {open && (
          <div
            className="auth-dropdown"
            style={{
              position: "absolute",
              top: "40px",
              right: "0",
              background: "#fff",
              border: "1px solid #ddd",
              borderRadius: "5px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
              padding: "10px",
              zIndex: 1000,
            }}
          >
            <Link to="/admin/profile" style={{ display: "block", padding: "5px 0" }}>Profile</Link>
            <Link to="/admin/logout" style={{ display: "block", padding: "5px 0" }}>Logout</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminNavbar;
