import React, { useContext } from 'react'
import { doctors } from '../assets/image/assets'
import { useNavigate } from 'react-router-dom'
import { Context } from '../context/Context'

export default function Doctors() {
  const { doctors } = useContext(Context)
  const navigate = useNavigate()
  return (
    <div className="w-full">
      <div className="flex flex-col items-center justify-center gap-7 max-w-7xl mx-auto px-8 py-10">
        <h1 className="text-3xl font-semibold text-center">Top Doctors to Book</h1>
        <p className="text-center text-sm font-medium text-gray-700 max-w-md">
          Simply browse through our extensive list of trusted doctors.
        </p>

        <div className="lg:w-[95%] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {doctors.slice(0, 10).map((item) => (
            <div
              key={item._id}
              className="flex flex-col items-start border border-gray-300 rounded transition-transform duration-300 hover:-translate-y-2"
              onClick={() => navigate(`/appointment/${item._id}`)}
            >
              <img
                src={item.image}
                className="w-60 h-50 bg-[#EAEFFF] object-cover "
                alt={item.name}
              />
              <div className="px-5 py-5">
               <span
                  className={`inline-block w-2 h-2 rounded-full ${item.available ? "bg-green-500" : "bg-gray-500"
                    }`}
                ></span>
                <span className="ml-2 text-sm font-medium text-green-600">
                  {item.available ? "Available" : "Not Available"}
                </span>

              <p className="text-[17px] font-medium text-[#262626] mt-2">{item.name}</p>

                <p className="text-[15px] text-gray-400 font-medium">{item.speciality}</p>
              </div>
            </div>
          ))}
        </div>

        <button
          className="px-10 py-2 text-blue-500 bg-[#EAEFFF] rounded-3xl mt-5 hover:bg-[#dfe5fb]"
          onClick={() => navigate('/doctor')}
        >
          More
        </button>
      </div>
    </div>
  )
}
