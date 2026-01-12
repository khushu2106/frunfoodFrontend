import { Link } from "react-router-dom";
import "./SideBarD.css";

function SideBarD({ children }) {
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
          <Link to="/delivery/profile">Profile</Link>
          <Link to="/delivery/logout">Logout</Link>
          <Link to="/delivery/forgetpassword">FogotPassword</Link>
        </nav>
      </aside>

      <main className="content">{children}</main>
    </div>
  );
}

export default SideBarD;
