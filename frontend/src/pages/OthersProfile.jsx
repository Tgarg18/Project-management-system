import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom';
import { toast } from "react-toastify";

const OthersProfile = () => {
    const [userData, setUserData] = useState({});
    const [projectCreatedByLoggedinUser, setProjectCreatedByLoggedinUser] = useState([])
    const userId = useParams().userid

    const joinProject = (projectId) => {
        fetch(`${import.meta.env.VITE_BACKEND_URL}api/v1/projects/join-project`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({ projectId }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                navigate('/');
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    const leaveProject = (projectId) => {
        fetch(`${import.meta.env.VITE_BACKEND_URL}api/v1/projects/leave-project`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({ projectId }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                navigate('/');
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    useEffect(() => {
        fetch(`${import.meta.env.VITE_BACKEND_URL}api/v1/users/get-user-data/${userId}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setUserData(data.data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, [])

    useEffect(() => {
        fetch(`${import.meta.env.VITE_BACKEND_URL}api/v1/projects/get-projects-created-by-user/${userId}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            }
        })
            .then((response) => response.json())
            .then((data) => {
                setProjectCreatedByLoggedinUser(data.data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, [])

    return (
        <div className='flex flex-col items-center justify-center'>
            <h1 className='text-3xl mt-8'>My Profile</h1>
            <hr className='w-4/5 mt-2 mb-4' />
            <div className='flex justify-center items-center gap-16'>
                <img src={userData.avatar} alt="" className='w-40 rounded-[50%] h-40 object-cover object-center' draggable="false" />
                <div className='flex flex-col justify-center items-center text-lg gap-2'>
                    <div className='text-2xl'>
                        {userData.fullName}
                    </div>
                    <div className='text-xl text-gray-300'>
                        @{userData.userName}
                    </div>
                </div>
            </div>
            <hr className='w-4/5 ' />
            <div className='text-center text-2xl my-2'>
                Projects Created
            </div>
            <hr className='w-4/5 ' />
            <div className='flex flex-col justify-center items-center w-full mt-5'>
                {
                    projectCreatedByLoggedinUser?.length === 0 && <div className='text-center text-white'>No projects found.</div>
                }
                {
                    projectCreatedByLoggedinUser?.map((project) => (
                        <div className={"w-3/5"} key={project._id}>
                            <div key={project._id} className='flex flex-col items-center justify-center py-3 border hover:rounded-xl'>
                                <div className='flex justify-center items-center gap-4'>
                                    <img src={project.projectPhoto} className='w-16 h-16 rounded-[50%] object-cover object-center' alt="" draggable="false" />
                                    <div className='text-center text-2xl'>
                                        {project.name}
                                    </div>
                                </div>
                                <hr className='w-full mt-2 mb-3' />
                                <div>
                                    Description: {project.description}
                                </div>
                                <div>
                                    Leader: @{project.leader.userName}
                                </div>
                                <div>
                                    Number of Members: {project.members.length}
                                </div>
                                <div className='flex justify-center items-center gap-4 mt-3'>
                                    {
                                        ((project.members.some((member) => member._id == JSON.parse(localStorage.getItem("user"))._id)) || (project.leader._id == JSON.parse(localStorage.getItem("user"))._id)) ?
                                            <NavLink to={`/project/${project._id}`} className={`bg-green-400 py-2 px-3 rounded-xl hover:opacity-80`} draggable="false">View Project</NavLink>
                                            :
                                            null
                                    }
                                    {
                                        (project.leader._id == JSON.parse(localStorage.getItem("user"))._id) ?
                                            null
                                            :
                                            (
                                                (project.members.some((member) => member._id == JSON.parse(localStorage.getItem("user"))._id)) ?
                                                    <button className={`bg-red-500 py-2 px-3 rounded-xl hover:opacity-80`} onClick={() => leaveProject(project._id)}>Leave Project</button>
                                                    :
                                                    project.leader._id == JSON.parse(localStorage.getItem("user"))._id ?
                                                        null
                                                        :
                                                        <button className={`bg-green-400 py-2 px-3 rounded-xl hover:opacity-80`} onClick={() => joinProject(project._id)}>Join Project</button>
                                            )
                                    }
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default OthersProfile