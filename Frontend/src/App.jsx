import React, { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Doctor from './pages/Doctor'
import About from './pages/About'
import Contact from './pages/Contact'
import Navbar from './component/Navbar'
import Header from './component/Header'
import Footer from './component/Footer'
import MyAppointment from './pages/MyAppointment'
import Login from './pages/Login'
import Speciality from './component/Speciality'
import MyProfile from './pages/MyProfile'
import Appointment from './pages/Appointment'
import { ToastContainer,toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function App() {
  const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return null;
};
  return (
    <div>
      <ToastContainer />
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/doctor' element={<Doctor />} />
        <Route path="/doctors/:spciality" element={<Doctor />} />
        <Route path='/About' element={<About />} />
        <Route path='/Contact' element={<Contact />} />
        <Route path="/appointment" element={<MyAppointment />} />
        <Route path="/my-appointments" element={<Appointment />} />
        <Route path="/appointment/:docId" element={<MyAppointment />} />
        <Route path="/login" element={<Login /> } />
        <Route path="/MyProfile" element={<MyProfile />} />
      </Routes>
      <Footer />
    </div>

  )
}
