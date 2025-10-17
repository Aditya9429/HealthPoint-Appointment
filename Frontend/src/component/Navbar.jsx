import React, { useContext, useEffect, useState } from "react";
import { IoMenuOutline } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
import { NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/image/assets";
import { Context } from "../context/Context";

export default function Navbar() {
  const [sideBar, setSideBar] = useState(false);
  const { token, setToken, userData } = useContext(Context);
  const navigate = useNavigate();

  const logOut = () => {
    setToken("");
    localStorage.removeItem("token");
  };

  useEffect(() => {
    if (token) navigate("/");
  }, [token, navigate]);

  return (
    <nav className=" w-full bg-white z-50 py-3 ">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8 py-3 border-b-1">
        {/* Logo */}
        <h1
          className="text-2xl md:text-3xl font-bold text-[#000069] cursor-pointer"
          onClick={() => navigate("/")}
        >
          PulsePoint
        </h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8 font-medium">
          <NavLink
            to="/"
            className={({ isActive }) =>
              ` transition-all duration-200 ${isActive ? " bg-blue-600 text-white font-medium px-4 py-2 rounded " : ""
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/doctor"
            className={({ isActive }) =>
              `  transition-all duration-200 ${isActive ? " bg-blue-600 text-white font-medium px-4 py-2 rounded " : ""
              }`
            }
          >
            All Doctors
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              ` transition-all duration-200 ${isActive ? " bg-blue-600 text-white font-medium px-4 py-2 rounded " : ""
              }`
            }
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `   ${isActive ? " bg-blue-600 text-white font-medium px-4 py-2 rounded " : ""
              }`
            }
          >
            Contact
          </NavLink>
        </ul>

        {/* Right Section (User / Admin Button / Menu Icon) */}
        <div className="flex items-center gap-4">
          {/* Admin Panel */}
          <button
            onClick={() =>
              window.open(
                "https://healthpoint-appointment-admin.onrender.com",
                "_blank"
              )
            }
            className="hidden lg:block bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 rounded-md"
          >
            Admin Panel
          </button>

          {/* User Avatar or Login */}
          {token && userData ? (
            <div className="relative group">
              <div className="flex items-center gap-2 cursor-pointer">
                <img
                  src={userData.image}
                  alt="user"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <img src={assets.dropdown_icon} alt="" className="w-3" />
              </div>
              <div className="absolute right-0 top-10 hidden group-hover:block bg-gray-100 rounded-lg shadow-md p-3 text-sm font-medium text-gray-700">
                <p
                  onClick={() => navigate("/myprofile")}
                  className="hover:text-blue-600 cursor-pointer"
                >
                  My Profile
                </p>
                <p
                  onClick={() => navigate("/my-appointments")}
                  className="hover:text-blue-600 cursor-pointer"
                >
                  My Appointments
                </p>
                <p
                  onClick={logOut}
                  className="hover:text-red-500 cursor-pointer"
                >
                  Logout
                </p>
              </div>
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 rounded-full"
            >
              Create Account
            </button>
          )}

          {/* Mobile Menu Icon */}
          <div className="md:hidden cursor-pointer">
            {sideBar ? (
              <RxCross1 size={26} onClick={() => setSideBar(false)} />
            ) : (
              <IoMenuOutline size={28} onClick={() => setSideBar(true)} />
            )}
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 w-full h-full bg-white flex flex-col items-center justify-center transition-all duration-500 ease-in-out md:hidden ${sideBar
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-10 pointer-events-none"
          }`}
      >
        <button
          className="absolute top-6 right-6"
          onClick={() => setSideBar(false)}
        >
          <RxCross1 size={28} />
        </button>

        <ul className="flex flex-col items-center gap-6 text-2xl font-medium ">
          <NavLink to="/" onClick={() => setSideBar(false)} className="hover:text-gray-100">
            Home
          </NavLink>
          <NavLink to="/doctor" onClick={() => setSideBar(false)} className="hover:text-gray-100">
            All Doctors
          </NavLink>
          <NavLink to="/about" onClick={() => setSideBar(false)} className="hover:text-gray-100">
            About
          </NavLink>
          <NavLink to="/contact" onClick={() => setSideBar(false)} className="hover:text-gray-100">
            Contact
          </NavLink>
          <button
            onClick={() =>
              window.open(
                "https://healthpoint-appointment-admin.onrender.com",
                "_blank"
              )
            }
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-base"
          >
            Admin Panel
          </button>
        </ul>
      </div>
    </nav>
  );
}
