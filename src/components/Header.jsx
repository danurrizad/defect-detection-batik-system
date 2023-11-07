import React, { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Login from '../pages/Login'
import { authLogout } from '../firebase'
import { UserContext } from './context/UserContext'

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
        <div className='bg-primary0 grid grid-cols-10 2xl:gap-10 items-center 2xl:p-10 xl:p-10 lg:p-10 md:p-4 p-2 relative z-10' style={{fontFamily: "font-inter"}}>
            {/* LOGO / BACK BUTTON */}
            <div className='col-start-1 col-end-3 flex items-center justify-start 2xl:gap-10 gap-4'>
              {props.title != "BATIK MANAGEMENT SYSTEM" ? (
                <button className='bg-secondary1 hover:bg-secondary0 duration-300 flex items-center justify-between gap-2 text-white py-2 2xl:px-6 xl:px-6 lg:px-6 md:px-6 sm:px-4 px-2 rounded-xl' onClick={handleGoBack}>
                  <img className='w-3' src='/img/back.png'/>
                  Back
                </button>
              ):(
                <Link to="/">
                  <div className=' cursor-pointer flex flex-col justify-center items-center'>
                    <img className=' bg-primary1 2xl:w-24 xl:w-24 lg:w-24 md:w-24 w-12 2xl:h-24 xl:h-24 lg:h-24 h-fit  text-[8px] text-white rounded-full flex flex-col justify-center items-center' src="/img/logo-app.png" alt="LOGO"/>
                  </div>
                </Link>
              )}  
            </div>

            {/* HEADING TITLE */}
            <h1 className='col-start-3 col-end-9 2xl:text-[72px] xl:text-[62px] lg:text-[52px] md:text-[42px] sm:text-[33px] text-[33px] text-center gradient-text bg-clip-text text-transparent bg-gradient-to-r from-heading1 to-heading2 drop-shadow-2xl ' style={{fontFamily: 'font-upakarti'}}>{props.title}</h1>
            
            {/* BUTTON LOGIN */}
            <div className='col-start-9 col-span-2 flex justify-end '>
              {/* {props.user || userLocal ? <button onClick={handleLogout} className='bg-primary2 text-white 2xl:text-[16px] text-[12px] 2xl:w-24 w-14 2xl:py-2 py-1'>Logout</button> :
              <button onClick={handleLogin} className='bg-primary2 text-white 2xl:text-[16px] text-[12px] 2xl:w-24 w-14 2xl:py-2 py-1'>Login</button>} */}
              {user && <button onClick={handleLogout} className='bg-secondary1 hover:bg-secondary0 duration-300 rounded-xl shadow-xl text-white 2xl:text-[16px] xl:text-[16px] lg:text-[16px] md:text-[16px] text-[12px] 2xl:w-24 xl:w-24 lg:w-24 md:w-24 sm:w-20 w-14 py-2'>Logout</button>}
              {!user && <button onClick={handleLogin} className='bg-secondary1 hover:bg-secondary0 duration-300 rounded-xl shadow-xl text-white 2xl:text-[16px] xl:text-[16px] lg:text-[16px] md:text-[16px] text-[12px] 2xl:w-24 xl:w-24 lg:w-24 md:w-24 sm:w-20 w-14 py-2'>Login</button>}
            </div>
        </div>
        {loadLogin && <Login setLoadLogin={setLoadLogin}/>}
    </div>
  )
}

export default Header