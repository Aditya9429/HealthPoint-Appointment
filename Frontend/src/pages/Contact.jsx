import React from 'react'

export default function Contact() {
  return (
    <div>
      <div className='w-full flex flex-col items-center gap-10  max-w-7xl mx-auto  p-5 lg:p-10 '>
        <h1 className='text-2xl text-[#989e9f] mt-10'>CONTACT <span className='text-[#000000]'>US</span></h1>
        <div className='flex flex-col lg:flex-row gap-10'>
          <div>
            <img src="/images/contact_img.png" className='w-[460px] lg:w-[360px] object-cover'/>
          </div>
          <div  className='mb-4'>
            <div className='flex flex-col gap-4'>
              <h1 className='text-lg text-gray-700 font-medium'>OUR OFFICE</h1>
              <p className='max-w-[180px]'>00000 Willms Station Suite 000, Washington,USA</p>
              <p className='max-w-[150px]'>Tel: (000) 000-0000
                Email:greatstackdev@gmail.com</p>
            </div>
            <div className='flex flex-col items-start  gap-5 mt-5'>
              <h1 className='text-lg text-gray-700 font-medium'>CAREERS AT PRESCRIPTO</h1>
              <p>Learn more about our teams and job openings.</p>
              <button className='text-sm border px-8 py-4 hover:bg-black hover:text-white'>Explore Jobs</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
