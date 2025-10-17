import React, { useContext, useState } from "react";
import { Context } from "../context/Context";
import axios from "axios";
import { toast } from "react-toastify";

export default function SignUp() {
  const [currentState, setCurrentState] = useState("Login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const { backendUrl, token, setToken } = useContext(Context);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      if (currentState !== "Login") {
        const { data } = await axios.post(`${backendUrl}/api/user/register`, {
          name,
          email,
          password,
        });

        if (data.success) {
          setToken(data.token);
          toast.success(data.message);
          setCurrentState("Login");
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(`${backendUrl}/api/user/login`, {
          email,
          password,
        });

        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex items-center justify-center  px-4 mt-20">
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-md bg-white rounded shadow-lg p-8 sm:p-10 md:p-12 flex flex-col gap-6"
      >
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#000069]">
            {currentState === "Login" ? "Login" : "Create Account"}
          </h1>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">
            Please{" "}
            <span className="font-medium">
              {currentState === "Login" ? "log" : "sign"} in to book appointment
            </span>
          </p>
        </div>

        {/* Input Fields */}
        <div className="flex flex-col gap-4">
          {currentState !== "Login" && (
            <div className="flex flex-col">
              <label className="text-gray-600 text-sm mb-1">Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full py-2.5 px-3  text-sm border rounded outline-none focus:ring-2 focus:ring-blue-400 focus:bg-blue-50 transition-all"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}

          <div className="flex flex-col">
            <label className="text-gray-600 text-sm mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full py-2.5 px-3 text-sm border rounded outline-none focus:ring-2 focus:ring-blue-400 focus:bg-blue-50 transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-600 text-sm mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full py-2.5 px-3 text-sm border rounded outline-none focus:ring-2 focus:ring-blue-400 focus:bg-blue-50 transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#5F6FFF] py-3 mt-3 text-white font-semibold rounded-md hover:bg-blue-700 transition-all flex justify-center items-center gap-2 disabled:opacity-50"
        >
          {loading && (
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8z"
              ></path>
            </svg>
          )}
          {currentState === "Login"
            ? loading
              ? "Logging in..."
              : "Login"
            : loading
            ? "Creating..."
            : "Create Account"}
        </button>

        {/* Switch Between Login / Signup */}
        <div className="text-center text-sm sm:text-base text-gray-600">
          {currentState === "Login" ? (
            <p>
              Create an account{" "}
              <span
                onClick={() => setCurrentState("Sign")}
                className="cursor-pointer text-blue-500 hover:underline"
              >
                Click here
              </span>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <span
                onClick={() => setCurrentState("Login")}
                className="cursor-pointer text-blue-500 hover:underline"
              >
                Login here
              </span>
            </p>
          )}
        </div>
      </form>
    </section>
  );
}
