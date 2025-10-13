import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Trusted() {
  const navigate = useNavigate();

  return (
    <div className="mt-10 py-10 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-10 bg-blue-400 rounded-2xl p-6 lg:p-10">
        <div className="flex-1 text-center lg:text-left">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 sm:mb-7 leading-snug">
            Book appointment with 100+ Trusted Doctors
          </h1>
          <button
            className="px-6 sm:px-7 py-2 sm:py-3 text-sm sm:text-base font-medium text-blue-700 bg-white rounded-full hover:bg-gray-100 transition"
            onClick={() => navigate("/login/")}
          >
            Create Account
          </button>
        </div>

        <div className="flex-1 relative w-full max-w-md lg:max-w-lg">
          <img
            src="/images/appoint.png"
            alt="Appointment"
            className="w-full h-90 object-contain"
          />
        </div>
      </div>
    </div>
  );
}
