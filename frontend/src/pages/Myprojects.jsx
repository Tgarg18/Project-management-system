import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import { toast } from "react-toastify";

const Myprojects = () => {
  const [myProjects, setMyProjects] = useState([])

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}api/v1/projects/get-all-my-projects`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data);
        setMyProjects(data.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [])

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

  return (
    <>
      <div className='text-center'>
        My Projects
      </div>
      <div className='flex flex-col justify-center items-center gap-4'>
        {
          myProjects?.length === 0 && <div className='text-center text-white'>No projects found.</div>
        }
        {
          myProjects?.map((project) => (
            <div className={"w-3/5"} key={project._id}>
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

    </>
  )
}

export default Myprojects