import React, { useRef, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';


const CameraScanner = ({img, setImg}) => {
  const webcamRef = useRef(null);
  const navigate = useNavigate();

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImg(imageSrc)
    navigate("/scan-cacat")
  }, []);

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Memeriksa apakah file adalah gambar
      if (file.type.includes('image')) {
        const imageUrl = URL.createObjectURL(file);
        setImg(imageUrl);
        navigate("/scan-cacat")
      } else {
        alert('File harus berupa gambar (JPEG, PNG)');
      }
    }
  };
  

  
  return (
    <div className='flex flex-col justify-end border-10 border-black border-solid'>
      <div className='flex justify-center 2xl:w-[600px] w-[350px] 2xl:h-[450px] h-[260px]'>
        <Webcam className='2xl:w-[600px] w-[350px] 2xl:h-[450px] h-[260px]'
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/png"
        />
      </div>
      <div className='flex justify-center gap-10 my-4'>
        <button className='px-4 py-1 bg-primary2 text-white rounded-xl hover:bg-primary1' onClick={capture}>Capture Photo</button>
        <label for="fileInput" class="relative cursor-pointer bg-blue-500 text-white py-2 px-4 rounded-xl shadow-md hover:bg-blue-600 transition duration-300 ease-in-out">
            <span>Select a file</span>
            <input type="file" accept="image/jpeg, image/png" id="fileInput" class="opacity-0 absolute inset-0 cursor-pointer " onChange={handleFileInputChange}/>
        </label>
      </div>
    </div>
  );
};

export default CameraScanner;