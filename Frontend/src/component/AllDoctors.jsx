import React, { useContext, useEffect, useState } from "react";
import { Context } from "../context/Context";
import { useNavigate } from "react-router-dom";
import { specialityData } from "../assets/image/assets";

export default function AllDoctors() {
  const { doctors } = useContext(Context);

  const [currentSpeciality, setCurrentSpeciality] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState(doctors);
  const navigate = useNavigate();

  function fetchDoctorBySpeciality() {
    setSelectedDoctor(
      currentSpeciality !== ""
        ? doctors.filter((item) => item.speciality === currentSpeciality)
        : doctors
    );
  }

  useEffect(() => {
    fetchDoctorBySpeciality();
  }, [currentSpeciality, doctors]);

  return (
    <div className="w-full">
      <div className="flex flex-col items-start justify-center gap-7 max-w-7xl mx-auto px-8 py-10">
        <h1 className="text-xl font-semibold">
          Browse through the doctors by speciality
        </h1>

        <div className="flex flex-col lg:flex-row md:flex-row sm:flex-row gap-5">
          <div className="flex flex-col gap-3">
            {specialityData.map((item) => (
              <div
                key={item.speciality}
                onClick={() =>
                  setCurrentSpeciality(
                    currentSpeciality !== item.speciality ? item.speciality : ""
                  )
                }
              >
                <p
                  className={`lg:w-[13vw] border border-gray-300 px-4 py-2 text-sm text-gray-900 font-semibold rounded cursor-pointer ${
                    currentSpeciality === item.speciality ? "bg-gray-300" : ""
                  }`}
                >
                  {item.speciality}
                </p>
              </div>
            ))}
          </div>

          <div className="lg:w-[95%] grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {selectedDoctor.length > 0 ? (
              selectedDoctor.map((item) => (
                <div
                  key={item._id}
                  className="flex flex-col items-start border border-gray-300 rounded-2xl transition-transform duration-300 hover:-translate-y-2 cursor-pointer"
                  onClick={() => navigate(`/appointment/${item._id}`)}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-60 h-50 bg-[#EAEFFF] object-cover rounded-t-2xl"
                  />
                  <div className="px-5 py-5">
                      <span
                  className={`inline-block w-2 h-2 rounded-full ${item.available ? "bg-green-500" : "bg-gray-500"
                    }`}
                ></span>
                <span className="ml-2 text-sm font-medium text-green-600">
                  {item.available ? "Available" : "Not Available"}
                </span>
                    <p className="text-[17px] font-bold text-[#262626]">
                      {item.name}
                    </p>
                    <p className="text-[15px] text-gray-500 font-medium">
                      {item.speciality}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <h1 className="flex  flex-col  items-start  mt-10   lg:ml-0 text-gray-600">
                No Doctor Available
              </h1>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
