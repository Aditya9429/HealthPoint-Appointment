import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";

export default function DoctorsList() {
  const { doctors, getAllDoctors, atoken, changeAvailablity } =
    useContext(AdminContext);

  useEffect(() => {
    if (atoken) {
      getAllDoctors();
    }
  }, [atoken]);

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
      <p className="text-xl sm:text-2xl font-semibold mb-6 text-gray-800">
        Doctors List
      </p>

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {doctors.map((item) => (
          <div
            key={item._id}
            className="border border-gray-200 rounded-2xl bg-white shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            {/* Doctor Image */}
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-48 sm:h-52 md:h-56 object-cover rounded-t-2xl bg-[#EAEFFF]"
            />

            {/* Doctor Info */}
            <div className="px-4 py-4 flex flex-col gap-2">
              <p className="text-[16px] sm:text-[17px] font-semibold text-gray-800">
                {item.name}
              </p>
              <p className="text-[14px] text-gray-500 font-medium">
                {item.speciality}
              </p>

              {/* Availability Toggle */}
              <div className="flex items-center gap-2 mt-2">
                <input
                  onChange={() => changeAvailablity(item._id)}
                  type="checkbox"
                  checked={item.available}
                  className="w-4 h-4 accent-blue-600 cursor-pointer"
                />
                <p
                  className={`text-sm font-medium ${
                    item.available ? "text-green-600" : "text-gray-400"
                  }`}
                >
                  {item.available ? "Available" : "Unavailable"}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {doctors.length === 0 && (
        <p className="text-center text-gray-500 mt-10 text-sm sm:text-base">
          No doctors found.
        </p>
      )}
    </div>
  );
}
