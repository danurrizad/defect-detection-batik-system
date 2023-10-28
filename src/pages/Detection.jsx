import React, { useState } from 'react'
import Header from '../components/Header'
import WebcamYOLOComponent from '../components/WebcamScanner'

const Detection = ({ img, setImg }) => {

  return (
    <div className='min-h-screen bg-primary5 font-heading'>
      <Header title="DETEKSI KECACATAN" />

      {/* Content */}
      <div className='flex justify-center 2xl:pt-0 pt-10'>
        {/* <div className='bg-white p-2 2xl:h-[538px] h-[350px] w-fit'> */}
          <WebcamYOLOComponent/>
        {/* </div> */}
      </div>
    </div>
  )
}

export default Detection
