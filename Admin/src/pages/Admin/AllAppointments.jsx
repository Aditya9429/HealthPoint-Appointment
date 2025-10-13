import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { ApiContext } from "../../context/ApiContext";

export default function AllAppointments() {
  const { atoken, appointments, getAllAppointments, cancelAppointment } = useContext(AdminContext);
  const { slotDateFormate, currency ,calculateAge} = useContext(ApiContext);
   console.log("Appointments" ,appointments)
  useEffect(() => {
    if (atoken) {
      getAllAppointments();
    }
  }, [atoken]);

  console.log(appointments, "All Appointments Data");

  return (
    <div className="w-full max-w-6xl mx-auto mt-6 px-4">
      <p className="mb-4 text-xl font-semibold text-gray-800">All Appointments</p>

      <div className="bg-white border rounded-lg shadow-sm text-sm max-h-[80vh] min-h-[60vh] overflow-y-auto">
        <div className="hidden sm:grid grid-cols-[0.5fr_2fr_1fr_2fr_2fr_1fr_1fr] py-3 px-6 border-b font-semibold bg-gray-100 text-gray-700">
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Action</p>
        </div>

        {appointments && appointments.length > 0 ? (
          appointments.map((item, index) => (
            <div
              key={index}
              className="flex flex-col sm:grid sm:grid-cols-[0.5fr_2fr_1fr_2fr_2fr_1fr_1fr] items-center gap-3 sm:gap-0 py-3 px-6 border-b hover:bg-gray-50 transition-colors duration-200"
            >
              <p className="font-medium text-gray-600">{index + 1}</p>

              <div className="flex items-center gap-2">
                <img
                  src={item.userData
                    ?.image || "/default-user.png"}
                  alt="user"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <p className="font-medium text-gray-800">{item.userId?.name || "Unknown"}</p>
              </div>

              <p className="text-gray-600">{ calculateAge (item.userData?.dob || "—" )}</p>

              <p className="text-gray-600">
                {slotDateFormate(item.slotDate)} {item.slotTime}
              </p>

              <div className="flex items-center gap-2">
                <img
                  src={item.docData?.image || "/default-doctor.png"}
                  alt="doctor"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <p className="font-medium text-gray-800">{item.docData?.name || "Unknown"}</p>
              </div>

              <p className="font-semibold text-gray-700">
                {currency}
                {item.amount}
              </p>

              {item.cancelled ? (
                <p className="text-red-500 text-xs font-semibold">Cancelled</p>
              ) : item.isCompleted ? (
                <p className="text-green-500 text-xs font-semibold">Completed</p>
              ) : (
                <button
                  onClick={() => cancelAppointment(item._id)}
                  className="text-red-600 hover:text-red-700 hover:underline text-xs font-medium"
                >
                  Cancel
                </button>
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 py-10">No Appointments Found</p>
        )}
      </div>
    </div>
  );
}
  