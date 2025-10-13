import React, { useContext, useState } from 'react';
import { Context } from '../context/Context';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function SignUp() {
  const [currentState, setCurrentState] = useState("Login");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const { backendUrl, token, setToken } = useContext(Context);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      if (currentState !== "Login") {
        const { data } = await axios.post(`${backendUrl}/api/user/register`, { name, email, password });
        console.log(data, "Sign Up");

        if (data.success) {
          localStorage.setItem('token', data.token);
          setToken(data.token);
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(`${backendUrl}/api/user/login`, { email, password });
        console.log(data, "Login");

        if (data.success) {
          localStorage.setItem('token', data.token);
          setToken(data.token);
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form  onSubmit={onSubmitHandler}  className='w-full flex flex-col items-center justify-center max-w-7xl mx-auto p-10'>
        <div className='w-full flex flex-col gap-4 bg-white rounded-2xl shadow-md p-10 max-w-[500px]'>
          <h1 className='text-2xl text-[#444242] font-semibold'>
            {currentState === "Login" ? "Login" : "Create Account"}
          </h1>
          <p className='text-[#6e6b6b]'>
            Please <span>{currentState === "Login" ? "Log" : "Sign"} in to book appointment</span>
          </p>

          <div className='flex flex-col gap-4'>
            {currentState !== "Login" && (
              <div className='flex flex-col'>
                <label className='text-[#6e6b6b]'>Name</label>
                <input
                  type="text"
                  placeholder='Enter your name'
                  className='w-full py-2 px-2  border outline-none rounded-[4px]  focus:ring-1 focus-within:bg-gray-50 focus:border-blue-400'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            )}

            <div className='flex flex-col'>
              <label className='text-[#6e6b6b]'>Email</label>
              <input
                type="email"
                placeholder='Enter your email'
                className='w-full py-2 px-2 border outline-none rounded-[4px] focus:ring-1 focus-within:bg-gray-50 focus:border-blue-400'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className='flex flex-col'>
              <label className='text-[#6e6b6b]'>Password</label>
              <input
                type="password"
                placeholder='Enter your password'
                className='w-full py-2 px-2 border outline-none rounded-[4px] focus:ring-1 focus-within:bg-gray-50 focus:border-blue-400'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type='submit'
              className='w-full bg-[#5F6FFF] py-3 text-white mt-5 mb-4 rounded-[5px] font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 disabled:opacity-50'
              disabled={loading}
            >
              {loading && (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8z"></path>
                </svg>
              )}
              {currentState === "Login" ? (loading ? "Logging in..." : "Login") : (loading ? "Creating..." : "Create Account")}
            </button>
          </div>

          <div>
            {currentState === "Login" ? (
              <p className='text-[#6e6b6b]'>
                Create an account <span onClick={() => setCurrentState("Sign")} className='cursor-pointer underline text-blue-400'>Click here</span>
              </p>
            ) : (
              <p className='text-[#6e6b6b]'>
                Already have an account? <span onClick={() => setCurrentState("Login")} className='cursor-pointer underline text-blue-400'>Login here</span>
              </p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
