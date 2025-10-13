// context/Context.jsx
import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [token, setToken] = useState(localStorage.getItem("token") ? localStorage.getItem("token") : false);
  const [doctors, setDoctors] = useState([]);
  const [userData, setUserData] = useState(false);
 

  const getDoctorsData = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/doctor/list', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error(data.message || "Failed to fetch doctors");
      }
    } catch (error) {
      console.error("Error fetching doctors:", error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const fetchUserProfile = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/user/get-profile', {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if (data.success) {
        setUserData(data.userData);
      } else {
        toast.error(data.message || "Failed to fetch profile");
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    getDoctorsData();
  }, []);

  useEffect(() => {
    if (token) {
      fetchUserProfile();
    } else {
      setUserData(false);
    }
  }, [token]);

  return (
    <Context.Provider
      value={{
        backendUrl,
        token,
        setToken,
        doctors,
        getDoctorsData,
        userData,
        setUserData,
        fetchUserProfile,
      }}
    >
      {children}
    </Context.Provider>
  );
};
