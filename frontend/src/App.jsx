import { useState } from 'react'
import {Route,Routes} from 'react-router-dom'

import './App.css'
import RegisterAdmin from './pages/RegisterAdmin'
import Adminlogin from './pages/Adminlogin'
import Adminhome from './pages/Adminhome'
import Employeelogin from './pages/Employeelogin'
import Employeehome from './pages/Employeehome'
import EmployeeRegister from './pages/EmployeeRegister'

import Taskform from './pages/Taskform'

function App() {
  

  return (
    <Routes>

      <Route path='/' element={<RegisterAdmin/>}/>
      <Route path='/login' element={<Adminlogin/>}/>
      <Route path='/adminhome' element={<Adminhome/>} />
      <Route path='/task-form' element={<Taskform/>} />
      <Route path='employeeregister' element={<EmployeeRegister/>} />
      <Route path='/employeelogin' element={<Employeelogin/>} />
      <Route path='/employeehome' element={<Employeehome/>} />
    </Routes>
  )
}

export default App
