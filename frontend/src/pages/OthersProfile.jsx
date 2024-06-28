import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom';

const OthersProfile = () => {
    const [userData, setUserData] = useState({});
    const [projectCreatedByLoggedinUser, setProjectCreatedByLoggedinUser] = useState([])
    const userId = useParams().userid

    useEffect(() => {
        fetch(`${import.meta.env.VITE_BACKEND_URL}api/v1/users/get-user-data/${userId}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data.data);
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
                console.log(data.data);
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
                    projectCreatedByLoggedinUser.map((project) => (
                        <NavLink to={`/project/${project._id}`} draggable="false" className={"w-3/5"} key={project._id}>
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
                            </div>
                        </NavLink>
                    ))
                }
            </div>
        </div>
    )
}

export default OthersProfile