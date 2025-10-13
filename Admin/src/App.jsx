import React from 'react'
import Login from './component/Login'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { useContext } from 'react';
import { AdminContext } from './context/AdminContext';
import Navbar from './component/Navbar';
import Sidebar from './component/Sidebar';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Admin/Dashboard';
import AllAppointments from './pages/Admin/AllAppointments';
import AddDoctor from './pages/Admin/AddDoctor';
import DoctorsList from './pages/Admin/DoctorsList';
import { DoctorContext } from './context/DoctorContext';
import DoctorDashboard from './pages/Doctor/DoctorDashboard';
import DoctorAppointments from './pages/Doctor/DoctorAppointments';
import DoctorProfile from './pages/Doctor/DoctorProfile';
export default function App() {
  const { atoken } = useContext(AdminContext)
  const { dToken } = useContext(DoctorContext)
  
  return atoken || dToken ? (
    <div>
      <ToastContainer />
      <Navbar />
      <div className='flex items-start  bg-gray-100'>
        <Sidebar />
        <Routes>
          <Route path="" element={<></>}></Route>
          <Route path="/admin-dashboard" element={<Dashboard />}></Route>
          <Route path="/all-appointments" element={<AllAppointments />}></Route>
          <Route path="/add-doctor" element={<AddDoctor />}></Route>
          <Route path="/doctor-list" element={<DoctorsList />}></Route>
          <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
          <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
          <Route path="/doctor-appointments" element={<DoctorAppointments />} />
          <Route path="/doctor-profile" element={<DoctorProfile />} />

        </Routes>
      </div>
    </div>
  ) : (
    <div>
      <Login />
      <ToastContainer />
    </div>

  )
}
