import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';

import HeroHome from './Components/Home/HeroHome/HeroHome';
import ProductList from './Components/Home/Products/ProductList';
import ProductDetails from './Components/Home/Products/ProductDetails';
import Aboutus from './Components/Home/Aboutus/Aboutus';
// import Faq from "./Components/Home/Faq/Faq";

import AdminLayout from './Components/Pages/Admin/AdminLayout';
import Dashboard from './Components/Pages/Admin/Dashboard/Dashboard';
import Balance from './Components/Pages/Admin/Balance';
// import Invoice from './Components/Pages/Admin/Invoice';
import Users from './Components/Pages/Admin/Users';
import Orders from './Components/Pages/Admin/Orders';
import Cards from './Components/Pages/Admin/Cards';
import Profile from './Components/Pages/Admin/Profile';
import Settings from './Components/Pages/Admin/Settings';
import UserDetails from './Components/Pages/Admin/UserDetails';
import Chat from './Components/Pages/Admin/Chat';
import InvoiceManager from './Components/Pages/Admin/Invoicemanager';
import InvoiceView from './Components/Pages/Admin/InvoiceView';
// import AdminDelivery from './Components/Pages/Admin/AdminDelivery';
import AddProduct from './Components/Pages/Admin/Products/AddProduct';
import ViewPurchases from './Components/Pages/Admin/Purchase/Allpurchase';
import AddCategory from './Components/Pages/Admin/Products/AddCategory';
import UpdateProduct from './Components/Pages/Admin/Products/UpdateProduct';
import OrderDetails from './Components/Pages/Order/OrderDetails';
import Registration from './Components/Pages/Auth/Registration';
import VerifyOTP from './Components/Pages/Auth/VerifyOTP';
import ResetPassword from './Components/Pages/Auth/ResetPassword';
import Login from './Components/Pages/Auth/Login';
import ForgotPassword from './Components/Pages/Auth/ForgotPassword';
import Category from './Components/Home/Products/Category';
import CategoryProducts from './Components/Home/Products/CategoryProducts';
import Offers from './Components/Home/Offers/Offers';
import ProductSearch from './Components/Home/Products/ProductSearch';
import Contact from './Components/Home/Contact/Contact';
import Logout from './Components/Pages/Auth/Logout';
import Cart from './Components/Pages/Cart/Cart';
import Wishlist from './Components/Pages/Wishlist/Wishlist';
import Checkout from './Components/Pages/Checkout/Checkout';
import Payment from './Components/Pages/Payment/Payment';
import ProfileC from './Components/Pages/Auth/Profile/ProfileC';
import Feedback from "./Components/Pages/Feedback/Feedback"
import Complaint from "./Components/Pages/Complaint/Complaint"
import ProductListing from './Components/Home/ProductListing/ProductListing';
import Header from './Components/Common/Header/Header';
// import FAQ from "./Components/Home/FAQ/FAQ";
import Footer from './Components/Common/Footer/Footer';
import AddBrand from './Components/Pages/Admin/Products/AddBrand';
import AddSubcategory from './Components/Pages/Admin/Products/AddSubcategory';
import AdminLogin from './Components/Pages/Admin/AdminLogin';
import AdminLogout from './Components/Pages/Admin/AdminLogout';
import AddPurchase from './Components/Pages/Admin/AddPurchase';
import AddSupplier from './Components/Pages/Admin/Purchase/AddSupplier';
import ViewSupplier from './Components/Pages/Admin/Purchase/ViewSupplier';
import AddPurchaseReturn from './Components/Pages/Admin/Purchase/AddPurchaseReturn';
import AdminManageProducts from './Components/Pages/Admin/Products/ManageProducts';
import EditProduct from './Components/Pages/Admin/Products/EditProduct';
import AdminProtected from './Components/Pages/ProtectedRoutes/AdminProtected';
import Brand from "./Components/Home/Products/Brand";
// import BrandProducts from './Components/Home/Products/BrandProducts';
import DeliveryProtected from './Components/Pages/ProtectedRoutes/DeliveryProtected';
import Products from "./Components/Pages/Products";
import { CartProvider } from './Components/Pages/Cart/Cartcontext';

// --- Auth Components ---
import LoginD from './Components/Pages/Delivery/AuthD/LoginD';
import ForgetPasswordD from './Components/Pages/Delivery/AuthD/ForgetPasswordD';
import LogoutD from './Components/Pages/Delivery/AuthD/LogoutD';
import OtpVerifyD from './Components/Pages/Delivery/AuthD/OtpVerifyD';

