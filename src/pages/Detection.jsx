import React, { useState } from 'react'
import Header from '../components/Header'
import WebcamYOLOComponent from '../components/WebcamScanner5'
import Footer from '../components/Footer'

const Detection = () => {

  return (
    <div className='min-h-screen bg-primary0 font-heading flex flex-col justify-between gap-32' style={{fontFamily: "font-inter"}}>
      <main>
        <Header title="DETEKSI KECACATAN" />

        <div className='absolute w-screen bottom-0 z-0'>
          <div className='flex justify-between'>
              <img className=' w-1/6 h-fit transform rotate-[15deg] rounded-2xl bg-lightgray filter blur-[5px] bottom-0 mb-0'  src='img/batik-bg1.png'/>
              <img className='w-1/6 h-fit transform -rotate-[15deg] rounded-2xl bg-lightgray filter blur-[5px] mb-[20px]'  src='img/batik-bg2.png'/>
          </div>
        </div>
        
        {/* Content */}
        <div className='flex justify-center 2xl:pt-0 pt-10'>
          {/* <div className='bg-white p-2 2xl:h-[538px] h-[350px] w-fit'> */}
            <WebcamYOLOComponent/>
          {/* </div> */}
        </div>
      </main>
      <Footer/>
    </div>
  )
}

export default Detection
