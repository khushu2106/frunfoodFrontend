import { Link, Outlet } from "react-router-dom";
import "./SideBarD.css";

function SideBarD() {
  return (
    <div className="delivery-container">
      <aside className="sidebar">
        <h2>Delivery Panel</h2>

        <nav>
          <Link to="/delivery/dashboard">Dashboard</Link>
          <Link to="/delivery/assigned-orders">Assigned Orders</Link>
          <Link to="/delivery/availability">Availability</Link>
          <Link to="/delivery/history">Delivery History</Link>
          <Link to="/delivery/earning">Earnings</Link>
          <Link to="/delivery/notifications">Notifications</Link>
          <Link to="/delivery/profile">Edit Profile</Link>
        </nav>
      </aside>

      {/* 👇 THIS IS THE KEY FIX */}
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}

export default SideBarD;
