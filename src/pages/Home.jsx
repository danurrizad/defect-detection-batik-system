import React from 'react'

import Header from '../components/Header'
import { Link } from 'react-router-dom'

const Home = ({user, setUser}) => {

  return (
    <div className='min-h-screen bg-primary5 font-heading'>
        <Header title="BATIK MANAGEMENT SYSTEM" user={user} setUser={setUser}/>

        {/* Content */}
        <div className='2xl:flex-row flex flex-col items-center justify-center 2xl:gap-40 gap-10 pt-20 px-2'>

          {/* PERKIRAAN PENJUALAN */}
          {user == "ADMIN" ? (
          <div class="relative 2xl:w-80 w-52 2xl:h-48 h-28">
            <div class="absolute 2xl:w-80 w-52 2xl:h-48 h-28 border-black border-2 border-solid bg-primary1 transform translate-x-5 translate-y-5 z-0"></div>
            <Link to="/perkiraan-penjualan">
              <div class="absolute 2xl:w-80 w-52 2xl:h-48 h-28 border-black border-2 border-solid bg-primary3 transform z-10 flex flex-col justify-center items-center text-white font-heading px-10 text-center 2xl:text-[24px] text-[14px] hover:bg-primary2 duration-300">PERKIRAAN PENJUALAN</div>
            </Link>
          </div>)
          :(
          <div class="relative 2xl:w-80 w-52 2xl:h-48 h-28">
            <div class="absolute 2xl:w-80 w-52 2xl:h-48 h-28 border-black border-2 border-solid bg-primary1 transform translate-x-5 translate-y-5 z-0"></div>
            <div class=" select-none absolute 2xl:w-80 w-52 2xl:h-48 h-28 cursor-not-allowed border-black border-2 border-solid bg-primary2 transform z-10 flex flex-col justify-center items-center text-white font-heading px-10 text-center 2xl:text-[24px] text-[14px] hover:bg-primary2 duration-300">PERKIRAAN PENJUALAN</div>
            <div class='absolute z-20 cursor-not-allowed select-none'><img className='2xl:w-[50px] w-[25px]' src="/img/lock.png"/></div>
          </div>)}

          {/* DETEKSI KECACATAN */}
          <div class="relative 2xl:w-80 w-52 2xl:h-48 h-28">
            <div class="absolute 2xl:w-80 w-52 2xl:h-48 h-28 border-black border-2 border-solid bg-primary1 transform translate-x-5 translate-y-5 z-0"></div>
            <Link to="/deteksi-cacat">
              <div class="absolute 2xl:w-80 w-52 2xl:h-48 h-28 border-black border-2 border-solid bg-primary3 transform z-10 flex flex-col justify-center items-center text-white font-heading px-10 text-center 2xl:text-[24px] text-[14px] hover:bg-primary2 duration-300">DETEKSI KECACATAN</div>
            </Link>
          </div>
        </div>
        <div>
        </div>
    </div>
  )
}

export default Home