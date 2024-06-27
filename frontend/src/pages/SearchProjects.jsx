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
                <div key={project._id}>
                  <NavLink to={`/project/${project._id}`}>
                    {project.name}
                  </NavLink>
                </div>
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