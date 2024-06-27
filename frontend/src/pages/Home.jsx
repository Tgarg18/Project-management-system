import React from 'react'
import Navbar2 from '../components/Navbar2'
import { Outlet } from 'react-router-dom'

const Home = () => {
  return (
    <>
      <Navbar2 />
      <div className='w-full bg-[#3b3b3b] text-white text-lg font-semibold px-10'>
        <Outlet />
      </div>
    </>
  )
}

export default Home