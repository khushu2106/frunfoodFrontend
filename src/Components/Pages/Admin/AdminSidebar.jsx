import React from "react";
import { NavLink } from "react-router-dom";
import "./AdminSidebar.css";

const AdminSidebar = () => {
  const menuItems = [
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "Product", path: "/admin/product" },
    { name: "Balance", path: "/admin/balance" },
    { name: "Invoice", path: "/admin/invoice" },
    { name: "Cards", path: "/admin/cards" },
    { name: "Transaction", path: "/admin/transaction" },
    { name: "Chat", path: "/admin/chat" },
    { name: "Profile", path: "/admin/profile" },
    { name: "Settings", path: "/admin/settings" }
  ];

  return (
    <div className="admin-sidebar">
      <h2 className="sidebar-title">Admin Panel</h2>
      <ul className="sidebar-menu">
        {menuItems.map((item) => (
          <li key={item.name}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                isActive ? "sidebar-link active" : "sidebar-link"
              }
            >
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminSidebar;
