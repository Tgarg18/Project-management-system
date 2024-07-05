import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const AssignTasks = () => {

  const [taskDes, setTaskDes] = useState("")
  const [taskTitle, setTaskTitle] = useState("")
  const [assignTo, setAssignTo] = useState("")
  const [projectMemberList, setProjectMemberList] = useState([])
  const projectId = useParams().projectId

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}api/v1/projects/get-project-by-id/${projectId}`,
      {
        method: "GET",
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setProjectMemberList(data.data.members)
      })
  }, [])

  const assignTask = () => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}api/v1/tasks/create-task`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        assignedIn:projectId,
        title:taskTitle,
        description:taskDes,
        assignedTo:assignTo
      })
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  return (
    <div className='px-10'>
      <div className='flex items-center w-full'>
        <label htmlFor="taskTitle" className='w-1/6'>Title</label>
        <input type="text" placeholder="Enter task title" value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} required autoComplete="off" className='w-5/6 my-2 px-2 py-2 border border-black rounded-lg text-gray-700' />
      </div>

      <div className='flex items-center w-full'>
        <label htmlFor="taskDes" className='w-1/6'>Description</label>
        <textarea id="taskDes" cols="30" rows="5" className='bio w-5/6 my-2 px-2 py-2 border border-black rounded-lg text-gray-700' value={taskDes} onChange={(e) => setTaskDes(e.target.value)} placeholder='Write a short task description'></textarea>
      </div>

      <div className='flex items-center w-full'>
        <label htmlFor="taskDes" className='w-1/6'>Assign Task To</label>
        <select name="assignTo" id="assignTo" className='w-5/6 my-2 px-2 py-2 border border-black rounded-lg text-gray-600' value={assignTo} onChange={(e) => setAssignTo(e.target.value)}>
          <option value="dummy" className='bg-black text-gray-600' hidden>Select User</option>
          {
            projectMemberList &&
            projectMemberList.map((member) => {
              return (
                <option key={member._id} value={member._id} className='bg-white text-gray-600 font-semibold'>{member.userName}</option>
              )
            })
          }
        </select>
      </div>
          <div className='flex justify-center items-center'>
      <button className='my-2 px-3 py-2 border border-black rounded-lg bg-green-500' onClick={assignTask}>Assign Task</button>
          </div>
    </div>
  )
}

export default AssignTasks