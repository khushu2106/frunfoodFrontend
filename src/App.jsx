import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';

import HeroHome from './Components/Home/HeroHome/HeroHome';
import ProductList from './Components/Home/Products/ProductList';
import ProductDetails from './Components/Home/Products/ProductDetails';
import Aboutus from './Components/Home/Aboutus/Aboutus';
import Faq from "./Components/Home/Faq/Faq";

import AdminLayout from './Components/Pages/Admin/AdminLayout';
import Dashboard from './Components/Pages/Admin/Dashboard/Dashboard';
import Balance from './Components/Pages/Admin/Balance';
import Invoice from './Components/Pages/Admin/Invoice';
import Users from './Components/Pages/Admin/Users';
import Orders from './Components/Pages/Admin/Orders';
import Cards from './Components/Pages/Admin/Cards';
import Transaction from './Components/Pages/Admin/Transaction'
import Profile from './Components/Pages/Admin/Profile';
import Settings from './Components/Pages/Admin/Settings';
import UserDetails from './Components/Pages/Admin/UserDetails';
import Chat from './Components/Pages/Admin/Chat';
// import AdminDelivery from './Components/Pages/Admin/AdminDelivery';
import AddProduct from './Components/Pages/Admin/Products/AddProduct';
import ViewPurchases from './Components/Pages/Admin/Purchase/Allpurchase';
import AddCategory from './Components/Pages/Admin/Products/AddCategory';
import UpdateProduct from './Components/Pages/Admin/Products/UpdateProduct';
import Registration from './Components/Pages/Auth/Registration';
import VerifyOTP from './Components/Pages/Auth/VerifyOTP';
import ResetPassword from './Components/Pages/Auth/ResetPassword';
import Login from './Components/Pages/Auth/Login';
import ForgotPassword from './Components/Pages/Auth/ForgotPassword';
import Category from './Components/Home/Products/Category';
import CategoryProducts from './Components/Home/Products/CategoryProducts';
import Offers from './Components/Home/Offers/Offers';
import ProductSearch from './Components/Home/Products/ProductSearch';
import ProductFilter from "./Components/Home/ProductFilter/ProductFilter";
import Contact from './Components/Home/Contact/Contact';
import Logout from './Components/Pages/Auth/Logout';
import Cart from './Components/Pages/Cart/Cart';
import Wishlist from './Components/Pages/Wishlist/Wishlist';
import Checkout from './Components/Pages/Checkout/Checkout';
import Payment from './Components/Pages/Payment/Payment';
import ProfileC from './Components/Pages/Auth/Profile/ProfileC';
import Feedback from "./Components/Pages/Feedback/Feedback"
import Complaint from "./Components/Pages/Complaint/Complaint"
import Header from './Components/Common/Header/Header';
// import FAQ from "./Components/Home/FAQ/FAQ";
import Footer from './Components/Common/Footer/Footer';
import AddBrand from './Components/Pages/Admin/Products/AddBrand';
import AddSubcategory from './Components/Pages/Admin/Products/AddSubcategory';
import AdminLogin from './Components/Pages/Admin/AdminLogin';
import AddPurchase from './Components/Pages/Admin/AddPurchase';
import AdminManageProducts from './Components/Pages/Admin/Products/ManageProducts';
import EditProduct from './Components/Pages/Admin/Products/EditProduct';
import AdminProtected from './Components/Pages/ProtectedRoutes/AdminProtected';
import Products from "./Components/Pages/Products";
import { CartProvider } from './Components/Pages/Cart/Cartcontext';

// --- Auth Components ---
import LoginD from './Components/Pages/Delivery/AuthD/LoginD';
import ForgetPasswordD from './Components/Pages/Delivery/AuthD/ForgetPasswordD';
import LogoutD from './Components/Pages/Delivery/AuthD/LogoutD';
import OtpVerifyD from './Components/Pages/Delivery/AuthD/OtpVerifyD';

// import HeaderD from './Components/Pages/Delivery/LayoutD/HeaderD';
import SideBarD from './Components/Pages/Delivery/LayoutD/SideBarD';

