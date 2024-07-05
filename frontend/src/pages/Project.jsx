import React, { useEffect, useState } from 'react'
import { NavLink, Outlet, useParams } from 'react-router-dom'

const Project = () => {
    const [projectData, setProjectData] = useState({})
    const projectId = useParams().projectId
    useEffect(() => {
        fetch(`${import.meta.env.VITE_BACKEND_URL}api/v1/projects/get-project-by-id/${projectId}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setProjectData(data.data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, [])
    return (
        <div>
            <h1 className='text-3xl text-center'>{projectData?.name}</h1>
            <div className='flex gap-8 justify-center items-center my-5'>
                <img src={projectData?.projectPhoto} alt="projectPhoto" className='w-40 h-40 rounded-[50%] object-cover object-center' draggable="false" />
                <p>{projectData?.description}</p>
            </div>
            <div className='flex flex-col justify-center items-center'>
                <NavLink to={JSON.parse(localStorage.getItem('user'))._id === projectData?.leader?._id ? `/myprofile` : `/user-profile/${projectData?.leader?._id}`}>
                    <div>Leader: @{projectData?.leader?.userName}</div>
                </NavLink>
                <div>Members: {projectData?.members?.length}</div>
            </div>
            <div className='flex justify-evenly items-center w-full'>
                <NavLink to={'completed-tasks'} className={({ isActive }) =>
                    `no-underline text-center ${isActive ? 'border-b-2 border-white' : ''}`
                }>Completed Tasks</NavLink>
                {
                    (projectData?.leader?._id === JSON.parse(localStorage.getItem('user'))._id) ?
                        <NavLink to={`assign-tasks`} className={({ isActive }) =>
                            `no-underline text-center ${isActive ? 'border-b-2 border-white' : ''}`
                        }>Assign Tasks</NavLink>
                        :
                        <NavLink to={'my-tasks'} className={({ isActive }) =>
                            `no-underline text-center ${isActive ? 'border-b-2 border-white' : ''}`
                        }>My Tasks</NavLink>
                }
            </div>
            <div>
                <Outlet />
            </div>
        </div>
    )
}

export default Project