import React, { useEffect, useState } from 'react'
import { useNavigate,NavLink } from 'react-router-dom';

const MyProfile = () => {
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  const [projectCreatedByLoggedinUser, setProjectCreatedByLoggedinUser] = useState([])

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}api/v1/users/get-my-profile-data`, {
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
    fetch(`${import.meta.env.VITE_BACKEND_URL}api/v1/projects/get-projects-created-by-loggedin-user`, {
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
        <img src={userData.avatar} alt="" className='w-40 rounded-[50%] h-40 object-cover object-center' />
        <div className='flex flex-col justify-center items-center text-lg gap-2'>
          <div className='text-2xl'>
            {userData.fullName}
          </div>
          <div className='text-xl text-gray-300'>
            @{userData.userName}
          </div>
        </div>
      </div>
      <div className='flex flex-col justify-center items-center gap-3 my-4 w-full'>
        <button className='rounded-xl px-5 py-2 bg-slate-600 hover:bg-slate-500 w-1/2' onClick={() => navigate("/edit-profile")}>Edit Profile</button>
        <button className='rounded-xl px-5 py-2 bg-slate-600 hover:bg-slate-500 w-1/2' onClick={() => navigate("/change-password")}>Change Password</button>
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
                  <img src={project.projectPhoto} className='w-16 h-16 rounded-[50%] object-cover object-center' alt="" />
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

export default MyProfile