import React, { useEffect, useState } from 'react'

const MyTasks = () => {
  const [taskList, settaskList] = useState([]);

  const markAsCompleted = (taskId) => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}api/v1/tasks/mark-as-completed`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ taskId }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data);
        settaskList(data.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}api/v1/tasks/get-my-tasks`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data);
        settaskList(data.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [])

  return (
    <div>
      <div className='w-full flex flex-col items-center gap-4 mt-5'>
        {taskList.reverse()
          .filter((task) => task.status == "in_progress")
          .map((task) => (
            <div key={task._id} className='border w-1/2 px-3 py-2'>
              <div className='font-semibold'>{task.title}</div>
              <div>Description: {task.description}</div>
              <div>Status: In Progress</div>
              <div className='flex justify-center items-center'>
                <button className='bg-blue-500 text-white px-3 py-1 rounded-xl' onClick={() => markAsCompleted(task._id)}>Mark as Completed</button>
              </div>
            </div>
          ))}
        {
          taskList
            .reverse()
            .filter((task) => task.status === "completed")
            .map((task) => (
              <div key={task._id} className='border w-1/2'>
                <div className='font-semibold'>{task.title}</div>
                <div>Description: {task.description}</div>
                <div>Status: Completed</div>
              </div>
            ))
        }
      </div>
    </div>
  )
}

export default MyTasks