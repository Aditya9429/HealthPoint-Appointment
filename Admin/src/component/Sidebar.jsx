import React from 'react'
import { useContext } from 'react';
import { NavLink } from 'react-router-dom'
import home from '../assets/home_icon.svg'
import appoint from '../assets/appointment_icon.svg'
import add from '../assets/add_icon.svg'
import people from '../assets/people_icon.svg'
import { AdminContext } from '../context/AdminContext';
import { DoctorContext } from '../context/DoctorContext';

export default function Sidebar() {
    const { atoken, setAToken } = useContext(AdminContext);
    const {dToken} = useContext(DoctorContext)
    return (
        <div className='min-h-screen min-w-[20%] border-r border-white  bg-white '>
            {
                atoken && <ul className='flex flex-col  gap-5  ml-7'>
                    <NavLink to={"/admin-dashboard"}  className={({isActive}) => `flex items-center gap-3  px-1 py-2 cursor-pointer ${isActive ? " bg-[#bbbcbb]  border-r-4 border-blue-500 " : ""}`}>
                        <img src={home} />
                        <p className='hidden md:block'>DashBoard</p>
                    </NavLink>
                    <NavLink to={"/all-appointments"} className={({isActive}) => `flex items-center gap-3   px-1 py-2 cursor-pointer  ${isActive ? "   bg-[#bbbcbb] border-r-4 border-blue-500" : ""} `}>
                        <img src={appoint} />
                        <p className='hidden md:block'>Appointments</p>              
                    </NavLink>
                    <NavLink to={"/add-doctor"}  className={({isActive}) => `flex items-center gap-3   px-1 py-2 cursor-pointer ${isActive ? " bg-[#bbbcbb] border-r-4 border-blue-500" : ""}`}>
                        <img src={add} />
                        <p className='hidden md:block'>Add Doctor</p>
                    </NavLink>
                    <NavLink to={"/doctor-list" } className={({isActive}) => `flex items-center gap-3  px-1 py-2 cursor-pointer ${isActive ? " bg-[#bbbcbb] border-r-4 border-blue-500" : ""}`} >
                        <img src={people} />
                        <p className='hidden md:block'>Doctors List</p>
                    </NavLink>
                </ul>
            }
            {
                dToken && <ul className='flex flex-col gap-5 ml-7'>
                    <NavLink to={"/doctor-dashboard"}  className={({isActive}) => `flex items-center gap-3  px-1 py-2 cursor-pointer ${isActive ? " bg-[#bbbcbb]  border-r-4 border-blue-500 " : ""}`}>
                        <img src={home} /> 
                        <p className='hidden md:block'>DashBoard</p>
                    </NavLink>
                    <NavLink to={"/doctor-appointments"} className={({isActive}) => `flex items-center gap-3   px-1 py-2 cursor-pointer  ${isActive ? "   bg-[#bbbcbb] border-r-4 border-blue-500" : ""} `}>
                        <img src={appoint} />
                        <p className='hidden md:block'>Appointments</p>              
                    </NavLink>
                   <NavLink to={"/doctor-profile" } className={({isActive}) => `flex items-center gap-3  px-1 py-2 cursor-pointer ${isActive ? " bg-[#bbbcbb] border-r-4 border-blue-500" : ""}`} >
                        <img src={people} />
                        <p className='hidden md:block'>Profile</p>
                    </NavLink>
                </ul>
            }

        </div>
    )
}
