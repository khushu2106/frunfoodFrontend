import { Link, useNavigate } from "react-router-dom";
import "./HeaderD.css";

function HeaderD() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("deliveryLogin");
    navigate("/delivery-login");
  };

  return (
    <header className="header" style={{backgroundColor: "#006d5b", zIndex: 0}}>
      <div className="logo">
        🐾 <span>PetFood</span>
      </div>

      <div className="header-right">
        {/* My Profile */}
        <Link to="/delivery/profile" className="profile-link">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="Profile"
            className="profile-icon"
          />
          <span>My Profile</span>
        </Link>

        {/* Logout */}
        <Link to="/delivery/logout" className="profile-link">
        <button className="logout-btn" onClick={handleLogout} >
          Logout
        </button>
        </Link>
      </div>
    </header>
  );
}

export default HeaderD;
