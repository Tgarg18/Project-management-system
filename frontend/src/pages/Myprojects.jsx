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
        console.log(data.data);
        setMyProjects(data.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [])
  return (
    <>
      <div className='text-center'>
        Myprojects
      </div>
      <div className='flex flex-col '>
        {
          myProjects.map((project) => (
            <div key={project._id}>
              <NavLink to={`/project/${project._id}`}>
                {project.name}
              </NavLink>
            </div>
          ))
        }
      </div>

    </>
  )
}

export default Myprojects