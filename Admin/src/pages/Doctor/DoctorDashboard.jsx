import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { ApiContext } from "../../context/ApiContext";
import { assets } from "../../assets/assets";

export default function DoctorDashboard() {
  const { dToken, dashData, getDashData, cancelAppointment, completeAppointment } =
    useContext(DoctorContext);
  const { currency } = useContext(ApiContext);

  useEffect(() => {
    if (dToken) {
      getDashData();
    }
  }, [dToken]);

  return (
    dashData && (
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="  grid  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          <div
            className=" w-80
              flex items-center gap-3 bg-white 
              p-4 rounded-lg border border-gray-200 
              shadow-sm hover:shadow-md hover:scale-[1.02] 
              transition-all duration-300
            "
          >
            <img src={assets.earning_icon} alt="earnings" className="w-14 h-14" />
            <div>
              <p className="text-xl font-semibold text-gray-700">
                {currency}
                {dashData.earnings || 0}
              </p>
              <p className="text-gray-500">Earnings</p>
            </div>
          </div>

          <div
            className="
              flex items-center gap-3 bg-white 
              p-4 rounded-lg border border-gray-200 
              shadow-sm hover:shadow-md hover:scale-[1.02] 
              transition-all duration-300
            "
          >
            <img src={assets.appointments_icon} alt="appointments" className="w-14 h-14" />
            <div>
              <p className="text-xl font-semibold text-gray-700">
                {dashData.appointments || 0}
              </p>
              <p className="text-gray-500">Appointments</p>
            </div>
          </div>

         <div
            className="
              flex items-center gap-3 bg-white 
              p-4 rounded-lg border border-gray-200 
              shadow-sm hover:shadow-md hover:scale-[1.02] 
              transition-all duration-300
            "
          >
            <img src={assets.patients_icon} alt="patients" className="w-14 h-14" />
            <div>
              <p className="text-xl font-semibold text-gray-700">
                {dashData.patients || 0}
              </p>
              <p className="text-gray-500">Patients</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm mt-10 overflow-hidden">
          <div className="flex items-center gap-2.5 px-5 py-4 border-b border-gray-200 bg-gray-50">
            <img src={assets.list_icon} alt="list icon" className="w-5 h-5" />
            <p className="font-semibold text-gray-800 text-[17px]">Latest Bookings</p>
          </div>

          <div className="divide-y divide-gray-100">
            {dashData.latestAppointments && dashData.latestAppointments.length > 0 ? (
              dashData.latestAppointments.map((item, index) => (
                <div
                  key={index}
                  className="
                    flex  sm:flex-row sm:items-center 
                    justify-between px-5 py-3 
                    hover:bg-gray-50 transition-colors duration-200
                  "
                >
                  <div className="flex items-center gap-3 mb-2 sm:mb-0">
                    <img
                      className="w-10 h-10 rounded-full object-cover border border-gray-200"
                      src={item.userData?.image || "/default-user.png"}
                      alt={item.userData?.name || "User"}
                    />
                    <div>
                      <p className="font-medium text-gray-800 text-sm sm:text-base">
                        {item.userData?.name || "Unknown"}
                      </p>
                      {/* <p className="text-xs text-gray-500">{slotDateFormate(item.slotDate)}</p> */}
                    </div>
                  </div>
                  <div>
                  {item.cancelled ? (
                    <p className="text-red-500 text-xs sm:text-sm font-semibold">
                      Cancelled
                    </p>
                  ) : item.isCompleted ? (
                    <p className="text-green-500 text-xs sm:text-sm font-semibold">
                      Completed
                    </p>
                  ) : (
                    <div className="flex items-center gap-3">
                      <img
                        onClick={() => cancelAppointment(item._id)}
                        src={assets.cancel_icon}
                        alt="cancel"
                        className="w-5 h-5 cursor-pointer hover:scale-110 transition-transform duration-200"
                      />
                      <img
                        onClick={() => completeAppointment(item._id)}
                        src={assets.tick_icon}
                        alt="complete"
                        className="w-5 h-5 cursor-pointer hover:scale-110 transition-transform duration-200"
                      />
                    </div>
                  )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 py-6 text-sm">
                No recent bookings found
              </p>
            )}
          </div>
        </div>
      </div>
    )
  );
}
