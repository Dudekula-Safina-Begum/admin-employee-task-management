import React from 'react'
import  { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useContext } from 'react'
import { EmployeeDataContext } from '../Context/EmployeeContext'

const EmployeeRegister = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [fullname, setFullname] = useState('')

    const [userData, setUserData] = useState({})
    const navigate = useNavigate()

    const { user, setUser } = useContext( EmployeeDataContext)

    const submitHandler = async (e) => {
        e.preventDefault()

        const newadmin = {
            fullname: fullname,
            email: email,
            password: password
        }
        // console.log(userData)
        // console.log("submitted")

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/employee/register`, newadmin)
        console.log(response)
        if (response.status === 201) {

            const data = response.data
            // console.log(data)
            setUser(data.user)
            localStorage.setItem('token', data.token)
            // console.log("navigating")
            navigate('/employeelogin');

            // navigate('/home')

        }

        setFullname('')

        setEmail('')
        setPassword('')


    }
    return (
        <div className='p-7 h-screen w-screen flex items-center  justify-center'>
            <div className='rounded-lg bg-slate-400  p-10' >
                <form action="" onSubmit={(e) =>
                    submitHandler(e)
                }> 

                    <h3 className='text-xl mb-2'>what's your name</h3>
                    <div className='flex gap-2'>
                        <input value={fullname}
                            onChange={(e) => {
                                setFullname(e.target.value)

                            }}




                            required
                            className='bg-[#eeeeee] mb-7 rounded px-2 py-2 w-full border  text-lg placeholder:text-base '

                            type="text" placeholder='Fullname' />

                    </div>

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
                    <button className='bg-black text-white w-full font-semibold text-lg rounded py-2 mb-2'>Sign-Up</button>


                </form>
                <p className='text-lg text-center'>Already have a account ?<Link to='/employeelogin' className='text-blue-700'>Login here</Link></p>
            </div>
            {/* <div className='w-full  flex items-center justify-center'>
                
            </div> */}


        </div>
    )
}

export default EmployeeRegister