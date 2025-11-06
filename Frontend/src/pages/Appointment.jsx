import React, { useContext, useEffect, useState } from "react";
import { Context } from "../context/Context";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
// import Razorpay from 'rax'
export default function Appointment() {
  const { backendUrl, token, getDoctorsData } = useContext(Context);
  const [appointments, setAppointments] = useState([]);
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const navigate = useNavigate();
  const slotDateFormate = (slotDate) => {
    if (!slotDate) return "N/A";
    const dateArray = slotDate.split('_');
    const day = dateArray[0];
    const month = months[Number(dateArray[1]) - 1];
    const year = dateArray[2];
    return `${day} ${month} ${year}`;
  }

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/appointments`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setAppointments(data.appointments.reverse());
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Appointment Payment',
      order_id: order.id,
      handler: async (response) => {
        console.log(response, "hellll")
        try {
          const { data } = await axios.post(backendUrl + '/api/user/verifyRazorpay', response, { headers: { Authorization: `Bearer ${token}` } });
          if (data.success) {
            getUserAppointments();
            navigate('/my-appointments')
          }
        } catch (error) {
          console.log(error);
          toast.error(error.message)
        }

      }
    }
    const rzp = new window.Razorpay(options);
    rzp.open();
  }

  const appointmentRazorPay = async (appointmentId) => {
    try {
      const { data } = await axios.post(backendUrl + "/api/user/payment-razorpay", { appointmentId }, { headers: { Authorization: `Bearer ${token}` } })
      console.log("raxordaa", data);
      if (data.success) {
        console.log(data.order, "roder")
        initPay(data.order);
      }
    }
    catch (error) {
      console.log(error.message, "error");
    }
  }

  useEffect(() => {
    if (token) getUserAppointments();
  }, [token]);

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/user/cancel-appointment', { appointmentId }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      console.log(data);
      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
        getDoctorsData()
      }
      else {
        toast.error(data.message)
      }
    }
    catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  return (
    <div className="w-full flex flex-col justify-center gap-5 mx-auto max-w-7xl p-10">
      <p className="text-lg font-medium text-gray-500">My Appointments</p>
      <hr className="text-gray-300" />

      {appointments.length === 0 ? (
        <p className="text-gray-500 text-center mt-10">No appointments found.</p>
      ) : (
        appointments.map((item, index) => {
          const doctor = item.docData || item.docId; // populated doctor data
          const date = item.slotDate || item.date || "N/A";
          const time = item.slotTime || item.time || "N/A";

          return (
            <div key={index} className="flex flex-col">
              <div className="flex lg:items-center justify-center gap-5">
                {/* Doctor Image */}
                <div className="w-40 h-40">
                  <img
                    src={doctor?.image || ""}
                    alt={doctor?.name || "Doctor"}
                    className="w-full h-full object-cover rounded bg-[#EAEFFF]"
                  />
                </div>

                {/* Appointment Details */}
                <div className="w-full flex flex-col justify-normal lg:flex-row lg:justify-between gap-4">
                  <div className="flex flex-col gap-1 text-sm">
                    <p className="text-[#1b1c1d] text-lg font-medium">
                      {doctor?.name || "Unknown Doctor"}
                    </p>
                    <p>{doctor?.speciality || "N/A"}</p>
                    <p className="text-zinc-700 font-medium">Address:</p>
                    <p>{doctor?.address?.line1 || ""}</p>
                    <p>{doctor?.address?.line2 || ""}</p>

                    <div className="flex gap-3">
                      <p className="text-zinc-700 font-medium">
                        Date & Time:{" "}
                        <span className="text-gray-600">
                          {slotDateFormate(date)} | {time}
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-col gap-3 justify-end">
                    {!item.cancelled && item.payment && !item.isCompleted && <button className="sm:min-w-48 py-2 border rounded text-stone-500 bg">Paid</button>}
                    {!item.cancelled && !item.payment && !item.isCompleted && <button className="border border-gray-400 py-2 text-sm font-medium text-gray-500 rounded hover:bg-blue-400 transition-all duration-300 hover:text-white" onClick={() => appointmentRazorPay(item._id)}>
                      Pay Online
                    </button>}
                    {!item.cancelled && !item.isCompleted && <button onClick={() => cancelAppointment(item._id)} className="border border-gray-400 px-3 py-2 text-sm font-medium rounded text-gray-500 hover:bg-red-500 transition-all duration-300 hover:text-white">
                      Cancel Appointment
                    </button>}
                    {item.cancelled && !item.isCompleted && <button className="sm:min-w-48 py-2 border border-red-500 text-red-500">Appointment Cancelled</button>}
                    {item.isCompleted && <button className="sm:min-w-48 py-2 border border-green-500 text-green-500">Completed</button>}
                  </div>
                </div>
              </div>
              <hr className="w-full mt-4 text-gray-300" />
            </div>
          );
        })
      )}
    </div>
  );
}
