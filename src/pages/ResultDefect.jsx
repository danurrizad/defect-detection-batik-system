import React from 'react'

import Header from '../components/Header'

const ResultDefect = ({img}) => {
  return (
    <div className='min-h-screen bg-primary5 font-heading'>
        <Header title="HASIL DETEKSI" />

        {/* CONTENT */}
        <div className='flex justify-center 2xl:pt-0 pt-10'>
            <div className='bg-primary3'>
                <img className='2xl:w-[600px] w-[350px]' src={img}/>
                <div className='p-4 flex justify-center items-center text-white'>Terdeteksi : Batik cacat motif {Math.floor(Math.random() * 100) + 1}%</div>
            </div>
        </div>
    </div>
  )
}

export default ResultDefect