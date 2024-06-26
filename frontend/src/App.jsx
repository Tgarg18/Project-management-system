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
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Home />}>
            <Route path='' element={<ProjectDashboard/>}>
              <Route path='' element={<Myprojects />} />
              <Route path='search-projects' element={<SearchProjects />} />
            </Route>
            <Route path='myprofile' element={<MyProfile />} />
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