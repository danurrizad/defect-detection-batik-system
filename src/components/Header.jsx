import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Header = (props) => {
  const navigate = useNavigate();

  const handleGoBack = () =>{
    navigate(-1);
  }

  // -------------------------------------DUMMY-----------------------------------------
  const handleLogin = () => {
    if(props.user == "PEGAWAI"){
      props.setUser("ADMIN")
    }
    else if(props.user == "ADMIN"){
      props.setUser("PEGAWAI")
    }
  }
  // -------------------------------------/DUMMY-----------------------------------------


  return (
    <div>
        <div className='bg-primary5 grid grid-cols-8 2xl:gap-10 items-center 2xl:p-10 p-2 '>
            <div className='col-start-1 col-end-3 flex items-center justify-start 2xl:gap-10 gap-4'>
              {props.title != "BATIK MANAGEMENT SYSTEM" ? (
                <button onClick={handleGoBack}>
                  <img className='2xl:w-24 w-6' src=' ./src/assets/img/back.png'/>
                </button>
              ):null}
              
              <Link to="/">
                <div className=' cursor-pointer flex flex-col justify-center items-center'>
                  <img className=' bg-primary1 2xl:w-24 w-12 2xl:h-24 h-12 text-[8px] text-white rounded-full flex flex-col justify-center items-center' src="" alt="LOGO"/>
                </div>
              </Link>
            </div>
            <h1 className='col-start-3 col-end-7 2xl:text-[47px] text-[18px] text-center font-heading '>{props.title}</h1>
            <div className='col-start-7 col-span-2 flex justify-end'>
              <button onClick={handleLogin} className='bg-primary2 text-white 2xl:text-[16px] text-[12px] 2xl:w-24 w-14 2xl:py-2 py-1'>{props.user == "PEGAWAI" ? <span>Login</span> : <span>Logout</span>}</button>
            </div>
        </div>
    </div>
  )
}

export default Header