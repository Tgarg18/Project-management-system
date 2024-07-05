import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

const Navbar2 = () => {
    const loginStatus = (localStorage.getItem("token")) ? true : false
    const navigate = useNavigate()
    return (
        <>
            <nav className='w-full h-[8vh] bg-black text-white text-lg font-semibold flex items-center justify-between px-10 sticky top-0'>
                <NavLink to={'/'} draggable={false}>
                    ManageMate
                </NavLink>
                {
                    loginStatus ?
                        <ul className='flex gap-5'>
                            <NavLink to={'/myprofile'} className={({ isActive }) =>
                                `no-underline p-1.5 hover:bg-slate-800 hover:rounded-lg ${isActive ? 'border-b-2 border-white' : ''}`
                            } draggable={false}>
                                <li>My Profile</li>
                            </NavLink>
                            <button className={`no-underline text-red-500 p-1.5 hover:bg-slate-800 hover:rounded-lg`} draggable={false} onClick={() => {
                                localStorage.removeItem("token")
                                localStorage.removeItem("user")
                                navigate("/login")
                            }}>
                                <li>Logout</li>
                            </button>
                        </ul>
                        :
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
                }
            </nav>
        </>
    )
}

export default Navbar2