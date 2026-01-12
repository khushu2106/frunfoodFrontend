// import React from "react";
// import { Link, useLocation } from "react-router-dom";
// import "./Header.css";

// const Header = () => {
//   const location = useLocation();

//   // Example auth check (can be replaced with context / redux)
//   const deliveryLoggedIn = localStorage.getItem("deliveryToken");

//   return (
//     <header className="header">
      
//       {/* Logo */}
//       <div className="logo">
//         <Link to="/">🐾 PetFood</Link>
//       </div>

//       {/* Navigation Buttons */}
//       <div className="header-actions">

//         {!deliveryLoggedIn && (
//           <Link to="/LoginD" className="btn">
//             Delivery Login
//           </Link>
//         )}

//         {deliveryLoggedIn && (
//           <>
//             <Link to="/dashboard" className="btn">
//               Dashboard
//             </Link>

//             <Link to="/profiled" className="btn">
//               Profile
//             </Link>

//             <Link to="/logoutd" className="btn logout">
//               Logout
//             </Link>
//           </>
//         )}

//       </div>
//     </header>
//   );
// };

// export default Header;



import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  // simple auth check
  const deliveryLoggedIn = localStorage.getItem("deliveryToken");

  return (
    <header className="header">

      {/* Logo */}
      <div className="logo">
        <Link to="/">🐾 PetFood</Link>
      </div>

      {/* Buttons */}
      <div className="header-actions">

        {/* Show when NOT logged in */}
        {!deliveryLoggedIn && (
          <Link to="/delivery-login" className="btn">
            Delivery Login
          </Link>
        )}

        {/* Show when logged in */}
        {deliveryLoggedIn && (
          <>
            <Link to="/delivery-dashboard" className="btn">
              Dashboard
            </Link>

            <Link to="/delivery-profile" className="btn">
              Profile
            </Link>

            <Link to="/delivery-logout" className="btn logout">
              Logout
            </Link>
          </>
        )}

      </div>
    </header>
  );
};

export default Header;
