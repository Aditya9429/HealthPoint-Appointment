import React from 'react'
import Header from '../component/Header'
import Speciality from '../component/Speciality'
import Doctors from '../component/Doctors'
import Trusted from '../component/Trusted'

export default function Home() {
  return (
    <div>
      <Header/>
      <Speciality />
      <Doctors />
      <Trusted />
    </div>
  )
}
