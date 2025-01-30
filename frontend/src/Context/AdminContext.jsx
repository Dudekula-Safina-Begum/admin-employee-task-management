import React, { createContext, useState } from 'react'

export const AdminDataContext=createContext()

const AdminContext = ({children}) => {
    const [user, setUser] = useState({
        email:'',
        fullName:''
    })
  return (
    <div>
        <AdminDataContext.Provider value={{user,setUser}}>{children}</AdminDataContext.Provider>
    </div>
  )
}

export default AdminContext