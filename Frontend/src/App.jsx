import React from 'react'
import Navbar from './components/Navbar'
import Home from './components/Home'
import { Route, Routes, useLocation } from 'react-router-dom'
import Login from './components/Login'
import SignUp from './components/SignUp'
import Footer from './components/Footer'

const App = () => {

  const location = useLocation()

  // Pages where Navbar should NOT show
  const hideNavbar = location.pathname === "/login" || location.pathname === "/signup"

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<SignUp/>}/>
      </Routes>
      {!hideNavbar && <Footer/>}
      

    </>
  )
}

export default App
