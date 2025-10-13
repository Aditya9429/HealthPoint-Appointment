import React, { useContext, useEffect, useState } from "react";
import { IoMenuOutline } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
import { NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/image/assets";
import { Context } from "../context/Context";


export default function Navbar() {
  const [sideBar, setSideBar] = useState(false);
  const { token, setToken, userData } = useContext(Context);
  const logOut = () => {
    setToken('');
    localStorage.removeItem('token')
  }

  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token])
  return (
    <nav className="relative w-full flex flex-col items-center bg-white z-99 mt-4">
      <div className="md:w-[80%] w-[92%] flex items-center justify-between my-4 ">
        <div>
          <h1 className="text-3xl font-bold text-[#000069]">HealthPoint</h1>
        </div>

        <div className=" md:block hidden">
          <ul className="w-full flex text-[17px] items-center justify-evenly gap-10 link-active font-medium">
            <NavLink to="/"
              className={({ isActive }) => `text-black  ${isActive ? "border-b-2" : ""}`}
            >
              Home
            </NavLink>
            <NavLink to="/doctor"
              className={({ isActive }) => `text-black ${isActive ? " border-b-2" : ""}`}
            >
              All Doctors
            </NavLink>
            <NavLink to="About"
              className={({ isActive }) => `text-black ${isActive ? " border-b-2" : ""}`}
            >
              About
            </NavLink>
            <NavLink to="Contact"
              className={({ isActive }) => `text-black ${isActive ? "border-b-2" : ""}`}
            >
              Contact
            </NavLink>
          </ul>
        </div>
        <button className=" hidden lg:block px-3 py-2 bg-blue-500 text-white text-sm font-medium rounded" onClick={() => window.open(" http://localhost:5174/", "_blank")} >Admin Panel</button>
         <div className="flex items-center gap-4">
        <div className="md:flex items-center justify-center">
          <div className="flex items-center gap-4">
            {token && userData ?
              <div className="flex items-center gap-2 cursor-pointer group relative">
                <img
                  className="w-8 h-8 object-cover rounded-full"
                  src={userData.image}
                  alt=""
                />
                <img className="w-2.5" src={assets.dropdown_icon} alt="" />
                <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
                  <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
                    <p onClick={() => navigate('/myprofile')}>My Profile</p>
                    <p onClick={() => navigate("/my-appointments")}>My Appointments</p>
                    <p onClick={logOut}>Logout</p>
                  </div>
                </div>
              </div>
              :
              <button
                onClick={() => navigate("/login")}
                className="bg-blue-400 text-white text-sm  px-3 lg:px-6 py-2  rounded-full"
              >
                Create account
              </button>
            }
          </div>
        </div>
        <div className="flex items-center justify-center md:hidden visible">
          {sideBar ? (
            <RxCross1 onClick={() => setSideBar(!sideBar)} size="30px" />
          ) : (
            <IoMenuOutline
              onClick={() => setSideBar(!sideBar)}
              size="30px"
            />
          )}
        </div>
        </div>

        <div
          className={`w-full h-[105vh] md:hidden fixed top-[-12%]  bottom-[15%] left-0 bg-white items-center justify-center transition-all duration-700 ease-in-out  pb-10 ${sideBar
              ? "flex opacity-100 translate-y-[80px] pointer-events-auto"
              : "flex opacity-0 -translate-y-10 pointer-events-none"
            }`}
        >
          <ul className="w-full h-[80%] flex flex-col items-center justify-between mobile-link text-2xl font-medium">
            <span className="ml-100"><RxCross1 onClick={() => setSideBar(!sideBar)} size="30px" className="flex  justify-end" /></span>
            <NavLink to="/"
              className={({ isActive }) => `text-black  ${isActive ? "border-b-2" : ""}`} onClick={() => setSideBar(!sideBar)}>Home</NavLink>
            <NavLink to="/doctor"
              className={({ isActive }) => `text-black ${isActive ? " border-b-2" : ""}`} onClick={() => setSideBar(!sideBar)}
            >All Doctors</NavLink>
            <NavLink to="About"
              className={({ isActive }) => `text-black ${isActive ? " border-b-2" : ""}`} onClick={() => setSideBar(!sideBar)}>About</NavLink>
            <NavLink to="Contact"
              className={({ isActive }) => `text-black ${isActive ? "border-b-2" : ""}`} onClick={() => setSideBar(!sideBar)}>Contact</NavLink>
            <button className=" px-3 py-2 bg-blue-500 text-white text-sm font-medium rounded" onClick={() => window.open("https://healthpoint-appointment-admin.onrender.com/", "_blank")} >Admin Panel</button>

          </ul>
        </div>
      </div>
      <hr className="md:w-[80%] w-[90%]" />
    </nav>
  );
}