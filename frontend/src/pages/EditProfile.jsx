import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { toast } from "react-toastify";

const EditProfile = () => {
    const [flag, setFlag] = useState(true)
    const [profilePhoto, setProfilePhoto] = useState("")

    const [profileBio, setProfileBio] = useState("")

    const [loadStatus, setLoadStatus] = useState(false)

    const notifyError = () => toast.error('Something went wrong!')
    const notifySuccessfulChange = () => toast.success('Profile Updated Successfully!')
    const navigate = useNavigate()

    const loadFile = (event) => {
        var output10 = document.getElementById('output10');
        output10.src = URL.createObjectURL(event.target.files[0]);

        output10.onload = function () {
            URL.revokeObjectURL(output10.src)
        }
    }

    useEffect(() => {
        fetch(`${import.meta.env.VITE_BACKEND_URL}api/v1/users/get-my-profile-data`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setProfileBio(data.data.bio)
                setProfilePhoto(data.data.avatar)
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, [])

    const changeDetails = () => {
        const formData = new FormData;
        formData.append('bio', profileBio);
        if(flag===false && profilePhoto) {
            formData.append('avatar', profilePhoto);
        }
        fetch(`${import.meta.env.VITE_BACKEND_URL}api/v1/users/change-userdata`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            },
            body: formData
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.message === "User data updated successfully") {
                    notifySuccessfulChange()
                    window.location.reload()
                }
                else {
                    notifyError()
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    const removePhoto = () => {
        fetch(`${import.meta.env.VITE_BACKEND_URL}api/v1/users/removephoto`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({
                userid: JSON.parse(localStorage.getItem("user"))._id
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.message == "Profile photo removed successfully") {
                    setProfilePhoto("https://res.cloudinary.com/wittywebcloud/image/upload/v1718627988/userimage_hwokq2.png")
                    window.location.reload()
                    notifySuccessfulChange()
                }
                else {
                    notifyError()
                }
            })
    }

    return (
        <div className='flex flex-col items-center justify-center'>
            <div className='text-3xl text-center mt-8'>
                Edit Profile
            </div>
            <hr className='w-4/5 mt-2 mb-4' />
            <div className='flex flex-col gap-6 w-4/5'>
                <div className='flex items-center justify-evenly gap-0 lg:gap-6'>
                    <div className='flex flex-col gap-3 pt-10'>
                        <div className='text-2xl font-bold'>Change your Profile Photo</div>
                        <div><input type="file" accept='image/*' onChange={(e) => {
                            setFlag(false)
                            loadFile(e)
                            setProfilePhoto(e.target.files[0])
                        }} className='fileinput w-[46%] lg:w-[100%]' /></div>
                        <div className="mt-7">
                            <button className='rounded-full border-2 py-3 w-48 lg:w-60' onClick={() => removePhoto()}>Remove Profile Photo</button>
                        </div>
                    </div>
                    <div className='qwerty'>
                        {(flag == true) ?
                            <img src={profilePhoto} id='output10' alt="" className={`myimage2 min-h-4 min-w-4 `} draggable="false" />
                            :
                            <img src={URL.createObjectURL(profilePhoto)} id='output10' alt="" className={`myimage2 min-h-4 min-w-4 `} draggable="false" />
                        }
                    </div>
                </div>
                <div className='flex flex-col lg:flex-row items-center justify-around'>
                    <div className='text-lg font-semibold w-full text-center lg:w-1/5 lg:text-left'>Bio</div>
                    <textarea value={profileBio} onChange={(e) => setProfileBio(e.target.value)} className="bio mx-0 w-3/5 pt-1 px-1 text-black" placeholder='Write you bio'></textarea>
                </div>
                <div className="flex flex-col lg:flex-row gap-3 justify-center mt-4 px-4">
                    <div className='flex justify-center items-center gap-2 flex-col lg:flex-row'>
                        <NavLink to={"/myprofile"} draggable="false">
                            <button className='w-60 rounded-full border-2 py-3 bg-green-500' onClick={() => changeDetails()}>Save</button>
                        </NavLink>
                        <NavLink to={"/myprofile"} draggable="false">
                            <button className='rounded-full border-2 py-3 w-60 bg-red-600 text-white hover:bg-red-400'>Cancel</button>
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditProfile