import { useState, useRef, useEffect } from "react";
import { Webcam } from "./utils/webcam2";

const ButtonHandler = ({ imageRef, cameraRef }) => {
  const [streaming, setStreaming] = useState(null); // streaming state
  const inputImageRef = useRef(null); // video input reference

  const webcam = new Webcam(); // webcam handler

  const [selectedCamera, setSelectedCamera] = useState(null);
  const [availableCameras, setAvailableCameras] = useState([]);

  const [showAdditionalDiv, setShowAdditionalDiv] = useState(true);


  useEffect(()=>{
    const checkCamera = async() =>{
      const cameras = await webcam.getAvailableCameras();
      setAvailableCameras(cameras);
    }

    checkCamera()

  },[])


  const openCamera = async () => {
    try {
      await webcam.open(cameraRef.current);
  
      const cameras = await webcam.getAvailableCameras();
      setAvailableCameras(cameras);
  
      if (cameras.length > 0) {
        cameraRef.current.style.display = "block";
        setStreaming("camera");
      } else {
        alert("Tidak ada kamera yang tersedia.");
      }
    } catch (error) {
      console.error("Error accessing webcam:", error);
      alert("Gagal mengakses kamera. Pastikan Anda memberikan izin.");
    }
  };

  const switchCamera = async (deviceId) => {
    await webcam.selectCamera(deviceId);
    setSelectedCamera(deviceId);
    webcam.close(cameraRef.current);
    webcam.open(cameraRef.current);
  };


  // closing image
  const closeImage = () => {
    const url = imageRef.current.src;
    imageRef.current.src = "#"; 
    URL.revokeObjectURL(url); 
    setStreaming(null); 
    inputImageRef.current.value = ""; 
    imageRef.current.style.display = "none"; 
  };

  useEffect(()=>{
    if(streaming != null){
      setShowAdditionalDiv(false)
    }
    else{
      setShowAdditionalDiv(true)
    }
  })

  return (
    <div className="btn-container">
      <div className={showAdditionalDiv ? "additional-div" : "hidden"}>
        <div class="mb-10 2xl:max-w-2xl xl:max-w-xl md:max-w-xl max-w-sm  mx-auto w-[1000px] bg-white shadow-lg rounded-lg overflow-hidden">
          <img class="w-full h-[300px] pt-10 object-cover object-center" src="/img/batik-preview.png" alt="Contoh Gambar Batik"/>
          <div class="p-10 shadow-2xl bg-secondary3">
            <p class="text-black text-center font-bold">Silakan pilih metode pendeteksian di bawah ini</p>
          </div>
        </div>

      </div>
      <div className="p-4" style={{fontFamily: "font-inter"}}>
          {streaming === "camera" && (
            <>
              <p>Pilih Kamera : 
              <select className="ml-2 cursor-pointer px-2 rounded-sm " onChange={(e) => switchCamera(e.target.value)} value={selectedCamera}>
                  {availableCameras.map((camera) => (
                    <option key={camera.deviceId} value={camera.deviceId}>
                      {camera.label}
                    </option>
                  ))}
                </select>
              </p>
            </>
          )}
        </div>

      <section className="flex justify-center">
        {/* Image Handler */}
        <div>
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={(e) => {
              const url = URL.createObjectURL(e.target.files[0]); // create blob url
              imageRef.current.src = url; // set video source
              imageRef.current.style.display = "block"; // show video
              setStreaming("image"); // set streaming to video
            }}
            ref={inputImageRef}
          />
          <button
            className="text-black bg-secondary2 border-solid  mx-2 py-3 px-4 rounded-md shadow-md shadow-black font-bold cursor-pointer hover:text-white hover:bg-secondary1 duration-150"
            onClick={() => {
              // if not streaming
              if (streaming === null) {
                inputImageRef.current.click();
                if(imageRef.current){
                }
              }
              // closing image streaming
              else if (streaming === "image") {
                closeImage();
              }
              else alert(`Tidak bisa membuka lebih dari 1 metode. Silakan tutup ${streaming} terlebih dahulu`); // if streaming video or webcam
            }}
          >
            {streaming === "image" ? "Tutup" : "Buka"} Gambar
          </button>
        </div>
        
        
        {/* Webcam Handler */}
        <div>
          <button
            className="text-black bg-secondary2 border-solid mx-2 py-3 px-4 rounded-md shadow-md shadow-black font-bold cursor-pointer hover:text-white hover:bg-secondary1 duration-150"
            onClick={async () => {
              if (streaming === null || streaming === "image") {
                if (streaming === "image") closeImage();
                openCamera();
              } else if (streaming === "camera") {
                webcam.close(cameraRef.current);
                cameraRef.current.style.display = "none";
                setStreaming(null);
              } else {
                alert(`Tidak bisa membuka lebih dari 1 metode. Silakan tutup ${streaming} terlebih dahulu`);
              }
            }}
          >
            {streaming === "camera" ? "Tutup" : "Buka"} Webcam
          </button>

        </div>
      </section>
    </div>
  );
};

export default ButtonHandler;