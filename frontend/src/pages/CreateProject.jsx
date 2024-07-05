import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from "react-toastify";

const CreateProject = () => {
  const [projectName, setProjectName] = useState("");
  const [projectDes, setProjectDes] = useState("");
  const [projectPhoto, setProjectPhoto] = useState(null);
  const defaultProjectPhotoUrl = "https://res.cloudinary.com/wittywebcloud/image/upload/v1719397844/iwlo5fenek8ltimtyu5o.jpg";
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    if (projectName === "" || projectDes === "") {
      toast.error("Please fill all the fields");
      return;
    }
    const formData = new FormData;
    formData.append('name', projectName);
    formData.append('description', projectDes);
    if (projectPhoto) {
      formData.append('projectPhoto', projectPhoto);
    }
    fetch(`${import.meta.env.VITE_BACKEND_URL}api/v1/projects/create-project`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
      body: formData
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Project created successfully") {
          setProjectName("");
          setProjectDes("");
          setProjectPhoto(null);
          toast.success("Project created successfully");
          navigate('/');
        } else {
          toast.error(data.message);
        }
      })
      .catch((error) => {
        toast.error("An error occurred. Please try again");
        console.error("Error:", error);
      });
  }

  const loadFile = (event) => {
    const output = document.getElementById('output10');
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = () => URL.revokeObjectURL(output.src);
  };

  return (
    <>
      <div className='w-full mt-10 flex justify-center items-center'>
        <form className='w-3/4 border-2 border-black rounded-xl py-3 px-10 shadow-2xl shadow-black'>
          <div className='flex items-center w-full'>
            <label htmlFor="projectName" className='font-semibold w-1/4'>Project Name</label>
            <input type="text" id="projectName" className='w-3/4 my-2 px-2 py-2 text-black border border-black rounded-lg' placeholder='Wrtie your project name' value={projectName} onChange={(e) => setProjectName(e.target.value)} />
          </div>
          <div className='flex items-center w-full'>
            <label htmlFor="bio" className='font-semibold w-1/4'>Write a short Description</label>
            <textarea id="bio" cols="30" rows="5" className='bio w-3/4 my-2 px-2 py-2 border text-black border-black rounded-lg' value={projectDes} onChange={(e) => setProjectDes(e.target.value)} placeholder='Write a short description'></textarea>
          </div>
          <div className='flex items-center justify-between mx-6 my-7'>
            <div className='flex flex-col gap-6'>
              <div className='text-2xl font-bold'>Upload Project Photo</div>
              <div>
                <input type="file" accept='image/*' onChange={(e) => {
                  loadFile(e);
                  setProjectPhoto(e.target.files[0]);
                }} className='fileinput w-[46%] lg:w-[100%] text-gray-600' />
              </div>
              <div>
                <button type="button" className='bg-slate-600 text-white px-5 py-3 rounded-2xl hover:bg-slate-500' onClick={() => setProjectPhoto(null)}>Remove Project Photo</button>
              </div>
            </div>
            <div className='p-0'>
              <img src={projectPhoto ? URL.createObjectURL(projectPhoto) : defaultProjectPhotoUrl} id='output10' alt="Project Photo Preview" className='myimage2 min-h-4 min-w-4' draggable="false" />
            </div>
          </div>
          <div className='flex justify-center px-10 mt-4 text-lg'>
            <button type="button" className='bg-green-500 hover:bg-green-400 text-white px-3 py-2 rounded-2xl' onClick={onSubmit}>Submit</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default CreateProject