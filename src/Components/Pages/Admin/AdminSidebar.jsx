import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import "./AdminSidebar.css";

const AdminSidebar = () => {
  // Use an object to track multiple open dropdowns independently
  const [openMenus, setOpenMenus] = useState({});

  const toggleMenu = (menuName) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menuName]: !prev[menuName],
    }));
  };

  const menuConfig = [
    { name: "Dashboard", path: "/admin/dashboard" },
    {
      name: "Product",
      subItems: [
        { name: "Manage Category", path: "/admin/add-category" },
        { name: "Manage Subcategory", path: "/admin/subcategory" },
        { name: "Manage Brand", path: "/admin/brand" },
        { name: "Manage Product", path: "/admin/manage-products" },
        { name: "Add New Product", path: "/admin/add-product" },
      ],
    },
    {
      name: "Delivery",
      subItems: [
        { name: "Pending orders", path: "/admin/pending" },
        { name: "Delivery boy details", path: "/admin/delivery-list" },
        { name: "Assign delivery", path: "/admin/assignorder" },
        { name: "Delivery status", path: "/admin/deliverystatus" },
      ],
    },
    // { name: "Balance", path: "/admin/balance" },
    { name: "Users", path: "/admin/users" },
    { name: "Orders", path: "/admin/orders" },
    { name: "Invoice", path: "/admin/invoice" },
    { name: "Feedback", path: "/admin/cards" },
    { name: "Purchase", path: "/admin/transaction" },
    { name: "FAQ", path: "/admin/chat" },
    { name: "Profile", path: "/admin/profile" },
    { name: "Settings", path: "/admin/settings" },
  ];

  return (
    <div className="admin-sidebar">
      <h2 className="sidebar-title">Admin Panel</h2>
      <ul className="sidebar-menu">
        {menuConfig.map((item) => {
          const hasSubItems = !!item.subItems;
          const isOpen = openMenus[item.name];

          return (
            <li key={item.name}>
              {hasSubItems ? (
                // Render Dropdown Trigger
                <>
                  <div
                    className={`sidebar-link dropdown-trigger ${isOpen ? "active-parent" : ""}`}
                    onClick={() => toggleMenu(item.name)}
                    style={{ cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}
                  >
                    <span>{item.name}</span>
                    {isOpen ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
                  </div>

                  {/* Render Sub-menu */}
                  {isOpen && (
                    <ul className="subcategory-menu" style={{ listStyle: "none", paddingLeft: "20px" }}>
                      {item.subItems.map((sub) => (
                        <li key={sub.path}>
                          <NavLink to={sub.path} className="sidebar-link sub-link">
                            {sub.name}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                // Render Standard Link
                <NavLink
                  to={item.path}
                  className={({ isActive }) => (isActive ? "sidebar-link active" : "sidebar-link")}
                >
                  {item.name}
                </NavLink>
              )}
            </li>
          );
        })}
      </ul>
      
    </div>
  );
};

export default AdminSidebar;