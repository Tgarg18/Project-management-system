import React from 'react'
import Navbar2 from '../components/Navbar2'
import { Outlet } from 'react-router-dom'

const Home = () => {
  return (
    <>
      <Navbar2 />
      <div className='w-full text-white text-lg font-semibold h-[92vh] overflow-scroll px-10' style={{ backgroundImage: `url('../src/assets/background2.jpg')`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
        <Outlet />
      </div>
    </>
  )
}

export default Home