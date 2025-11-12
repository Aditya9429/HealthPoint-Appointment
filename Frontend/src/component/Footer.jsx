import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Footer() {
    const navigate = useNavigate();

    return (
        <footer className="text-black mt-10 bg-blue-100">
            <div className="max-w-7xl mx-auto py-12 px-10">

                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-2 gap-30">

                    <div>
                        <div className='flex items-center gap-2 mb-4'>
                            <img src="/images/health.png" alt="" className='w-9 h-9 object-cover' />
                            <h1 className="text-3xl text-[#000B6D] font-bold ">PulsePoint</h1>
                        </div>

                        <p className="max-w-[300px] text-sm font-medium text-gray-900">
                            Learn Ipsum is simply dummy text of the printing and typesetting industry. Learn Ipsum has been the industry's standard dummy text ever since the 1500s.
                        </p>
                    </div>

                    <div className='flex flex-col lg:flex-row  gap-20'>
                        <div className="flex flex-col gap-6">
                            <h1 className="text-lg font-bold mb-3 uppercase">Company</h1>
                            <div className="flex flex-col gap-2">
                                <p className="cursor-pointer hover:text-gray-300" onClick={() => navigate('/')}>Home</p>
                                <p className="cursor-pointer hover:text-gray-300"
                                    onClick={() => navigate('/about')}>About Us</p>
                                <p className="cursor-pointer hover:text-gray-300" onClick={() => navigate('/Contact')} >Contact</p>
                                <p className="cursor-pointer hover:text-gray-300">Privacy</p>
                            </div>
                        </div>

                        <div className='flex flex-col gap-6'>
                            <h1 className="text-lg font-bold mb-3 uppercase">Get In Touch</h1>
                            <div className="flex flex-col gap-2 text-sm">
                                <p>+00-000-000-000</p>
                                <p>greatwhdoc@gmail.com</p>
                            </div>
                        </div>
                    </div>
                </div>

                <p className="text-center text-sm mt-10">
                    &copy; 2024 © Greatwhdoc. All Right Reserved.
                </p>
            </div>
        </footer>
    );
}