import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import "./AdminSidebar.css";

const AdminSidebar = () => {
  const [productDropdown, setProductDropdown] = useState(false);

  const otherMenuItems = [
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "Balance", path: "/admin/balance" },
    { name: "Users", path: "/admin/users" },
    { name: "Orders", path: "/admin/orders" },
    { name: "Invoice", path: "/admin/invoice" },
    { name: "Feedback", path: "/admin/cards" },
    { name: "Purchase", path: "/admin/transaction" },
    { name: "FAQ", path: "/admin/chat" },
    { name: "Profile", path: "/admin/profile" },
    { name: "Settings", path: "/admin/settings" }
  ];

  return (
    <div className="admin-sidebar">
      <h2 className="sidebar-title">Admin Panel</h2>
      <ul className="sidebar-menu">

        <li>
          <NavLink to="/admin/dashboard" className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}>
            Dashboard
          </NavLink>
        </li>

        {/* Product Dropdown Section */}
        <li>
          <div
            className="sidebar-link dropdown-trigger"
            onClick={() => setProductDropdown(!productDropdown)}
            style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
          >
            <span>Product</span>
            {productDropdown ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
          </div>

          {/* Sub-menu items */}
          {productDropdown && (
            <ul className="subcategory-menu" style={{ listStyle: 'none', paddingLeft: '20px' }}>
              <li>
                <NavLink to="/admin/add-category" className="sidebar-link sub-link">Manage Category</NavLink>
              </li>
              <li>
                <NavLink to="/admin/subcategory" className="sidebar-link sub-link">Manage Subcategory</NavLink>
              </li>
              <li>
                <NavLink to="/admin/brand" className="sidebar-link sub-link">Manage Brand</NavLink>
              </li>
              <li>
                <NavLink to="/admin/manage-products" className="sidebar-link sub-link">Manage Product</NavLink>
              </li>
              <li>
                <NavLink to="/admin/add-product" className="sidebar-link sub-link">Add New Product</NavLink>
              </li>
            </ul>
          )}
        </li>

        {otherMenuItems.filter(item => item.name !== "Dashboard").map((item) => (
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