// import HeaderD from './Components/Pages/Delivery/LayoutD/HeaderD';
import SideBarD from './Components/Pages/Delivery/LayoutD/SideBarD';
import DeliveryLayout from './Components/Pages/Delivery/LayoutD/DeliveryLayout';

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
import ScrollToTop from './Components/Pages/ScrollToTop';
import FAQ from './Components/Pages/Admin/Chat';
import OfferProducts from './Components/Home/Offers/OfferProduct';
import SalesReturn from './Components/Pages/Admin/SalesReturn';
import CancelledOrders from './Components/Pages/Order/CancelledOrders';
import City from './Components/Pages/Admin/City';
// import Brand from './Components/Home/Products/brand';
import BrandProducts from './Components/Home/Products/BrandProduct';
import Complaints from './Components/Pages/Admin/Complaints';
import Reports from './Components/Pages/Admin/Reports';
import Enquiries from './Components/Pages/Admin/Enquiries';
import AdminOffers from './Components/Pages/Admin/AdminOffer';
// import InvoiceManager from './Components/Pages/Admin/InvoiceManager';
// import InvoiceView from './Components/Pages/Admin/InvoiceView';

function LayoutWrapper() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isdeliveryRoute = location.pathname.startsWith('/delivery');
  const authRoutes = ['/login', '/register', '/forgot-password', '/logout', '/verify-otp', '/reset-password', '/checkout', '/profile'];

  const isAuthRoute = authRoutes.includes(location.pathname);
  const showHeaderFooter = !isAdminRoute && !isAuthRoute && !isdeliveryRoute;
  return (
    <>
      <ScrollToTop />
      {showHeaderFooter && <Header />}

      <Routes>
        {/* Home */}
        <Route path="/" element={<><HeroHome /><Category /><Brand /><ProductList /><Offers /><Aboutus /><FAQ /></>} />
        {/* <Route path="/products" element={<><ProductList /><Category /><Offers /></>} /> */}
        <Route path="/products" element={<ProductListing />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/productSearch" element={<ProductSearch />} />
        {/* <Route path="/category/:categoryId" element={<ProductListing />} /> */}
        <Route path="/products/category/:category" element={<CategoryProducts />} />

        <Route path="/offers" element={<Offers />} />
        <Route path="/about" element={<Aboutus />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/category/:id" element={<CategoryProducts />} />
        <Route path="/brands/:id" element={<><BrandProducts /><Category /><Brand /><ProductList /><Offers /></>} />
        <Route path="/offers/:offerType" element={<><OfferProducts /><Category /><Brand /><ProductList /><Offers /></>} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* User */}
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/cancelled-orders" element={<CancelledOrders />} />
        <Route path="/myorders" element={<><MyOrders /><ProductList /></>} />
        <Route path="/myorders/:id" element={<OrderDetails />} />
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
          <Route path="cards" element={<Cards />} />
          <Route path="purchase" element={<AddPurchase />} />
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
          <Route path="reports" element={<Reports />} />
          <Route path="view-purchases" element={<ViewPurchases />} />
          {/* <Route path="delivery" element={<AdminDelivery />} /> */}
          <Route path="pending" element={<PendingOrders />} />
          <Route path="delivery-list" element={<DeliveryList />} />
          <Route path="assignorder" element={<AssignDelivery />} />
          <Route path="deliverystatus" element={<DeliveryStatus />} />
          <Route path="city" element={<City />} />
          <Route path="return" element={<SalesReturn />} />
          <Route path="invoice" element={<InvoiceManager />} />
          <Route path="supplier" element={<AddSupplier />} />
          <Route path="view-suppliers" element={<ViewSupplier />} />
          <Route path="purchasereturn" element={<AddPurchaseReturn />} />
          <Route path="complaints" element={<Complaints />} />
          <Route path="enquiries" element={<Enquiries />} />
          <Route path="offers" element={<AdminOffers />} />
          <Route path="invoice/:type/:id" element={<InvoiceView />} />
        </Route>
        <Route path="/admin/logout" element={<AdminLogout />} />

        {/* Delivery Auth Routes */}
        <Route path="/delivery/login" element={<LoginD />} />
        <Route path="/delivery/otpverify" element={<OtpVerifyD />} />
        <Route path="/delivery/forgot-password" element={<ForgetPasswordD />} />
        <Route path="/delivery/logout" element={<LogoutD />} />

        {/* Delivery Protected Routes */}
        <Route
          path="/delivery"
          element={
            <DeliveryProtected>
              <DeliveryLayout />
            </DeliveryProtected>
          }
        >
          <Route index element={<DashBoardD />} />
          <Route path="dashboard" element={<DashBoardD />} />
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
