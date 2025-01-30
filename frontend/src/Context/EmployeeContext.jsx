import React, { createContext, useState } from 'react'

export const EmployeeDataContext=createContext()

const EmployeeContext = ({children}) => {
 
    const [user, setUser] = useState({
        email:'',
        fullName:''
    })
  return (
    <div>
        < EmployeeDataContext.Provider value={{user,setUser}}>{children}</ EmployeeDataContext.Provider>
    </div>
  )
  
}

export default EmployeeContext
