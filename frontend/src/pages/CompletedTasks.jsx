import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const CompletedTasks = () => {
    const [taskList, setTaskList] = useState([])
    const projectId = useParams().projectId

    useEffect(() => {
      fetch(`${import.meta.env.VITE_BACKEND_URL}api/v1/tasks/getAllCompletedTasksInProject/${projectId}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setTaskList(data.data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }, [])

    const markAsIncomplete = (taskId) => {
      fetch(`${import.meta.env.VITE_BACKEND_URL}api/v1/tasks/mark-as-incomplete`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ taskId }),
      })
        .then((response) => response.json())
        .then((data) => {
          setTaskList(data.data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }

  return (
    <div className='w-full flex flex-col items-center gap-4 mt-5'>
      {taskList.length > 0 && taskList
      .reverse()
      .map((task) => (
        <div key={task._id} className='border w-1/2 px-3 py-2'>
          <h2>{task.title}</h2>
          <p>Description: {task.description}</p>
          <p>Status: Completed</p>
          <div className='flex justify-center items-center'>
          <button className='bg-red-500 text-white px-3 py-1 rounded-xl' onClick={() => markAsIncomplete(task._id)}>Mark as Incomplete</button>
          </div>
        </div>
      ))}
      {taskList.length === 0 && <p>No completed tasks found</p>}
    </div>
  )
}

export default CompletedTasks