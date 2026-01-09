import { useState } from 'react'
import './App.css'
import HeroHome from './Components/Home/HeroHome/HeroHome'
import { BrowserRouter, Route, Router } from 'react-router-dom'
function App() {
  return (
    <>
    <Route path="/">
      <HeroHome/>
    </Route>
    </>
  )
}

export default App  
