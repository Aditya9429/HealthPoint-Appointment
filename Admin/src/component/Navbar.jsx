import React from 'react'
import logo from '../assets/admin_logo.svg'
import { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { DoctorContext } from '../context/DoctorContext';
import { useNavigate } from 'react-router-dom';
export default function Navbar() {
  const { atoken, setAToken } = useContext(AdminContext);
  const { dToken, setDToken } = useContext(DoctorContext)
  const navigate = useNavigate()
  function logOut() {
    navigate('/')
    atoken && setAToken('')
    atoken && localStorage.removeItem('aToken');
    dToken && setDToken('');
    dToken && localStorage.removeItem('dToken');
    console.log("Hello")
  }
  return (
    <div className='flex items-center justify-between p-5'>
      <div className='flex items-center gap-5'>
        <img src={logo} />
        <p>{atoken ? "Admin" : "Doctor"}</p>
      </div>
      <button onClick={logOut} className='bg-blue-400 text-white px-6 py-2 rounded-full'>LogOut</button>
    </div>
  )
}
