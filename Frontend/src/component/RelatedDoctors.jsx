import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../context/Context'
import { useNavigate } from 'react-router-dom';

export default function RelatedDoctors({ doc_id, speciality }) {
  const { doctors } = useContext(Context)
  const [relatedDoctor, setRelatedDoctors] = useState([]);
  const navigate = useNavigate();

  function relatedFunction() {

    let realted = doctors.filter((item) => item.speciality == speciality)
    setRelatedDoctors(realted)
  }
  useEffect(() => {
    relatedFunction()
  }, [])

  return (
    <div>
      <div className='w-full flex flex-col items-center justify-center mx-auto p-10'>
        <h1 className='text-2xl font-medium text-center'>Related Doctors</h1>
        <p className='mt-4 text-sm text-center'>Simply browse through our extensive list of trusted doctors.</p>
        <div className='  grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10  mt-10'>
          {
            relatedDoctor.map((item, index) => (
              <div onClick={() => navigate(`/appointment/${item._id}`)} key={item.id} className=' flex flex-col items-start border border-gray-300 rounded-2xl transition-transform duration-300 hover:-translate-y-2'>
                <img src={item.image} className='w-60 h-50 bg-[#EAEFFF] object-cover rounded-t-2xl' />
                <div className="px-5 py-5">
                  <span
                    className={`inline-block w-2 h-2 rounded-full ${item.available ? "bg-green-500" : "bg-gray-500"
                      }`}
                  ></span>
                  <span className="ml-2 text-sm font-medium text-gray-600">
                    {item.available ? "Available" : "Not Available"}
                  </span>

                  <p className="text-[17px] font-medium text-[#262626] mt-2">{item.name}</p>

                  <p className="text-[15px] text-gray-400 font-medium">{item.speciality}</p>
                </div>
              </div>
            ))
          }</div>
      </div>
    </div>
  )
}
