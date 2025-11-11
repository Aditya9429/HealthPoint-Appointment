import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../context/Context";
import RelatedDoctors from "./RelatedDoctors";
import { toast } from "react-toastify";
import axios from "axios";

export default function DoctorDetails() {
  const { docId } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(false);
  const [docSlot, setDocSlot] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");
  const dayOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const { doctors, backendUrl, token, getDoctorsData } = useContext(Context);
  const navigate = useNavigate();

  // Fetch selected doctor details
  async function fetchDoctor() {
    try {
      setLoading(true);
      const data = doctors.find((item) => item._id === docId);
      setDoctor(data || null);
      setLoading(false);
    } catch (e) {
      console.error("Error fetching doctor:", e);
      setLoading(false);
    }
  }

  // Generate available time slots for next 7 days
  async function getAvailableSlots() {
    setDocSlot([]);
    let today = new Date();

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date(currentDate);
      endTime.setHours(21, 0, 0, 0);

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

        timeSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime,
        });

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      setDocSlot((prev) => [...prev, timeSlots]);
    }
  }

  // Book appointment function
  const bookAppointment = async () => {
    if (!token) {
      toast.warn("Login to Book Appointment");
      return navigate("/login");
    }

    if (!slotTime) {
      toast.warn("Please select a time slot before booking");
      return;
    }

    if (!docSlot[slotIndex] || !docSlot[slotIndex][0]) {
      toast.warn("Please select a valid date");
      return;
    }

    try {
      const date = docSlot[slotIndex][0].datetime;
      const slotDate = `${date.getDate()}_${date.getMonth() + 1}_${date.getFullYear()}`;

      const { data } = await axios.post(
        `${backendUrl}/api/user/book-appointment`,
        { docId, slotDate, slotTime, amount: doctor.fees },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        toast.success(data.message);
        getDoctorsData();
        navigate("/my-appointments");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Booking error:", error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    fetchDoctor();
  }, [doctors, docId]);

  useEffect(() => {
    if (doctor) getAvailableSlots();
  }, [doctor]);

  if (loading) return <p className="text-center py-10">Loading doctor details...</p>;
  if (!doctor) return <p className="text-center py-10">No doctor found</p>;

  return (
    <div>
      <div className="w-full flex flex-col lg:flex-row justify-center gap-10 max-w-6xl mx-auto p-8 mb-20">
        {/* Doctor Image */}
        <div className="lg:w-[28%]">
          <div className="bg-[#5F6FFF] rounded-lg flex items-center justify-center">
            <img
              src={doctor.image}
              alt={doctor.name}
              className="w-full h-72 object-cover rounded"
            />
          </div>
        </div>

        <div className="lg:w-[72%]">
          <div className="flex flex-col gap-6 mb-5">
            <div className="flex flex-col gap-3 border border-gray-200 p-6 rounded-sm bg-white">
              <div className="flex items-center gap-2">
                <h1 className="text-3xl font-semibold text-gray-900 flex items-center gap-2">
                  {doctor.name}
                </h1>
                <img src="/images/verified_icon.svg" alt="Verified" />
              </div>
              <div className="flex items-center gap-2">
                <p className="text-gray-700">
                  {doctor.degree} {doctor.speciality}
                </p>
                <span className="border border-gray-300 px-3 py-1 text-sm text-gray-600 rounded-full w-fit">
                  {doctor.experience}
                </span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-sm font-semibold text-gray-800 mb-3">About</h2>
                  <img src="/images/info_icon.svg" alt="info" />
                </div>
                <p className="text-gray-600 text-sm">{doctor.about}</p>
              </div>
              <p className="text-lg font-medium text-gray-600">
                Appointment fee: ₹{doctor.fees}
              </p>
            </div>
          </div>

          <div>
            <p className="text-[#414040] font-medium">Booking Slots</p>

            <div className="flex gap-3 items-center w-full overflow-x-scroll mt-5">
              {docSlot.length > 0 &&
                docSlot.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => setSlotIndex(index)}
                    className={`border border-gray-400 text-center py-5 min-w-16 rounded-full cursor-pointer ${
                      slotIndex === index
                        ? "bg-blue-400 text-white"
                        : "text-[#6d6666] font-medium"
                    }`}
                  >
                    <p>{item[0] && dayOfWeek[item[0].datetime.getDay()]}</p>
                    <p>{item[0] && item[0].datetime.getDate()}</p>
                  </div>
                ))}
            </div>

            <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
              {docSlot.length > 0 &&
                docSlot[slotIndex].map((item, index) => (
                  <p
                    key={index}
                    onClick={() => setSlotTime(item.time)}
                    className={`border border-gray-400 text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${
                      item.time === slotTime ? "bg-blue-400 text-white" : ""
                    }`}
                  >
                    {item.time.toLowerCase()}
                  </p>
                ))}
            </div>

            <button
              onClick={bookAppointment}
              className="border border-gray-200 outline-none px-20 py-3 text-sm bg-blue-400 text-white rounded-3xl mt-10"
            >
              Book an Appointment
            </button>
          </div>
        </div>
      </div>

      <RelatedDoctors doc_id={docId} speciality={doctor.speciality} />
    </div>
  );
}
