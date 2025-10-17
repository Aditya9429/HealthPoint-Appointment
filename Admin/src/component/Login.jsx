import React, { useState, useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import axios from "axios";
import { toast } from "react-toastify";
import { DoctorContext } from "../context/DoctorContext";

export default function Login() {
  const [state, setState] = useState("Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setAToken, backendUrl } = useContext(AdminContext);
  const { dToken, setDToken } = useContext(DoctorContext)
  // const onSubmitHandler = async (event) => {
  //   event.preventDefault();
  //   try {
  //     if (state == 'Admin') {
  //       const { data } = await axios.post(backendUrl + '/api/admin/login', { email, password });
  //       if (data.success) {
  //         localStorage.setItem('aToken', data.token);
  //         setAToken(data.token)
  //       }
  //       else {
  //         toast.error(data.message)
  //       }
  //     }
  //     else {
  //       const { data } = await axios.post(backendUrl + '/api/doctor/login', { email, password });
  //       if (data.success) {
  //         localStorage.setItem('dToken', data.dToken);
  //         setDToken(data.dToken);
  //         console.log(data.token)
  //       }
  //       else {
  //         toast.error(data.message)
  //       }
  //     }
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  const OnSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (state === "Admin") {
        const { data } = await axios.post(backendUrl + "/api/admin/login", {
          email,
          password,
        });
        if (data.success) {
          localStorage.setItem("aToken", data.token);
          setAToken(data.token);
          toast.success("Login successful");
        } else {
          toast.error("Login failed");
        }
      } else {
        const { data } = await axios.post(backendUrl + "/api/doctor/login", {
          email,
          password,
        });
        console.log(data.token, "doctor data");
        if (data.success) {
          localStorage.setItem("dToken", data.token);
          setDToken(data.token);
          toast.success("Login successful");
        } else {
          toast.error("Login failed");
        }
      }
    } catch (err) {
      if (err.response && err.response.data) {
        toast.error(err.response.data.message || "Invalid credentials");
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <form onSubmit={OnSubmitHandler} className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-[340px] bg-white rounded shadow-2xl">
        <p className="flex items-center gap-1 text-2xl font-semibold m-auto">
          <span className=" text-blue-500 bg-pink ">{state} </span>
          <span>Login</span>
        </p>

        <div className="w-full">
          <p className="mb-1">Email</p>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
            type="email"
            placeholder="you@example.com"
            required
          />
        </div>

        <div className="w-full">
          <p className="mb-1">Password</p>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
            type="password"
            placeholder="Password"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-400 text-white w-full py-2 rounded-md text-base"
        >
          Login
        </button>

        <div className="w-full text-center mt-2">
          {state === "Admin" ? (
            <p>
              Doctor Login?{" "}
              <span
                className="text-primary cursor-pointer underline"
                onClick={() => setState("Doctor")}
              >
                Click here
              </span>
            </p>
          ) : (
            <p>
              Admin Login?{" "}
              <span
                className="text-primary cursor-pointer underline"
                onClick={() => setState("Admin")}
              >
                Click here
              </span>
            </p>
          )}
        </div>
      </div>
    </form>
  );
}
