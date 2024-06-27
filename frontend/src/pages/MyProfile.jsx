import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const MyProfile = () => {
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}api/v1/users/get-my-profile-data`, {
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
  return (
    <div className='flex flex-col items-center justify-center'>
      <h1 className='text-3xl mt-8'>My Profile</h1>
      <hr className='w-4/5 mt-2 mb-4' />
      <div className='flex justify-center items-center gap-16'>
        <img src={userData.avatar} alt="" className='w-40 rounded-[50%] h-40 object-cover object-center' />
        <div className='flex flex-col justify-center items-center text-lg'>
          <div>
            {userData.fullName}
          </div>
          <div>
            @{userData.userName}
          </div>
        </div>
      </div>
      <div className='flex flex-col justify-center items-center gap-3 my-4 w-full'>
        <button className='rounded-xl px-5 py-2 bg-slate-600 w-1/2' onClick={() => navigate("/edit-profile")}>Edit Profile</button>
        <button className='rounded-xl px-5 py-2 bg-slate-600 w-1/2' onClick={() => navigate("/change-password")}>Change Password</button>
      </div>
    </div>
  )
}

export default MyProfile