import React, { useState } from 'react';
import Navbar1 from '../components/Navbar1';
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { toast } from "react-toastify";
import background from '../../public/background.jpg';

const Signup = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showCpassword, setShowCpassword] = useState(false);
  const [stage, setStage] = useState(1);
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState(null);
  const defaultAvatarUrl = "https://res.cloudinary.com/wittywebcloud/image/upload/v1718627988/userimage_hwokq2.png";

  const loadFile = (event) => {
    const output = document.getElementById('output10');
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = () => URL.revokeObjectURL(output.src);
  };

  const onSubmit = async (data) => {
    if (data.password === data.cpassword) {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}api/v1/users/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fullName: data.name,
            email: data.email,
            userName: data.username,
            password: data.password,
          }),
        });

        const result = await response.json();
        if (result.message === "User created successfully") {
          localStorage.setItem("token", result.token);
          localStorage.setItem("user", JSON.stringify(result.user));
          toast.success("Registration successful");
          setStage(2);
        } else {
          toast.error(result.message || 'Registration failed');
        }
      } catch (error) {
        toast.error('An error occurred. Please try again.');
      }
    } else {
      toast.error("Passwords don't match");
    }
  };

  const onSubmit2 = async () => {
    if (bio === "" && !avatar) {
      toast.error("Please fill at least one of the fields");
      return;
    }

    const formData = new FormData();
    formData.append('bio', bio);
    if (avatar) {
      formData.append('avatar', avatar);
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}api/v1/users/register-stage-2`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: formData
      });

      const result = await response.json();
      if (result.message === "User updated successfully") {
        localStorage.setItem("user", JSON.stringify(result.user));
        toast.success("Update successful");
        navigate('/');
      } else {
        toast.error(result.message || 'Update failed');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred. Please try again.');
    }
  };

  return (
    <>
      <Navbar1 />
      {stage === 1 ? (
        <div className='w-full pt-10 h-[calc(92vh)] flex justify-center items-center' style={{ backgroundImage: `url(${background})`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
          <form onSubmit={handleSubmit(onSubmit)} className='w-1/4 border-2 border-black rounded-xl py-3 px-10 shadow-2xl  shadow-black'>
            <h2 className='text-2xl text-center font-semibold'>Signup to ManageMate</h2>
            <NavLink to={'/login'} className={`w-full hover:underline`} draggable={false}>
              <p className='text-center my-2 w-full'>Already have an account? Login</p>
            </NavLink>
            <input type="text" placeholder="Enter your full name" {...register('name')} required autoComplete="off" className='w-full my-2 px-2 py-2 border border-black rounded-lg' />
            <input type="text" placeholder="Enter your email" {...register('email')} required autoComplete="off" className='w-full my-2 px-2 py-2 border border-black rounded-lg' />
            <input type="text" placeholder="Enter your username" {...register('username')} required autoComplete="off" className='w-full my-2 px-2 py-2 border border-black rounded-lg' />
            <div className='w-full relative flex items-center'>
              <input type={showPassword ? "text" : "password"} placeholder="Enter your password" {...register('password')} required autoComplete="off" className='w-full my-2 pl-2 py-2 pr-10 border border-black rounded-lg' />
              <p className='absolute right-0 text-sm mr-3'>
                {showPassword ? (
                  <VisibilityIcon className='cursor-pointer' onClick={() => setShowPassword(false)} />
                ) : (
                  <VisibilityOffIcon className='cursor-pointer' onClick={() => setShowPassword(true)} />
                )}
              </p>
            </div>
            <div className='w-full relative flex items-center'>
              <input type={showCpassword ? "text" : "password"} placeholder="Enter your password to confirm" {...register('cpassword')} required autoComplete="off" className='w-full my-2 pl-2 py-2 pr-10 border border-black rounded-lg' />
              <p className='absolute right-0 text-sm mr-3 cursor-pointer'>
                {showCpassword ? (
                  <VisibilityIcon onClick={() => setShowCpassword(false)} />
                ) : (
                  <VisibilityOffIcon onClick={() => setShowCpassword(true)} />
                )}
              </p>
            </div>
            <button type="submit" className='w-full my-2 px-2 py-4 bg-black text-white rounded-xl text-lg font-semibold hover:bg-slate-700'>
              SIGNUP
            </button>
          </form>
        </div>
      ) : (
        <div className='w-full pt-10 h-[calc(92vh)] flex justify-center items-center' style={{ backgroundImage: `url(${background})`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
          <form className='w-3/4 border-2 border-black rounded-xl py-3 px-10 shadow-2xl shadow-black'>
            <div className='flex items-center'>
              <label htmlFor="bio" className='font-semibold'>Write a short bio</label>
              <textarea id="bio" cols="30" rows="5" className='bio w-full my-2 px-2 py-2 border border-black rounded-lg' value={bio} onChange={(e) => setBio(e.target.value)} placeholder='Write a short bio'></textarea>
            </div>
            <div className='flex items-center justify-between mx-6 my-7'>
              <div className='flex flex-col gap-6'>
                <div className='text-2xl font-bold'>Upload your Profile Photo</div>
                <div>
                  <input type="file" accept='image/*' onChange={(e) => {
                    loadFile(e);
                    setAvatar(e.target.files[0]);
                  }} className='fileinput w-[46%] lg:w-[100%]' />
                </div>
                <div>
                  <button type="button" className='bg-slate-600 text-white px-5 py-3 rounded-2xl hover:bg-slate-500' onClick={() => setAvatar(null)}>Remove Profile Photo</button>
                </div>
              </div>
              <div className='p-0'>
                <img src={avatar ? URL.createObjectURL(avatar) : defaultAvatarUrl} id='output10' alt="Avatar Preview" className='myimage2 min-h-4 min-w-4' draggable="false" />
              </div>
            </div>
            <div className='flex justify-between px-10 mt-4 text-lg'>
              <button type="button" onClick={() => {
                setBio("");
                setAvatar(null);
                navigate('/');
              }} className='bg-red-500 hover:bg-red-400 text-white px-3 py-2 rounded-2xl'>Skip for Now</button>
              <button type="button" className='bg-green-500 hover:bg-green-400 text-white px-3 py-2 rounded-2xl' onClick={onSubmit2}>Submit</button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Signup;
