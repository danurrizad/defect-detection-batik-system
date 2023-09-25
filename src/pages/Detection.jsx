import React, { useState } from 'react'

import Header from '../components/Header'
import CameraScanner from '../components/CameraScanner'



const Detection = ({img, setImg, user, setUser}) => {

  return(
    <div className='min-h-screen bg-primary5 font-heading'>
        <Header title="DETEKSI KECACATAN" user={user} setUser={setUser}/>

        {/* Content */}
        <div className='flex justify-center 2xl:pt-0 pt-10'>
          <div className='bg-white p-2 2xl:h-[538px] h-[350px] w-fit'>
            <CameraScanner img={img} setImg={setImg}/>
          </div>
        </div>
    </div>
  )
  
  // // Ketika ada image dimasukkan
  // return (
  //   <>
  //   <div className='min-h-screen bg-primary5'>
  //     <Header title="DETEKSI KECACATAN"/>

  //     {/* Content */}
  //     <div className='flex flex-col justify-center items-center gap-10 p-2'>
  //       <div className='relative' style={{ overflow: 'hidden' }}>
  //         {isScanning ? <ScanAnimation/> : null}
  //         <img height="300px" width='600px' src={img} className='z-0'/>
  //       </div>
        
  //       <div className=''>
  //         <button onClick={cekImage} className='px-10 py-1 bg-primary2 text-white rounded-xl hover:bg-primary1'>Scan</button>
  //       </div>
  //     </div>
  //   </div>
  // </>
  // )

  
}



export default Detection