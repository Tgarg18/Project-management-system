import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

const SearchProjects = () => {

  const [allProjects, setAllProjects] = useState([])
  const [searchQuery, setSearchQuery] = useState("")

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
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}api/v1/projects/get-all-projects`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
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
      <div className='flex flex-col items-center'>
        {
          (searchQuery != "") ?
            (allProjects
              .filter((project) => project.name.toLowerCase().includes(searchQuery.toLowerCase()) || project.name.toLowerCase().includes(searchQuery.toLowerCase()))
              .map((project) => (
                <div key={project._id} className='flex flex-col items-center w-3/5 justify-center py-3 border hover:rounded-xl'>
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
                  <div>
                    <NavLink to={`/project/${project._id}`} className={`bg-green-400 py-2 px-3 rounded-xl hover:opacity-80`} draggable="false">View Project</NavLink>
                    {
                      (project.leader._id == JSON.parse(localStorage.getItem("user"))._id) ?
                        null
                        :
                        (
                          (project.members.some((member) => member._id == JSON.parse(localStorage.getItem("user"))._id)) ?
                            <button className={`bg-green-400 py-2 px-3 rounded-xl hover:opacity-80`} onClick={() => leaveProject(project._id)}>Leave Project</button>
                            :
                            project.leader._id == JSON.parse(localStorage.getItem("user"))._id ?
                              null
                              :
                              <button className={`bg-green-400 py-2 px-3 rounded-xl hover:opacity-80`} onClick={() => joinProject(project._id)}>Join Project</button>
                        )
                    }
                  </div>
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