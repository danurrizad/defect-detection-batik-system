import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'

import Header from '../components/Header'
import ScanAnimation from '../components/ScanAnimation'

const ScanDefect = ({img, setImg, user, setUser}) => {
    const [isScanning, setIsScanning] = useState(false)
    const navigate = useNavigate()
  
  const cekImage = () => {
    if(isScanning == true){
      setIsScanning(false)
    }
    if(isScanning == false){
      setIsScanning(true)
    }
    console.log(img)
    console.log(isScanning)
  }


  const delay = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  };
  
  // Gunakan dalam sebuah fungsi async
  const delayAndExecute = async () => {
    console.log('Mulai');
    await delay(4000); // Menunda selama 4 detik
    console.log('Setelah menunggu 4 detik');
  };
  

  const scanImage = async() => {
    if(isScanning == false){
      setIsScanning(true)
      console.log("sebelum", isScanning)
      await delayAndExecute()
      console.log("sesudah", isScanning)
      setIsScanning(false)
      navigate("/hasil-deteksi")
    }
  }

  return (
    <>
    <div className='min-h-screen bg-primary5 font-heading'>
      <Header title="DETEKSI KECACATAN" user={user} setUser={setUser}/>

      {/* Content */}
      <div className='flex flex-col justify-center items-center gap-10 p-2 2xl:pt-0 pt-10'>
        <div className='relative' style={{ overflow: 'hidden' }}>
          {isScanning ? <ScanAnimation/> : null}
          {img ? <img  src={img} className='z-0 2xl:w-[600px] w-[350px]'/> :(
            <div className='text-center'>Tidak ada citra yang tertampil, mohon ulangi <Link className='underline font-bold hover:text-primary2' to="/deteksi-cacat">masukkan citra</Link></div>
          )}
        </div>
        
        <div className=''>
          {img ? <button onClick={scanImage} className='px-10 py-1 bg-primary2 text-white rounded-xl hover:bg-primary1'>Scan</button> : null}
        </div>
      </div>
    </div>
    </>
  )
}

export default ScanDefect