import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

const SearchProjects = () => {
  const [allProjects, setAllProjects] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}api/v1/projects/get-all-projects`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data);
        setAllProjects(data.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [searchQuery])
  return (
    <>
      <div className='flex flex-col items-center justify-center my-5 gap-3'>
        <div>
          SearchProjects
        </div>
        <input type="text" placeholder="Search projects..." className='w-1/2 text-gray-800 px-3 py-2' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
      </div>
      <div className=''>
        {
          (searchQuery != "") ?
            (allProjects
              .filter((project) => project.name.toLowerCase().includes(searchQuery.toLowerCase()) || project.name.toLowerCase().includes(searchQuery.toLowerCase()))
              .map((project) => (
                <NavLink to={`/project/${project._id}`} draggable="false" className={"w-3/5"} key={project._id}>
                  <div key={project._id} className='flex flex-col items-center justify-center py-3 border hover:rounded-xl'>
                    <div className='flex justify-center items-center gap-4'>
                      <img src={project.projectPhoto} className='w-16 h-16 rounded-[50%] object-cover object-center' alt="" />
                      {project.name}
                      <div className='text-center text-2xl'>
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
            )
            :
            <div className='flex justify-center items-center h-full'>Search the projects</div>
        }
      </div>
    </>
  )
}

export default SearchProjects