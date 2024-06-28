import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

const ProjectDashboard = () => {
    return (
        <>
            <div className='flex justify-evenly py-4'>
                <NavLink to={'/'} className={({ isActive }) =>
                    `no-underline p-1.5 hover:bg-gray-700 hover:rounded-lg ${isActive ? 'border-b-2 border-white' : ''}`
                } draggable="false">
                    <div className='text-lg'>My Projects</div>
                </NavLink>
                <NavLink to={'/search-projects'} className={({ isActive }) =>
                    `no-underline p-1.5 hover:bg-gray-700 hover:rounded-lg ${isActive ? 'border-b-2 border-white' : ''}`
                } draggable="false">
                    <div className='text-lg'>Search Projects</div>
                </NavLink>
                <NavLink to={'/create-project'} className={({ isActive }) =>
                    `no-underline p-1.5 hover:bg-gray-700 hover:rounded-lg ${isActive ? 'border-b-2 border-white' : ''}`
                } draggable="false">
                    <div className='text-lg'>Create Project</div>
                </NavLink>
            </div>
            <div className='h-[82.5vh] overflow-y-scroll'>
                <Outlet />
            </div>
        </>
    )
}

export default ProjectDashboard