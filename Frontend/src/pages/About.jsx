import React from 'react'

export default function About() {
  return (
    <div>
      <div className='w-full flex flex-col gap-10 max-w-6xl mx-auto p-5 '>
        <h1 className='text-2xl text-[#989e9f] text-center mt-10'>ABOUT <span className='text-[#000000]'>US</span></h1>
        <div className='flex  flex-col lg:flex-row items-center gap-10'>
          <div>
            <img src="/images/about_image.png" className='w-full max-w-[400px]' />
          </div>
          <div className='flex flex-col gap-8'>
            <div className='flex flex-col gap-4'>
              <h1 className='text-sm font-medium  max-w-[620px]  text-gray-600'>Welcome to Prescripto, your trusted partner in managing your healthcare needs conveniently and efficiently. At Prescripto, we understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.</h1>
              <h1 className='text-sm  font-medium max-w-[620px] text-gray-600'>Prescripto is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service. Whether you're booking your first appointment or managing ongoing care, Prescripto is here to support you every step of the way.</h1>
            </div>
            <div className='flex flex-col gap-5'>
              <p className='text-gray-900 font-medium'>Our Vision</p>
              <p className='text-sm max-w-[620px] text-gray-600'>Our vision at Prescripto is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.</p>
            </div>
          </div>
        </div>
        <div className='flex  flex-col gap-5'>
          <h1 className='text-2xl text-[#989e9f]'><span className='text-[#000000]'>WHY</span> CHOOSE US</h1>
          <div className='flex flex-col lg:flex-row'>
            <div className='flex flex-col items-start  text-gray-700 border border-gray-300 p-10 hover:bg-blue-500 hover:text-white'>
              <p className='mb-3'>EFFICIENCY :</p>
              <p>Streamlined appointment scheduling that fits into your busy lifestyle.</p>
            </div>
            <div className='flex flex-col items-start  text-gray-700  border border-gray-300 p-10 hover:bg-blue-500 hover:text-white'>
              <p className='mb-3'>CONVENIENCE:</p>
              <p>Access to a network of trusted healthcare professionals in your area.</p>
            </div>
            <div className='flex flex-col items-start   text-gray-700  border-gray-300 border p-10 hover:bg-blue-500 hover:text-white'>
              <p className='mb-3'>PERSONALIZATION:</p>
              <p>Tailored recommendations and reminders to help you stay on top of your health.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
