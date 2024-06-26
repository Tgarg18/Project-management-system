import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

const ProjectDashboard = () => {
    return (
        <>
            <div className='flex justify-evenly py-4'>
                <NavLink to={'/'} className={({ isActive }) =>
                    `no-underline p-1.5 hover:bg-slate-800 hover:rounded-lg ${isActive ? 'border-b-2 border-white' : ''}`
                }>
                    <div className='text-lg'>My Projects</div>
                </NavLink>
                <NavLink to={'/search-projects'} className={({ isActive }) =>
                    `no-underline p-1.5 hover:bg-slate-800 hover:rounded-lg ${isActive ? 'border-b-2 border-white' : ''}`
                }>
                    <div className='text-lg'>Search Projects</div>
                </NavLink>
            </div>
            <div>
                <Outlet />
            </div>
        </>
    )
}

export default ProjectDashboard