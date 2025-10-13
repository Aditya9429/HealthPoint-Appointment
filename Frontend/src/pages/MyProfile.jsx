import React, { useContext, useState } from "react";
import { assets } from "../assets/image/assets";
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../context/Context";

export default function MyProfile() {
  const { userData, setUserData, token, backendUrl, fetchUserProfile } = useContext(Context);
  const [image, setImage] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  const updateUserProfile = async () => {
    try {
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("address", JSON.stringify(userData.address));
      formData.append("dob", userData.dob);
      formData.append("gender", userData.gender);

      if (image) formData.append("image", image);

      const response = await axios.post(
        `${backendUrl}/api/user/update-profile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200 && response.data.success) {
        toast.success(response.data.message);
        await fetchUserProfile();
        setIsEdit(false);
        setImage(null);
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error(err.response?.data.message || "Something went wrong, try again");
    }
  };

  return (
    userData && (
      <div className="w-full flex items-center justify-center text-gray-800">
        <div className="md:w-[80%] w-[90%] flex my-10">
          <div className="lg:w-[50%] md:[55%] sm:[65%] w-[95%] flex flex-col space-y-3 input-outline">
            {/* Profile Image */}
            <label htmlFor="image">
              <div className="inline-block relative cursor-pointer">
                <img
                  src={image ? URL.createObjectURL(image) : userData.image + "?t=" + new Date().getTime()}
                  alt="profile"
                  className="max-w-36 rounded opacity-75"
                />
                {isEdit && (
                  <img
                    src={assets.upload_icon}
                    alt="upload"
                    className="w-10 absolute top-16 left-13 bg-gray-300"
                  />
                )}
                {isEdit && (
                  <input
                    type="file"
                    id="image"
                    hidden
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                )}
              </div>
            </label>

            {/* Name */}
            {isEdit ? (
              <input
                type="text"
                value={userData.name}
                onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))}
                className="text-lg font-semibold bg-[#ffffdb] rounded py-1.5 pl-3 w-fit border border-[#ccc] leading-none"
              />
            ) : (
              <p className="text-3xl font-semibold my-2">{userData.name}</p>
            )}

            <hr className="text-[#bbb]" />

            {/* Contact Info */}
            <div>
              <p className="text-sm underline font-medium mt-2">CONTACT INFORMATION</p>
              <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3">
                <p className="font-medium text-sm">Email id:</p>
                <p className="text-sm text-blue-500">{userData.email}</p>

                <p className="font-medium text-sm">Phone:</p>
                {isEdit ? (
                  <input
                    type="text"
                    value={userData.phone}
                    onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))}
                    className="bg-[#ffffdb] rounded py-1 pl-4 w-fit border border-[#ccc]"
                  />
                ) : (
                  <p className="text-sm text-blue-500">{userData.phone}</p>
                )}

                <p className="font-medium text-sm">Address:</p>
                {isEdit ? (
                  <div>
                    <input
                      type="text"
                      value={userData.address.line1}
                      onChange={(e) => setUserData(prev => ({
                        ...prev,
                        address: { ...prev.address, line1: e.target.value }
                      }))}
                      className="bg-[#ffffdb] rounded py-1 pl-4 w-fit border border-[#ccc]"
                    />
                    <br />
                    <input
                      type="text"
                      value={userData.address.line2}
                      onChange={(e) => setUserData(prev => ({
                        ...prev,
                        address: { ...prev.address, line2: e.target.value }
                      }))}
                      className="bg-[#ffffdb] rounded py-1 pl-4 w-fit border border-[#ccc]"
                    />
                  </div>
                ) : (
                  <p className="text-sm text-[#555]">{userData.address.line1}<br />{userData.address.line2}</p>
                )}
              </div>
            </div>

            {/* Basic Info */}
            <div>
              <p className="text-sm underline font-medium mt-2">BASIC INFORMATION</p>
              <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3">
                <p className="font-medium text-sm">Gender:</p>
                {isEdit ? (
                  <select
                    value={userData.gender}
                    onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))}
                    className="bg-[#ffffdb] rounded py-1 pl-4 w-fit border border-[#ccc]"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                ) : (
                  <p className="text-sm text-[#555]">{userData.gender}</p>
                )}

                <p className="font-medium text-sm">Birthday:</p>
                {isEdit ? (
                  <input
                    type="date"
                    value={userData.dob}
                    onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))}
                    className="bg-[#ffffdb] rounded py-1 pl-4 w-fit border border-[#ccc]"
                  />
                ) : (
                  <p className="text-sm text-[#555]">{userData.dob}</p>
                )}
              </div>
            </div>

            <div>
              {isEdit ? (
                <div className="flex md:flex-row flex-col gap-3">
                  <button
                    onClick={updateUserProfile}
                    className="text-sm py-2 px-10 border border-[#9797ff] rounded-full mt-4 active:scale-0.95"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => { setIsEdit(false); setImage(null); }}
                    className="text-sm py-2 px-10 border border-[#ff5454] rounded-full mt-4"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsEdit(true)}
                  className="text-sm py-2 px-10 border border-[#9797ff] rounded-full mt-4"
                >
                  Edit
                </button>
              )}
            </div>

          </div>
        </div>
      </div>
    )
  );
}
