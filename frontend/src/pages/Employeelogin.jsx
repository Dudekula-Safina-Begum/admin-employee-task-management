import React, { useContext, useState } from 'react'
import { useNavigate,Link } from 'react-router-dom'

import axios from 'axios'
import { EmployeeDataContext } from '../Context/EmployeeContext'

const Employeelogin = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    

    const [userData, setUserData] = useState({})
    const navigate = useNavigate()

    const { user, setUser } = useContext(EmployeeDataContext)

    const submitHandler = async (e) => {
        e.preventDefault()

        const employee = {
            
            email: email,
            password: password
        }
        // console.log(userData)
        // console.log("submitted")

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/employee/login`, employee)
        console.log(response)
        if (response.status === 200) {

            const data = response.data
            console.log(data)
            setUser(data.user)
            localStorage.setItem('token', data.token)
            console.log("navigating")
            navigate('/employeehome');

            // navigate('/home')

        }

      

        setEmail('')
        setPassword('')


    }
    return (
        <div className='p-7 h-screen w-screen flex items-center  justify-center'>
            <div className='rounded-lg bg-slate-400  p-10' >
                <form action="" onSubmit={(e) =>
                    submitHandler(e)
                }> 

                    

                    <h3 className='text-xl mb-2'>what's your email</h3>
                    <input
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value)
                        }}

                        required
                        className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base '
                        type="email" placeholder='email@example.com'
                    />
                    <h3 className='text-xl mb-2'>Enter password</h3>
                    <input
                        value={password}
                        required

                        onChange={(e) => {
                            setPassword(e.target.value)
                        }}



                        className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base ' type="password" name="password" id="" placeholder='....' />
                    <button className='bg-black text-white w-full font-semibold text-lg rounded py-2 mb-2'>login</button>


                </form>
                <p className='text-lg text-center'>new a account ?<Link to='/employeeregister' className='text-blue-600 underline'>register as Employee</Link></p>
                <p className='text-lg text-center'>Login as Admin ?<Link to='/login' className='text-blue-600 underline'>Login as Admin</Link></p>
            </div>
            {/* <div className='w-full  flex items-center justify-center'>
                
            </div> */}


        </div>
    )
}

export default Employeelogin