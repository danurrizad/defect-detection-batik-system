import React, { useContext, useState } from 'react'

const UploadGuide = () => {
    const downloadFile = () => {
        const fileUrl = '/download_path/Contoh-File-CSV.csv'; // Sesuaikan dengan path ke file Anda
    
        // Buat elemen anchor untuk memicu unduhan
        const link = document.createElement('a');
        link.href = fileUrl;
        link.setAttribute('download', 'Contoh-File-CSV.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };

      
  return (
    <>
    <div className='bg-heading2 w-2/3 2xl:min-h-[400px] min-h-[250px] rounded-xl shadow-sm shadow-black' style={{fontFamily: "font-inter"}}>
        <div className='p-4 flex flex-col items-center justify-center'>
            <h1 className='text-center text-white font-bold'>Panduan Upload File CSV</h1>
            <img className='w-' src='/img/upload-guide.png'/>
            <button onClick={downloadFile} className='px-4 py-2 bg-green-400 shadow-md hover:bg-green-600 text-white rounded-xl'>Download contoh file CSV</button>
        </div>
    </div>
    </>
  )
}

export default UploadGuide 