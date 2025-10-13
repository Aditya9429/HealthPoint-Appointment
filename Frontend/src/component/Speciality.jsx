import React from 'react';
import { specialityData } from '../assets/image/assets';
import { useNavigate } from 'react-router-dom';

export default function Speciality() {
    const navigate = useNavigate();
  return (
    <div className="w-full">
      <div className="flex flex-col items-center justify-center gap-7 max-w-7xl mx-auto px-8 py-10">
        <h1 className="text-3xl font-semibold text-center">Find By Speciality</h1>
        <p className="text-center text-sm font-medium text-gray-700 max-w-md">
          Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.
        </p>


        <div className="flex items-center lg:justify-center gap-4 w-full overflow-scroll  pt-5 px-2">
          {specialityData.map((item) => (
            <div
              key={item.id}
              className=" flex flex-col items-center gap-2 transition-transform duration-300 hover:-translate-y-2"
             
            >
              <img src={item.image} alt={item.speciality} className="w-15 h-20 object-contain" />
              <p className="whitespace-nowrap text-xs text-center">{item.speciality}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}