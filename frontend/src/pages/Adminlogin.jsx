import React, { useContext, useState } from 'react'
import { useNavigate,Link } from 'react-router-dom'
import { AdminDataContext } from '../Context/AdminContext'
import axios from 'axios'

const Adminlogin = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    

    const [userData, setUserData] = useState({})
    const navigate = useNavigate()

    const { user, setUser } = useContext(AdminDataContext)


    

    const submitHandler = async (e) => {
        e.preventDefault()

        const admin = {
            
            email: email,
            password: password
        }
        // console.log(userData)
        // console.log("submitted")

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/admin/login`, admin)
        // console.log(response)
        if (response.status === 200) {

            const data = response.data
            // console.log(data)
            setUser(data.user)
            localStorage.setItem('token', data.token)
            // console.log("navigating")
            navigate('/adminhome');

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
                <p className='text-lg text-center'> ?<Link to='/employeelogin' className='text-blue-600 underline'>Login as Employee</Link></p>
            </div>
            {/* <div className='w-full  flex items-center justify-center'>
                
            </div> */}


        </div>
    )
}

export default Adminlogin