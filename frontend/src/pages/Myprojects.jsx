import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';

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
        setMyProjects(data.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [])

  return (
    <>
      <div className='text-center'>
        My Projects
      </div>
      <div className='flex flex-col justify-center items-center'>
        {
          myProjects?.length === 0 && <div className='text-center text-white'>No projects found.</div>
        }
        {
          myProjects?.map((project) => (
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

    </>
  )
}

export default Myprojects