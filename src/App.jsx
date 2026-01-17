import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';

import HeroHome from './Components/Home/HeroHome/HeroHome';
import ProductList from './Components/Home/Products/ProductList';
import ProductDetails from './Components/Home/Products/ProductDetails';
import Aboutus from './Components/Home/Aboutus/Aboutus';
import AdminLayout from './Components/Pages/Admin/AdminLayout';
import Dashboard from './Components/Pages/Admin/Dashboard';
import Balance from './Components/Pages/Admin/Balance';
import Invoice from './Components/Pages/Admin/Invoice';
import Users from './Components/Pages/Admin/Users';
import Cards from './Components/Pages/Admin/Cards';
import Transaction from './Components/Pages/Admin/Transaction';
import Profile from './Components/Pages/Admin/Profile';
import Settings from './Components/Pages/Admin/Settings';
import UserDetails from './Components/Pages/Admin/UserDetails';
import AddProduct from './Components/Pages/Admin/Products/AddProduct';
import AddCategory from './Components/Pages/Admin/Products/AddCategory';
import UpdateProduct from './Components/Pages/Admin/Products/UpdateProduct';
import Registration from './Components/Pages/Auth/Registration';
import Login from './Components/Pages/Auth/Login';
import ForgotPassword from './Components/Pages/Auth/ForgotPassword';
import Category from './Components/Home/Products/Category';
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
import Header from './Components/Common/Header/Header';
import Footer from './Components/Common/Footer/Footer';
import AddBrand from './Components/Pages/Admin/Products/AddBrand';
import AddSubcategory from './Components/Pages/Admin/Products/AddSubcategory';

function LayoutWrapper() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      {!isAdminRoute && <Header />}

      <Routes>
        {/* Home */}
        <Route path="/" element={<><HeroHome /><Category /><ProductList /><Offers /></>} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/productSearch" element={<ProductSearch />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/about" element={<Aboutus />} />
        <Route path="/contact" element={<Contact />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* User */}
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/profile" element={<ProfileC />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/complaint" element={<Complaint />} />

        {/* Admin */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="balance" element={<Balance />} />
          <Route path="invoice" element={<Invoice />} />
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
          <Route path="users/:id" element={<UserDetails />} />
        </Route>

        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>

      {!isAdminRoute && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <LayoutWrapper />
    </Router>
  );
}

export default App;
