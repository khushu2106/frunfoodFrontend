import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import HeroHome from './Components/Home/HeroHome/HeroHome'
import Navbar from './Components/Common/Navbar'
// import Login from './Components/Pages/Auth/Login'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/hero" element={<HeroHome />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;