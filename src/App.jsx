import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import HeroHome from './Components/Home/HeroHome/HeroHome'
import Navbar from './Components/Common/Navbar/Navbar'
import Login from './Components/Pages/Auth/Login'
import Registration from "./Components/Pages/Auth/Registration"
import Logout from "./Components/Pages/Auth/Logout"
import Payment from "./Components/Pages/Payment/Payment"
import ForgotPassword from "./Components/Pages/Auth/ForgotPassword"
import Feedback from "./Components/Pages/Feedback/Feedback"
import Offer from "./Components/Home/Offers/Offers"
import Complaint from "./Components/Pages/Complaint/Complaint"





function App() {
  return (
    <BrowserRouter>
      <Routes>      
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Registration />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/offers" element={<Offer />} />
        <Route path="/complaint" element={<Complaint />} />


      </Routes>
    </BrowserRouter>
  )
}

export default App
