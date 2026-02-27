import { Outlet } from "react-router-dom";
import SideBarD from "./SideBarD";
import HeaderD from "./HeaderD";
import "./DeliveryLayout.css"

const DeliveryLayout = () => {
  return (
    <div className="delivery-layout">

      {/* Top Navbar */}
      <HeaderD />

      {/* Sidebar + Content */}
      <div className="delivery-body">
        <SideBarD />

      </div>

    </div>
  );
};

export default DeliveryLayout;