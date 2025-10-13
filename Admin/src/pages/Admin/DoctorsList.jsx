import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { useEffect } from 'react';

export default function DoctorsList() {
  const { doctors, getAllDoctors, atoken, changeAvailablity } = useContext(AdminContext);

  useEffect(() => {
    if (atoken) {
      getAllDoctors();
    }
  }, [atoken])
  return (
    <div className='p-5'>
      <p className='text-xl font-medium mb-4'>DoctorList</p>
      <div className='lg:w-[95%]  grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {
          doctors.map((item) => (
            <div key={item._id} className=' flex flex-col items-start border border-gray-300 rounded-2xl transition-transform duration-300 hover:-translate-y-2' >
              <img src={item.image} className='w-60 h-50 bg-[#EAEFFF] object-cover rounded-t-2xl' />
              <div className='px-5 py-5'>

                <p className='text-[17px] font-medium text-[#262626]'>{item.name}</p>
                <p className='text-[15px] text-gray-400 font-medium'>{item.speciality}</p>
                <div className='flex items-center gap-1'>
                  <input onChange={() => changeAvailablity(item._id)} type="checkbox" checked={item.available} />
                  <p className='flex items-center gap-1 text-blue-700 text-sm font-medium' ><span className=''>  </span>Available</p>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}
