import React, { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { ApiContext } from "../../context/ApiContext";
import axios from "axios";
import { toast } from "react-toastify";

export default function DoctorProfile() {
  const { dToken, profileData, getProfileData, setProfileData, backendUrl } =  useContext(DoctorContext);
  const { currency } = useContext(ApiContext);

  const [isEdit, setIsEdit] = useState(false);

  const updateProfile = async () => {
    try {
      const updateData = {
        address: profileData.address,
        fees: profileData.fees,
        available: profileData.available
      }

      const { data } = await axios.post(backendUrl + '/api/doctor/update-profile', updateData, {
        headers: {
          Authorization: `Bearer ${dToken}`,
        },
      })
      if(data.success){
        toast.success(data.message);
        setIsEdit(false);
        getProfileData()
      }
      else{
        toast.error(data.message)
      }
    }
    catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (dToken) {
      getProfileData();
    }
  }, [dToken]);

  if (!profileData) {
    return (
      <div className="flex justify-center items-center h-[80vh] text-gray-500 text-lg">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="max-w-5xl p-6 bg-white shadow-md rounded-2xl mt-10 ml-10">
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="flex justify-center md:justify-start w-full md:w-1/3">
          <img
            src={profileData.image || "/default-doctor.png"}
            alt={profileData.name}
            className="w-40 h-40 object-cover  border-4  shadow-md"
          />
        </div>

        <div className="w-full md:w-2/3 text-center md:text-left">
          <h2 className="text-2xl font-bold text-gray-800">
            {profileData.name}
          </h2>
          <p className="text-blue-600 font-medium mt-1">
            {profileData.degree} • {profileData.special}
          </p>
          <p className="text-gray-600 mt-2">
            Experience:{" "}
            <span className="font-semibold">
              {profileData.experience} years
            </span>
          </p>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-700">
            <p>
              <span className="font-semibold">Email:</span>{" "}
              {profileData.email || "N/A"}
            </p>
            <p>
              <span className="font-semibold">Phone:</span>{" "}
              {profileData.phone || "N/A"}
            </p>

            <p>
              <span className="font-semibold">Fees:</span> {currency}{" "}
              {isEdit ? (
                <input
                  type="number"
                  className="border border-gray-300 rounded-md px-2 py-1 ml-1 w-24"
                  value={profileData.fees || 0}
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      fees: e.target.value,
                    }))
                  }
                />
              ) : (
                profileData.fees || 0
              )}
            </p>

            <p>
              {isEdit ? (
                <input
                  type="text"
                  className="border border-gray-300 rounded-md px-2 py-1 w-full mb-1"
                  value={profileData.address?.line1 || ""}
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      address: {
                        ...prev.address,
                        line1: e.target.value,
                      },
                    }))
                  }
                />
              ) : (
                profileData.address?.line1 || "N/A"
              )}
              <br />
              {isEdit ? (
                <input
                  type="text"
                  className="border border-gray-300 rounded-md px-2 py-1 w-full mt-1"
                  value={profileData.address?.line2 || ""}
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      address: {
                        ...prev.address,
                        line2: e.target.value,
                      },
                    }))
                  }
                />
              ) : (
                profileData.address?.line2 || ""
              )}
            </p>
          </div>

          <div className="mt-5 flex items-center gap-2">
            <input
              type="checkbox"
              checked={profileData.available}
              onChange={() =>
                isEdit &&
                setProfileData((prev) => ({
                  ...prev,
                  available: !prev.available,
                }))
              }
            />
            <label className="text-gray-700">Available</label>
          </div>
        </div>
      </div>

      <div className="mt-10 border-t pt-5 text-center md:text-left">
        <h3 className="text-lg font-semibold text-gray-800">About Doctor</h3>
        {isEdit ? (
          <textarea
            className="border border-gray-300 rounded-md w-full mt-2 p-2 text-gray-700"
            rows="4"
            value={profileData.about || ""}
            onChange={(e) =>
              setProfileData((prev) => ({
                ...prev,
                about: e.target.value,
              }))
            }
          />
        ) : (
          <p className="text-gray-600 mt-2 leading-relaxed">
            {profileData.about ||
              "No description available. Update your profile to add a short introduction about your specialization, experience, and background."}
          </p>
        )}
      </div>

      <div className="mt-6 text-center md:text-left">
        {isEdit ? (
          <button
            onClick={updateProfile}
            className="px-5 py-2 border border-blue-500 text-blue-600 rounded-full hover:bg-blue-500 hover:text-white transition-all"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => setIsEdit(true)}
            className="px-5 py-2 border border-blue-500 text-blue-600 rounded-full hover:bg-blue-500 hover:text-white transition-all"
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
}
