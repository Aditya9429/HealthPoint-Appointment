import React, { useContext, useEffect } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { ApiContext } from '../../context/ApiContext';
import { AdminContext } from '../../context/AdminContext';
import { assets } from '../../assets/assets';

export default function DoctorAppointments() {
  const { dToken, appointments, getAppointments, cancelAppointment, completeAppointment } = useContext(DoctorContext);
  const { calculateAge, slotDateFormate } = useContext(ApiContext);
  useEffect(() => {
    if (dToken) {
      getAppointments();
    }
  }, [dToken]);



  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium">All Appointments</p>

      <div className="bg-white border rounded text-sm max-h-[80vh] min-h-[50vh] overflow-y-scroll">
        <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_2fr_2fr_1fr_1fr] py-3 px-6 border-b font-semibold bg-gray-50">
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>

        {
          appointments.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-[0.5fr_3fr_1fr_2fr_2fr_1fr_1fr] items-center py-3 px-6 border-b hover:bg-gray-50"
            >
              <p>{index + 1}</p>

              <div className="flex items-center gap-2">
                <img
                  src={item.userData.image }
                  alt="patient"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <p>{item.userData?.name || "Unknown"}</p>
              </div>

              <p>{item.payment ? 'Online' : 'Cash'}</p>

              <p>{calculateAge(item.userData.dob)}</p>

              <p>
                {slotDateFormate(item.slotDate)} {item.slotTime}
              </p>

              <p>₹{item.amount || 0}</p>

              {/* Actions */}
              <div className=''>
                {
                  item.cancelled ? <p className='text-red-400 text-xs font-medium'> Cancelled</ p> : item.isCompleted ? <p className='text-green-500 text-xs font-medium'>Completed</p> : <div className='flex'>

                    <img onClick={() => cancelAppointment(item._id)} src={assets.cancel_icon} alt="" />
                    <img onClick={() => completeAppointment(item._id)} src={assets.tick_icon} alt="" />
                  </div>
                }

              </div>

            </div>
          ))

        }
      </div>
    </div>

  );
}
