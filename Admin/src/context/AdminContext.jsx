import { useState, createContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
export const AdminContext = createContext();

export default function AdminContextProvider({ children }) {
  const [atoken, setAToken] = useState(localStorage.getItem('aToken') ? localStorage.getItem('aToken') : "");
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([])
  const [dashData, setDashData] = useState(false)
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const getAllDoctors = async () => {
    try {
      const { data } = await axios.post(backendUrl + '/api/admin/all-doctors', {}, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${atoken}`,
        },
      })
      if (data.success) {
        setDoctors(data.doctors);
        console.log("all doctor ", data.doctors)
      }
      else {
        toast.error(data.message)
      }
    }
    catch (error) {
      // console.log(error);
      toast.error(error.message)
    }
  }
  const changeAvailablity = async (docId) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/admin/change-availablity', { docId }, {
        headers: {
          Authorization: `Bearer ${atoken}`,
        },
      })
      console.log(data)
      if (data.success) {
        toast.success(data.message);
        getAllDoctors();
      }
      else {
        toast.error(data.message)
      }
    }
    catch (error) {
      // console.log(error);
      toast.error(error.message)
    }
  }

  const getAllAppointments = async () => {
    try {
      const { data } = await axios.get(' http://localhost:4000/api/admin/appointments', {
        headers: {
          Authorization: `Bearer ${atoken}`,
        },
      })
      console.log(data)
      if (data.success) {
        setAppointments(data.appointments)
      }
      else {
        toast.error(data.message)
      }
    }
    catch (error) {
      console.log(error.message)
    }
  }


  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/admin/cancel-appointment', { appointmentId }, {
        headers: {
          Authorization: `Bearer ${atoken}`,
        },
      })
      console.log(data)
      if (data.success) {
        toast.success(data.success)
        getAllAppointments()
      }
      else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  const getDashData = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/admin/dashboard', {
        headers: {
          Authorization: `Bearer ${atoken}`,
        },
      })
      console.log(data, "dash data")
      if (data.success) {
        setDashData(data.dashData)
        toast.success(data.success)
      }
      else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  const value = {
    atoken,
    setAToken,
    backendUrl,
    doctors,
    getAllDoctors,
    changeAvailablity,
    appointments,
    getAllAppointments,
    cancelAppointment,
    dashData,
    getDashData
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
}
