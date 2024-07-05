import { useState, useEffect } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Home from './pages/Home'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MyProfile from './pages/MyProfile'
import Myprojects from './pages/Myprojects'
import SearchProjects from './pages/SearchProjects'
import ProjectDashboard from './pages/ProjectDashboard'
import CreateProject from './pages/CreateProject'
import OthersProfile from './pages/OthersProfile'
import Project from './pages/Project'
import AssignTasks from './pages/AssignTasks'
import CompletedTasks from './pages/CompletedTasks'
import MyTasks from './pages/MyTasks'
import EditProfile from './pages/EditProfile'
import ChangePassword from './pages/ChangePassword'
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Home />}>
            <Route path='' element={<ProjectDashboard />}>
              <Route path='' element={<Myprojects />} />
              <Route path='search-projects' element={<SearchProjects />} />
              <Route path='create-project' element={<CreateProject />} />
            </Route>
            <Route path='myprofile' element={<MyProfile />} />
            <Route path='edit-profile' element={<EditProfile />} />
            <Route path='change-password' element={<ChangePassword />} />
            <Route path='user-profile/:userid' element={<OthersProfile />} />
            <Route path='/project/:projectId/' element={<Project />} >
              <Route path='assign-tasks' element={<AssignTasks />} />
              <Route path='completed-tasks' element={<CompletedTasks />} />
              <Route path='my-tasks' element={<MyTasks />} />
            </Route>
          </Route>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </>
  )
}

export default App