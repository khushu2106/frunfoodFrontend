import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // BrowserRouter ko as Router import kiya
import './App.css';
import HeroHome from './Components/Home/HeroHome/HeroHome';
import HeroSection from './Components/Home/HeroHome/HeroSection';
import Navbar from './Components/Common/Navbar/Navbar';
import ProductList from './Components/Home/Products/ProductList';
import ProductDetails from './Components/Home/Products/ProductDetails';
import CategoryProduct from './Components/Home/Products/CategoryProduct';
import Aboutus from './Components/Home/Aboutus/Aboutus';
// import Login from './Components/Pages/Auth/Login'

function App() {
  return (
    <Router>
      <Navbar />
      {/* Routes tag ke andar hi saare Route honge */}
      <Routes>
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
        {/* <Route path='/contact' element={<CategoryProduct />}/> */}
      </Routes>
    </Router>
  );
}

export default App;