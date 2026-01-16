import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import HeroHome from './Components/Home/HeroHome/HeroHome';
// import HeroSection from './Components/Home/HeroHome/HeroSection';
import ProductList from './Components/Home/Products/ProductList';
import ProductDetails from './Components/Home/Products/ProductDetails';
import CategoryProduct from './Components/Home/Products/CategoryProduct';
import Aboutus from './Components/Home/Aboutus/Aboutus';
import AdminLayout from './Components/Pages/Admin/AdminLayout';
import Dashboard from './Components/Pages/Admin/Dashboard';
import Balance from './Components/Pages/Admin/Balance';
import Invoice from './Components/Pages/Admin/Invoice';
import Cards from './Components/Pages/Admin/Cards';
import Transaction from './Components/Pages/Admin/Transaction';
import Profile from './Components/Pages/Admin/Profile';
import Settings from './Components/Pages/Admin/Settings';
import AdminLogin from './Components/Pages/Admin/AdminLogin';
// import Chat from './Components/Pages/Admin/Chat';
// import Authentication from './Components/Pages/Admin/Authentication';
import AddProduct from './Components/Pages/Admin/Products/AddProduct';
import AddCategory from './Components/Pages/Admin/Products/AddCategory';
import UpdateProduct from './Components/Pages/Admin/Products/UpdateProduct';
import Registration from './Components/Pages/Auth/Registration';
import Login from './Components/Pages/Auth/Login';
import ForgotPassword from './Components/Pages/Auth/ForgotPassword';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* ---------- Home ---------- */}
          <Route
            path="/"
            element={
              <>
                <HeroHome />
                <Category />
                <ProductList />
                <Offer />
              </>
            }
          />

          <Route path="/category" element={<Category />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/productSearch" element={<ProductSearch />} />
          <Route path="/offers" element={<Offer />} />
          <Route path="/about" element={<Aboutus />} />
          <Route path="/contact" element={<Contact />} />

          {/* ---------- Auth ---------- */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* ---------- User ---------- */}
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/complaint" element={<Complaint />} />

          {/* ---------- Admin ---------- */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="balance" element={<Balance />} />
            <Route path="invoice" element={<Invoice />} />
            <Route path="cards" element={<Cards />} />
            <Route path="transaction" element={<Transaction />} />
            <Route path="profile" element={<AdminProfile />} />
            <Route path="settings" element={<Settings />} />
            <Route path="add-product" element={<AddProduct />} />
            <Route path="update-product" element={<UpdateProduct />} />
          </Route>

          {/* ---------- 404 ---------- */}
          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
