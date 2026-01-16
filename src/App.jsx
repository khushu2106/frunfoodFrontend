import { Routes, Route } from "react-router-dom";

/* ===== AUTH D ===== */
import LoginD from "./Delivery/AuthD/LoginD";
import LogoutD from "./Delivery/AuthD/LogoutD";
import OtpVerifyD from "./Delivery/AuthD/OtpVerifyD";

/* ===== LAYOUT D ===== */
import HeaderD from "./Delivery/LayoutD/HeaderD";
import SideBarD from "./Delivery/LayoutD/SideBarD";

/* ===== PAGES D ===== */
import DashBoardD from "./Delivery/PagesD/DashBoardD";
import AssignedOrdersD from "./Delivery/PagesD/AssignedOrdersD";
import AvailabilityD from "./Delivery/PagesD/AvailabilityD";
import DeliveryHistoryD from "./Delivery/PagesD/DeliveryHistoryD";
import EarningD from "./Delivery/PagesD/EarningD";
import NotificationsD from "./Delivery/PagesD/NotificationsD";
import OrdersDetailsD from "./Delivery/PagesD/OrdersDetailsD";
import ProfileD from "./Delivery/PagesD/ProfileD";
import AddDeliveryBoyD from "./Delivery/PagesD/AddDeliveryBoyD";

/* ===== DELIVERY LAYOUT ===== */
const DeliveryLayout = ({ children }) => {
  return (
    <div className="delivery-layout">
      <HeaderD />
      <div style={{ display: "flex" }}>
        <SideBarD />
        <div style={{ flex: 1, padding: "20px" }}>
          {children}
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <Routes>

      {/* ===== AUTH ===== */}
      <Route path="/" element={<LoginD />} />
      <Route path="/delivery/login" element={<LoginD />} />
      <Route path="/otp" element={<OtpVerifyD />} />
      <Route path="/logout" element={<LogoutD />} />

      {/* ===== DELIVERY DASHBOARD ===== */}
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

      {/* ✅ EDIT PROFILE ROUTE */}
      <Route
        path="/delivery/profile"
        element={
          <DeliveryLayout>
            <ProfileD />
          </DeliveryLayout>
        }
      />

      {/* OPTIONAL */}
      <Route
        path="/delivery/add-delivery-boy"
        element={
          <DeliveryLayout>
            <AddDeliveryBoyD />
          </DeliveryLayout>
        }
      />

    </Routes>
  );
}

export default App;
