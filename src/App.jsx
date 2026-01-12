import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Common/Header/Header";
import Login from "./Components/Pages/Auth/Login";
import Registration from "./Components/Pages/Auth/Registration";
import Logout from "./Components/Pages/Auth/Logout";
import Payment from "./Components/Pages/Payment/Payment";
import ForgotPassword from "./Components/Pages/Auth/ForgotPassword";
import Feedback from "./Components/Pages/Feedback/Feedback";
import Offer from "./Components/Home/Offers/Offers";
import Complaint from "./Components/Pages/Complaint/Complaint";
import Cart from "./Components/Pages/Cart/Cart";
import Wishlist from "./Components/Pages/Wishlist/Wishlist";
import Profile from "./Components/Common/Profile/Profile";
import Footer from "./Components/Common/Footer/Footer";
import Checkout from "./Components/Pages/Checkout/Checkout";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/offers" element={<Offer />} />
        <Route path="/complaint" element={<Complaint />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
