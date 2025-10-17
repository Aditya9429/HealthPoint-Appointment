import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { ApiContext } from "../../context/ApiContext";
import { assets } from "../../assets/assets";

export default function Dashboard() {
  const { atoken, getDashData, cancelAppointment, dashData } = useContext(AdminContext);
  const { slotDateFormate } = useContext(ApiContext);

  useEffect(() => {
    if (atoken) {
      getDashData();
    }
  }, [atoken]);

  return (
    <div className=" w-[70%] m-4 md:m-6 lg:m-8">
      <div
        className="
          grid 
          grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 
          gap-4 sm:gap-6 lg:gap-8
        "
      >
        <div
          className="
            flex items-center gap-3 bg-white 
            p-4 rounded-lg border border-gray-200 
            shadow-sm hover:shadow-md hover:scale-[1.02] 
            transition-all duration-300
          "
        >
          <img src={assets.doctor_icon} alt="doctor icon" className="w-14 h-14" />
          <div>
            <p className="text-xl font-semibold text-gray-700">
              {dashData?.doctors || 0}
            </p>
            <p className="text-gray-500">Doctors</p>
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
          <img src={assets.appointments_icoan} alt="appointment icon" className="w-14 h-14" />
          <div>
            <p className="text-xl font-semibold text-gray-700">
              {dashData?.appointments || 0}
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
          <img src={assets.patients_icon} alt="patients icon" className="w-14 h-14" />
          <div>
            <p className="text-xl font-semibold text-gray-700">
              {dashData?.patient || 0}
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

        <div className="divide-y divide-gray-100 w-90">
          {dashData && dashData.latestAppointments?.length > 0 ? (
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
                    src={item.userData?.image || "/default-user.png"}
                    alt="user"
                    className="w-10 h-10 rounded-full object-cover border border-gray-200"
                  />
                  <div>
                    <p className="font-medium text-gray-800 text-sm sm:text-base">
                      {item.userData?.name || "Unknown"}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500">
                      {slotDateFormate(item.slotDate)}
                    </p>
                  </div>
                </div>

                {item.cancelled ? (
                  <p className="text-red-500 text-xs font-semibold">Cancelled</p>
                ) : (
                  <button
                    onClick={() => cancelAppointment(item._id)}
                    className="
                      text-red-600 hover:text-red-700 
                      text-xs sm:text-sm font-medium 
                      transition
                    "
                  >
                    Cancel
                  </button>
                )}
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
  );
}
