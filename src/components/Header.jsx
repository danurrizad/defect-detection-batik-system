import React, { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Login from '../pages/Login'
import { authLogout } from '../firebase'
import { UserContext } from './UserContext'

const Header = (props) => {
  const [loadLogin, setLoadLogin] = useState(false)
  const navigate = useNavigate();

  const { user, setUserAndUpdateStorage} = useContext(UserContext)

  const handleGoBack = () =>{
    navigate(-1);
  }

  // -------------------------------------DUMMY-----------------------------------------
  const handleLogin = () => {
    setLoadLogin(true)
  }

  const handleLogout = async() =>{
    await authLogout();
    localStorage.removeItem('userDataContext');
    await setUserAndUpdateStorage(null)
    alert("Berhasil logout")
    // console.log("Setelah logout USER :", user);
  }
  // -------------------------------------/DUMMY-----------------------------------------



  return (
    <div>
        <div className='bg-primary5 grid grid-cols-8 2xl:gap-10 items-center 2xl:p-10 p-2 relative z-10'>
            <div className='col-start-1 col-end-3 flex items-center justify-start 2xl:gap-10 gap-4'>
              {props.title != "BATIK MANAGEMENT SYSTEM" ? (
                <button onClick={handleGoBack}>
                  <img className='2xl:w-24 w-6' src='/img/back.png'/>
                </button>
              ):null}
              
              <Link to="/">
                <div className=' cursor-pointer flex flex-col justify-center items-center'>
                  <img className=' bg-primary1 2xl:w-24 w-12 2xl:h-24 h-12 text-[8px] text-white rounded-full flex flex-col justify-center items-center' src="/img/logo-app.png" alt="LOGO"/>
                </div>
              </Link>
            </div>
            <h1 className='col-start-3 col-end-7 2xl:text-[47px] text-[18px] text-center font-heading '>{props.title}</h1>
            <div className='col-start-7 col-span-2 flex justify-end'>
              {/* {props.user || userLocal ? <button onClick={handleLogout} className='bg-primary2 text-white 2xl:text-[16px] text-[12px] 2xl:w-24 w-14 2xl:py-2 py-1'>Logout</button> :
              <button onClick={handleLogin} className='bg-primary2 text-white 2xl:text-[16px] text-[12px] 2xl:w-24 w-14 2xl:py-2 py-1'>Login</button>} */}
              {user && <button onClick={handleLogout} className='bg-primary2 text-white 2xl:text-[16px] text-[12px] 2xl:w-24 w-14 2xl:py-2 py-1'>Logout</button>}
              {!user && <button onClick={handleLogin} className='bg-primary2 text-white 2xl:text-[16px] text-[12px] 2xl:w-24 w-14 2xl:py-2 py-1'>Login</button>}
            </div>
        </div>
        {loadLogin && <Login setLoadLogin={setLoadLogin}/>}
    </div>
  )
}

export default Header