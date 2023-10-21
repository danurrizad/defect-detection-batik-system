import React, { useContext, useState } from 'react'
import {authLogin, app} from "../firebase"
import { UserContext } from '../components/UserContext'

const Login = ({setLoadLogin}) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const {user, setUserAndUpdateStorage} = useContext(UserContext)

    const handleClickClose = () =>{
        setLoadLogin(false)
    }

    const handleLogin = async(e) =>{
        e.preventDefault()
        console.log(email, password)
        try {
            const userCred = await authLogin(email, password);
            await setUserAndUpdateStorage(userCred)
            // console.log(user)
            // localStorage.setItem('userLocal', userCred);
            console.log("User login:", user);
            setLoadLogin(false)
          } catch (error) {
            console.error("Error signing in:", error);
          }

    }



  return (
    <>
    <div onClick={handleClickClose} className='bg-slate-200 w-screen h-screen fixed top-0 left-0 z-20 bg-opacity-50 pointer-events-auto'>
        <div onClick={(e) => e.stopPropagation()} className='fixed z-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 min-w-[400px] bg-primary1'>
            <div className='p-4'>
                <h1 className='text-center text-white'>Login Admin</h1>
                <form onSubmit={handleLogin}>
                <div class="mb-4">
                    <label for="email" class="block text-white text-sm font-medium">Email</label>
                    <input
                    type="email"
                    id="email"
                    name="email"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-primary1 focus:ring-opacity-50 focus:outline-none"
                    placeholder="Email"
                    onChange={(e)=>setEmail(e.target.value)}
                    />
                </div>
                <div class="mb-6">
                    <label for="password" class="block text-white text-sm font-medium">Password</label>
                    <input
                    type="password"
                    id="password"
                    name="password"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-primary1 focus:ring-opacity-50 focus:outline-none"
                    placeholder="****"
                    onChange={(e)=>setPassword(e.target.value)}
                    />
                </div>
                <div class="flex items-center justify-between">
                    <button
                    type="submit"
                    class="bg-primary3 text-white px-6 py-2 rounded-md hover:bg-primary2 transition duration-300"
                    >
                    Login
                    </button>
                    <a href="#" class="text-sm text-white">Reset Password?</a>
                </div>
                </form>
            </div>
        </div>
    </div>
    </>
  )
}

export default Login