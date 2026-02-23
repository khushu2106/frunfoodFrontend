import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaChevronDown, FaChevronUp, FaInfoCircle } from "react-icons/fa";
import {
  FaTachometerAlt,
  FaBoxOpen,
  FaTags,
  FaLayerGroup,
  FaTrademark,
  FaShoppingBag,
  FaPlusCircle,
  FaTruck,
  FaClock,
  FaUserFriends,
  FaTasks,
  FaMapMarkedAlt,
  FaFileInvoice,
  FaStar,
  FaShoppingCart,
  FaQuestionCircle,
  FaUserCog,
  FaCog,
  FaChartBar,
  FaRegCommentDots,
  FaExchangeAlt,
  FaUsers,
  FaHeadset,
  FaUserTie,
  FaGift
} from "react-icons/fa";
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
    { name: "Dashboard", path: "/admin/dashboard", icon: <FaTachometerAlt /> },
    {
      name: "Product",
      icon: <FaBoxOpen />,
      subItems: [
        { name: "Manage Category", path: "/admin/add-category", icon: <FaTags /> },
        { name: "Manage Subcategory", path: "/admin/subcategory", icon: <FaLayerGroup /> },
        { name: "Manage Brand", path: "/admin/brand", icon: <FaTrademark /> },
        { name: "Manage Product", path: "/admin/manage-products", icon: <FaShoppingBag /> },
        { name: "Add New Product", path: "/admin/add-product", icon: <FaPlusCircle /> },
      ],
    },
    {
      name: "Delivery",
      icon: <FaTruck />,
      subItems: [
        { name: "Pending orders", path: "/admin/pending", icon: <FaClock />, },
        { name: "Delivery boy details", path: "/admin/delivery-list", icon: <FaUserFriends />, },
        { name: "Assign delivery", path: "/admin/assignorder", icon: <FaTasks />, }
        // { name: "Delivery status", path: "/admin/deliverystatus", icon: <FaTruck />, },
      ],
    },
    { name: "Offers", path: "/admin/offers", icon: <FaGift /> },
    { name: "Users", path: "/admin/users", icon: <FaUsers />, },
    { name: "Orders", path: "/admin/orders", icon: <FaShoppingCart />, },
    { name: "Order Return", path: "/admin/return", icon: <FaBoxOpen />, },
    { name: "Invoice", path: "/admin/invoice", icon: <FaFileInvoice />, },
    { name: "Feedback", path: "/admin/cards", icon: <FaStar />, },
    { name: "Supplier", path: "/admin/supplier", icon: <FaUserTie />, },
    { name: "Purchase", path: "/admin/purchase", icon: <FaShoppingBag />, },
    { name: "Purchase Return", path: "/admin/purchasereturn", icon: <FaExchangeAlt />, },
    { name: "Complaints", path: "/admin/complaints", icon: <FaRegCommentDots />, },
    { name: "Reports", path: "/admin/reports", icon: <FaChartBar />, },
    { name: "Enquiries", path: "/admin/enquiries", icon: <FaHeadset />, },
    { name: "FAQ", path: "/admin/chat", icon: <FaQuestionCircle />, },
    { name: "Profile", path: "/admin/profile", icon: <FaUserCog />, },
    { name: "City", path: "/admin/city", icon: <FaMapMarkedAlt />, },
    { name: "Settings", path: "/admin/settings", icon: <FaCog />, },
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
                    <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      {item.icon}
                      {item.name}
                    </span>
                    {isOpen ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
                  </div>

                  {/* Render Sub-menu */}
                  {isOpen && (
                    <ul className="subcategory-menu" style={{ listStyle: "none", paddingLeft: "20px" }}>
                      {item.subItems.map((sub) => (
                        <li key={sub.path}>
                          <NavLink to={sub.path} className="sidebar-link sub-link">
                            <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                              {sub.icon}
                              {sub.name}
                            </span>
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
                  <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    {item.icon}
                    {item.name}
                  </span>
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