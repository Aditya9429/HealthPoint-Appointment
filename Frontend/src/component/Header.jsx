import React from 'react'
import { LuMoveRight } from "react-icons/lu";
import './Hero.css'
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate()
  return (
    <div className="px-6 md:px-12 lg:px-20 py-12 ">
      <div className="w-full flex flex-col lg:flex-row items-center justify-between  max-w-7xl mx-auto bg-[#5F6FFF] rounded p-8 lg:p-16 gap-10">
        
       
        <div className="flex flex-col gap-6 text-center lg:text-left">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-snug bg-linear-30 max-w-xl">
            Book Appointment with Trusted Doctors
          </h1>
          <p className="text-base sm:text-lg font-medium text-white max-w-md mx-auto lg:mx-0">
            Simply browse through our extensive list of trusted doctors and schedule your appointment hassle-free
          </p>
          <p className="flex items-center justify-center lg:justify-start gap-2 px-4 py-3 text-black text-sm sm:text-base text-center  bg-white rounded-full max-w-[220px] mx-auto lg:mx-0 cursor-pointer hover:bg-[#e2e2e2] transition" onClick={() => navigate('/doctor')}>
            Book Appointment <span><LuMoveRight /></span>
          </p>
        </div>

        
        <div className="flex justify-center lg:justify-end w-full lg:w-1/2">
          <img 
            src="/images/Header.png" 
            alt="Doctor Appointment"
            className="w-3/4 sm:w-2/3 lg:w-full max-w-md object-contain"
          />
        </div>

      </div>
    </div>
  )
}
