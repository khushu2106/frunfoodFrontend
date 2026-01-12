import { Routes, Route } from "react-router-dom";

/* ===== AUTH D ===== */
import LoginD from "./Delivery/AuthD/LoginD";
import LogoutD from "./Delivery/AuthD/LogoutD";
import OtpVerifyD from "./Delivery/AuthD/OtpVerifyD";

/* ===== LAYOUT D ===== */
import HeaderD from "./Delivery/LayoutD/HeaderD";
import SideBarD from "./Delivery/LayoutD/SideBarD";

/* ===== PAGES D ===== */
import DashBoardD from "./Delivery/PagesD/DashBoardD.jsx";
import AssignedOrdersD from "./Delivery/PagesD/AssignedOrdersD.jsx";
import AvailabilityD from "./Delivery/PagesD/AvailabilityD.jsx";
import DeliveryHistoryD from "./Delivery/PagesD/DeliveryHistoryD.jsx";
import EarningD from "./Delivery/PagesD/EarningD.jsx";
import NotificationsD from "./Delivery/PagesD/NotificationsD.jsx";
import OrdersDetailsD from "./Delivery/PagesD/OrdersDetailsD.jsx";
import ProfileD from "./Delivery/PagesD/ProfileD.jsx";
import ForgetPasswordD from "./Delivery/AuthD/ForgetPasswordD.jsx";

/* ===== LAYOUT WRAPPER ===== */
const DeliveryLayout = ({ children }) => {
  return (
    <>
      <HeaderD />
      <SideBarD>{children}</SideBarD>
    </>
  );
};

function App() {
  return (
    <Routes>
        <Route path="/" element={<HeaderD />} />
      {/* ===== AUTH ROUTES ===== */}
      <Route path="/" element={<LoginD />} />
      <Route path="/otp" element={<OtpVerifyD />} />
      <Route path="/delivery/profile" element={<ProfileD />} />
        <Route path="/delivery/logout" element={<LogoutD />} />
       <Route path="/forgetpassword" element={<ForgetPasswordD />} />

      {/* ===== DELIVERY PANEL ROUTES ===== */}
      <Route
        path="/delivery/dashboard"
        element={
          <DeliveryLayout>
            <DashBoardD />
          </DeliveryLayout>
        }
      />

      <Route
        path="/delivery/assigned-orders"
        element={
          <DeliveryLayout>
            <AssignedOrdersD />
          </DeliveryLayout>
        }
      />

      <Route
        path="/delivery/availability"
        element={
          <DeliveryLayout>
            <AvailabilityD />
          </DeliveryLayout>
        }
      />

      <Route
        path="/delivery/history"
        element={
          <DeliveryLayout>
            <DeliveryHistoryD />
          </DeliveryLayout>
        }
      />

      <Route
        path="/delivery/earning"
        element={
          <DeliveryLayout>
            <EarningD />
          </DeliveryLayout>
        }
      />

      <Route
        path="/delivery/notifications"
        element={
          <DeliveryLayout>
            <NotificationsD />
          </DeliveryLayout>
        }
      />

      <Route
        path="/delivery/order-details"
        element={
          <DeliveryLayout>
            <OrdersDetailsD />
          </DeliveryLayout>
        }
      />

      <Route
        path="/delivery/profile"
        element={
          <DeliveryLayout>
            <ProfileD />
          </DeliveryLayout>
        }
      />
       
    </Routes>
  );
}

export default App;
