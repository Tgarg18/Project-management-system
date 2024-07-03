import React from 'react'
import { NavLink } from 'react-router-dom'
const Navbar1 = () => {
  return (
    <>
      <nav className='w-full h-[8vh] bg-black text-white text-lg font-semibold flex items-center justify-between px-10'>
        <NavLink to={'/'} draggable={false}>
          ManageMate
        </NavLink>
        <ul className='flex gap-5'>
          <NavLink to={'/login'} className={({ isActive }) =>
            `no-underline p-1.5 hover:bg-slate-800 hover:rounded-lg ${isActive ? 'border-b-2 border-white' : ''}`
          } draggable={false}>
            <li>Login</li>
          </NavLink>
          <NavLink to={'/signup'} className={({ isActive }) =>
            `no-underline p-1.5 hover:bg-slate-800 hover:rounded-lg ${isActive ? 'border-b-2 border-white' : ''}`
          } draggable={false}>
            <li>Signup</li>
          </NavLink>
        </ul>
      </nav>
    </>
  )
}

export default Navbar1