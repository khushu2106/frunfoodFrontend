import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import HeroHome from './Components/Home/HeroHome/HeroHome';
import HeroSection from './Components/Home/HeroHome/HeroSection';
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
// import Chat from './Components/Pages/Admin/Chat';
// import Authentication from './Components/Pages/Admin/Authentication';

function App() {
  return (
    <Router>
      <Routes>
        {/* User Side */}
        <Route path='/' element={
          <>
            <HeroHome />
            <HeroSection />
            <CategoryProduct />
            <ProductList />
          </>
        } />

        <Route path='/shop' element={<CategoryProduct />} />
        <Route path='/product/:id' element={<ProductDetails />} />
        <Route path='/about' element={<Aboutus />} />

        {/* Admin Panel with Sidebar Layout */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="balance" element={<Balance />} />
          <Route path="invoice" element={<Invoice />} />
          <Route path="cards" element={<Cards />} />
          <Route path="transaction" element={<Transaction />} />
          {/* <Route path="chat" element={<Chat />} /> */}
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
          {/* <Route path="authentication" element={<Authentication />} /> */}
        </Route>

        <Route path="*" element={<div>Page Not Found</div>} />

      </Routes>
    </Router>
  );
}

export default App;
