import React, { useContext } from 'react'

import Header from '../components/Header'
import { Link } from 'react-router-dom'
import { UserContext } from '../components/context/UserContext'
import { verifikasiEmail, emailVerification } from './../firebase';
import { sendEmailVerification } from 'firebase/auth';
import Footer from '../components/Footer';

const Home = () => {

  const { user } = useContext(UserContext )

  // const handleVerifikasiEmail = () =>{
  //   verifikasiEmail('danurrizad242@gmail.com')
  // }

  // const handleVerifikasiEmail2 = (user) =>{
  //   console.log(user)
  //   emailVerification()
  //   // const verif = user.sendEmailVerification()
  //   // console.log(verif)
  // }

  // const daftarAkun = () =>{

  // }

  return (
    <div className='min-h-screen bg-primary0 font-heading flex flex-col justify-between gap-32' >
        <div>
          <Header title="BATIK MANAGEMENT SYSTEM"/>
          {/* Content */}
          <div className='2xl:flex-row xl:flex-row lg:flex-row md:flex-row sm:flex-row flex flex-col items-center justify-center 2xl:gap-40 gap-10 pt-20 px-2'>
          
            {/* PERKIRAAN PENJUALAN */}
            {user ? ( 
              // ADA USER
            <div class="relative 2xl:w-80 xl:w-72 lg:w-64 w-52 2xl:h-48 h-28">
              {/* <div class="rounded-xl absolute 2xl:w-80 w-52 2xl:h-48 h-28 border-black border-2 border-solid bg-primary1 transform translate-x-5 translate-y-5 z-0" ></div> */}
              <Link to="/perkiraan-penjualan">
                <div class="rounded-xl hover:text-white bg-center bg-no-repeat absolute 2xl:w-80 xl:w-72 lg:w-64 w-52 2xl:h-48 xl:h-48 lg:h-40 h-28 border-black border-2 border-solid bg-primary3 transform z-10 flex flex-col justify-center items-center text-black font-bold px-10 text-center 2xl:text-[42px] xl:text-[37px] lg:text-[32px] md:text-[25px] sm:text-[24px] text-[24px] hover:bg-primary2 duration-300" 
                  style={{
                    fontFamily: 'font-neothic',
                    background: "url('/img/batik1.png'), lightgray -280.365px -102.709px / 174.092% 242.515% no-repeat",
                    boxShadow: "13px 13px 4px 4px rgba(0, 0, 0, 0.20)",
                    transition: "background-color 1s"
                  }} 
                  onMouseEnter={(e) => (e.target.style.background = "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/img/batik1.png')")}
                  onMouseLeave={(e) => (e.target.style.background = "url('/img/batik1.png'), lightgray -24.673px -7.532px / 110.918% 191.562% no-repeat")}
                  >PERKIRAAN PENJUALAN</div>
              </Link>
            </div>)
            :(
              // TIDAK ADA USER
            <div class="relative 2xl:w-80 xl:w-72 lg:w-64 w-52 2xl:h-48 h-28">
              {/* <div class="rounded-xl absolute 2xl:w-80 w-52 2xl:h-48 h-28 border-black border-2 border-solid bg-primary1 transform translate-x-5 translate-y-5 z-0"></div> */}
              <div class="rounded-xl  bg-center bg-no-repeat select-none absolute 2xl:w-80 xl:w-72 lg:w-64 w-52 2xl:h-48 xl:h-48 lg:h-40 h-28 cursor-not-allowed border-black border-2 border-solid transform z-10 flex flex-col justify-center items-center text-white px-10 text-center 2xl:text-[42px] xl:text-[37px] lg:text-[32px] md:text-[25px] sm:text-[24px] text-[24px] hover:bg-primary2 duration-300"
                style={{
                  fontFamily: 'font-neothic',
                  backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/img/batik1-lock.png')",
                  boxShadow: "13px 13px 4px 4px rgba(0, 0, 0, 0.20)",
                }}
                  >PERKIRAAN PENJUALAN</div>
              <div class='absolute z-10 cursor-not-allowed select-none'><img className='2xl:w-[45px] xl:w-[45px] lg:w-[40px] md:w-[30px] w-[25px]' src="/img/lock.png"/></div>
            </div>)}
          
            {/* DETEKSI KECACATAN */}
            <div class="relative 2xl:w-80 xl:w-72 lg:w-64 w-52 2xl:h-48 h-28">
              {/* <div class="rounded-xl absolute 2xl:w-80 w-52 2xl:h-48 h-28 border-black border-2 border-solid bg-primary1 transform translate-x-5 translate-y-5 z-0"></div> */}
              <Link to="/deteksi-cacat">
              <div className="rounded-xl hover:text-white bg-cover bg-center bg-no-repeat absolute 2xl:w-80 xl:w-72 lg:w-64 w-52 2xl:h-48 xl:h-48 lg:h-40 h-28 border-black border-2 border-solid transform z-10 flex flex-col justify-center items-center text-black font-bold font-heading px-10 text-center 2xl:text-[42px] xl:text-[37px] lg:text-[32px] md:text-[25px] sm:text-[24px] text-[24px] duration-300"
                  style={{
                    fontFamily: 'font-neothic',
                    background: "url('/img/batik2.png'), lightgray -24.673px -7.532px / 110.918% 191.562% no-repeat",
                    boxShadow: "13px 13px 4px 4px rgba(0, 0, 0, 0.20)",
                    transition: "background-color 1s",
                  }}
                  onMouseEnter={(e) => (e.target.style.background = "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/img/batik2.png')")}
                  onMouseLeave={(e) => (e.target.style.background = "url('/img/batik2.png'), lightgray -24.673px -7.532px / 110.918% 191.562% no-repeat")}
                >
                  DETEKSI KECACATAN
                </div>

              </Link>
            </div>
          </div>
        </div>
        

        <Footer/>
    </div>
  )
}

export default Home