// --- Pages Components ---
import AddDeliveryBoyD from './Components/Pages/Delivery/PagesD/AddDeliveryBoyD';
import AssignedOrdersD from './Components/Pages/Delivery/PagesD/AssignedOrdersD';
import AvailabilityD from './Components/Pages/Delivery/PagesD/AvailabilityD';
import DashBoardD from './Components/Pages/Delivery/PagesD/DashBoardD';
import DeliveryHistoryD from './Components/Pages/Delivery/PagesD/DeliveryHistoryD';
import EarningD from './Components/Pages/Delivery/PagesD/EarningD';
import NotificationsD from './Components/Pages/Delivery/PagesD/NotificationsD';
import ProfileD from './Components/Pages/Delivery/PagesD/ProfileD';
import SettingsD from './Components/Pages/Delivery/PagesD/SettingsD';
import OrderDetailsD from './Components/Pages/Delivery/PagesD/OrdersDetailsD';
import MyOrders from './Components/Pages/Order/Myorder';
import PendingOrders from './Components/Pages/Admin/Delivery/PendingOrder';
import AssignDelivery from './Components/Pages/Admin/Delivery/AssignDelivery';
import DeliveryStatus from './Components/Pages/Admin/Delivery/DeliveryStatus';
import DeliveryList from './Components/Pages/Admin/Delivery/DeliveryList';


function LayoutWrapper() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isdeliveryRoute = location.pathname.startsWith('/delivery');
  const authRoutes = ['/login', '/register', '/forgot-password', '/logout', '/verify-otp', '/reset-password', '/checkout', '/profile'];

  const isAuthRoute = authRoutes.includes(location.pathname);
  const showHeaderFooter = !isAdminRoute && !isAuthRoute && !isdeliveryRoute;
  return (
    <>
      {showHeaderFooter && <Header />}

      <Routes>
        {/* Home */}
        <Route path="/" element={<><HeroHome /><Category /><ProductList /><Offers /></>} />
        <Route path="/products" element={<><ProductList /><Category /><Offers /></>} />
        <Route
          path="/product/:id"
          element={<ProductDetails key={window.location.pathname} />}
        />
        <Route path="/productSearch" element={<ProductSearch />} />
                    <Route path="/products/category/:category" element={<CategoryProducts />} />

         <Route path="/ProductFilter" element={<ProductFilter />} />
         <Route path="/ProductSearch" element={<ProductSearch />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/about" element={<Aboutus />} />
         <Route path="/faq" element={<Faq />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/category/:id" element={<CategoryProducts />} />
        {/* <Route path="/faq" element={<FAQ />} /> */}
        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />


        {/* User */}
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/myorders" element={<MyOrders />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/profile" element={<ProfileC />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/complaint" element={<Complaint />} />

        {/* Admin */}
        <Route
          path="/admin"
          element={
            <AdminProtected>
              <AdminLayout />
            </AdminProtected>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="balance" element={<Balance />} />
          <Route path="invoice/:id" element={<Invoice />} />
          <Route path="cards" element={<Cards />} />
          <Route path="transaction" element={<Transaction />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="add-category" element={<AddCategory />} />
          <Route path="update-product" element={<UpdateProduct />} />
          <Route path="subcategory" element={<AddSubcategory />} />
          <Route path="brand" element={<AddBrand />} />
          <Route path="users" element={<Users />} />
          <Route path="orders" element={<Orders />} />
          <Route path="add-purchase" element={<AddPurchase />} />
          <Route path="chat" element={<Chat />} />
          <Route path="manage-products" element={<AdminManageProducts />} />
          <Route path="edit-product/:id" element={<EditProduct />} />
          <Route path="users/:id" element={<UserDetails />} />
          <Route path="invoice" element={<Invoice />} />
          <Route path="view-purchases" element={<ViewPurchases />} />
          {/* <Route path="delivery" element={<AdminDelivery />} /> */}
          <Route path="pending" element={<PendingOrders />} />
          <Route path="delivery-list" element={<DeliveryList />} />
          <Route path="assignorder" element={<AssignDelivery />} />
          <Route path="deliverystatus" element={<DeliveryStatus />} />
        </Route>

               <Route
          path="/delivery"
          element={
            <> <SideBarD /> </>} >
          <Route index element={<DashBoardD />} />

  <Route path="dashboard" element={<DashBoardD />} />
  <Route path="login" element={<LoginD />} />
  <Route path="otpverify" element={<OtpVerifyD />} />
  <Route path="forgot-password" element={<ForgotPassword />} />
  <Route path="logout" element={<LogoutD />} />
  <Route path="profile" element={<ProfileD />} />
  <Route path="settings" element={<SettingsD />} />
  <Route path="add-delivery" element={<AddDeliveryBoyD />} />
  <Route path="assigned-orders" element={<AssignedOrdersD />} />
  <Route path="availability" element={<AvailabilityD />} />
  <Route path="history" element={<DeliveryHistoryD />} />
  <Route path="earning" element={<EarningD />} />
  <Route path="notifications" element={<NotificationsD />} />
  <Route path="orderdetails" element={<OrderDetailsD />} />

</Route>
          

        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>

      {showHeaderFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <CartProvider>
      <Router>
        <LayoutWrapper />
      </Router>
    </CartProvider>
  );
}

export default App;
