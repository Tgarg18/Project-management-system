import React, { useState } from 'react'
import Navbar1 from '../components/Navbar1'
import { useForm } from 'react-hook-form'
import { NavLink,useNavigate } from 'react-router-dom'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { toast } from "react-toastify";
import background from '../../public/background.jpg'

const Login = () => {

    const { register, handleSubmit, formState: { errors } } = useForm()
    const [showPassword, setshowPassword] = useState(false)
    const navigate = useNavigate()

    const onSubmit = (data) => {
        fetch(`${import.meta.env.VITE_BACKEND_URL}api/v1/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: data.email,
                userName: data.username,
                password: data.password
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.message === "User logged in successfully!") {
                    localStorage.setItem("token", data.token);
                    localStorage.setItem("user", JSON.stringify(data.user));
                    navigate("/")
                }
                else{
                    toast.error(data.message)
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    return (
        <>
            <Navbar1 />
            <div className='w-full pt-10 h-[calc(92vh)] flex justify-center items-center' style={{ backgroundImage: `url(${background})`,backgroundPosition: 'center',backgroundRepeat: 'no-repeat',backgroundSize: 'cover'}}>
                <form onSubmit={handleSubmit(onSubmit)} className='w-1/4 border-2 border-black rounded-xl py-3 px-10 shadow-2xl shadow-black'>
                    <h2 className='text-2xl text-center font-bold'>Login to ManageMate</h2>
                    <NavLink to={'/signup'} className={`w-full hover:underline`} draggable={false}>
                        <p className='text-center my-2 w-full'>Don't have an account? Signup</p>
                    </NavLink>
                    <input type="text" placeholder="Enter your email" {...register('email')} required autoComplete="off" className='w-full my-2 px-2 py-2 border border-black rounded-lg' />
                    <input type="text" placeholder="Enter your username" {...register('username')} required autoComplete="off" className='w-full my-2 px-2 py-2 border border-black rounded-lg' />
                    <div className='w-full relative flex items-center'>
                        <input type={`${showPassword ? "text" : "password"}`} placeholder="Enter your password" {...register('password')} required autoComplete="off" className='w-full my-2 pl-2 py-2 pr-10 border border-black rounded-lg' />
                        <p className='absolute right-0 text-sm mr-3'>
                            {showPassword ?
                                <VisibilityIcon className='cursor-pointer' onClick={() => setshowPassword(false)} />
                                :
                                <VisibilityOffIcon className='cursor-pointer' onClick={() => setshowPassword(true)} />
                            }
                        </p>
                    </div>
                    <button type="submit" className='w-full my-2 px-2 py-4 bg-black text-white rounded-xl text-lg font-semibold hover:bg-slate-700'>LOGIN</button>
                </form>
            </div>
        </>
    )
}

export default Login