import { useState, useRef, useEffect } from "react";
import { Webcam } from "./utils/webcam";

const ButtonHandler = ({ imageRef, cameraRef, videoRef }) => {
  const [streaming, setStreaming] = useState(null); // streaming state
  const inputImageRef = useRef(null); // video input reference
  const inputVideoRef = useRef(null); // video input reference
  const webcam = new Webcam(); // webcam handler

  const [showAdditionalDiv, setShowAdditionalDiv] = useState(true);


  // closing image
  const closeImage = () => {
    const url = imageRef.current.src;
    imageRef.current.src = "#"; // restore image source
    URL.revokeObjectURL(url); // revoke url

    setStreaming(null); // set streaming to null
    inputImageRef.current.value = ""; // reset input image
    imageRef.current.style.display = "none"; // hide image
  };

  // closing video streaming
  const closeVideo = () => {
    const url = videoRef.current.src;
    videoRef.current.src = ""; // restore video source
    URL.revokeObjectURL(url); // revoke url

    setStreaming(null); // set streaming to null
    inputVideoRef.current.value = ""; // reset input video
    videoRef.current.style.display = "none"; // hide video
  };

  if(imageRef.current){
    console.log("image :",imageRef.current.style.display)
  }
  // console.log("video",imageRef.current)

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
        {/* <div className="container-model flex justify-center items-center border-2 border-black border-solid mb-10">Silakan pilih metode deteksi</div> */}
        <div class="mb-10 2xl:max-w-2xl xl:max-w-xl md:max-w-xl max-w-sm  mx-auto w-[1000px] bg-white shadow-lg rounded-lg overflow-hidden">
          <img class="w-full h-[300px] pt-10 object-cover object-center" src="/img/batik-preview.png" alt="Contoh Gambar Batik"/>
          <div class="p-4 shadow-2xl">
            <h2 class="text-2xl font-semibold">Deteksi Kecacatan Batik</h2>
            <p class="text-gray-600">Silakan pilih metode di bawah ini untuk mendeteksi kecacatan dalam batik.</p>
          </div>
        </div>

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
            className="text-white bg-black border-solid border-black border-2 mx-2 p-2 rounded-md cursor-pointer hover:text-black hover:bg-white duration-150"
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
              else alert(`Can't handle more than 1 stream\nCurrently streaming : ${streaming}`); // if streaming video or webcam
            }}
          >
            {streaming === "image" ? "Close" : "Open"} Image
          </button>
        </div>
        
        
        {/* Webcam Handler */}
        <div>
          <button
            className="text-white bg-black border-solid border-black border-2 mx-2 p-2 rounded-md cursor-pointer hover:text-black hover:bg-white duration-150"
            onClick={() => {
              // if not streaming
              if (streaming === null || streaming === "image") {
                // closing image streaming
                if (streaming === "image") closeImage();
                webcam.open(cameraRef.current); // open webcam
                cameraRef.current.style.display = "block"; // show camera
                setStreaming("camera"); // set streaming to camera
              }
              // closing video streaming
              else if (streaming === "camera") {
                webcam.close(cameraRef.current);
                cameraRef.current.style.display = "none";
                setStreaming(null);
              } else alert(`Can't handle more than 1 stream\nCurrently streaming : ${streaming}`); // if streaming video
            }}
            >
            {streaming === "camera" ? "Close" : "Open"} Webcam
          </button>
        </div>
      </section>

      {/* Video Handler */}
      {/* <input
        type="file"
        accept="video/*"
        style={{ display: "none" }}
        onChange={(e) => {
          if (streaming === "image") closeImage(); // closing image streaming
          const url = URL.createObjectURL(e.target.files[0]); // create blob url
          videoRef.current.src = url; // set video source
          videoRef.current.addEventListener("ended", () => closeVideo()); // add ended video listener
          videoRef.current.style.display = "block"; // show video
          setStreaming("video"); // set streaming to video
        }}
        ref={inputVideoRef}
      />
    
      <button
        className="text-white bg-black border-solid border-black border-2 mx-2 p-2 rounded-md cursor-pointer hover:text-black hover:bg-white"
        onClick={() => {
          // if not streaming
          if (streaming === null || streaming === "image") {
            inputVideoRef.current.click();
          }
          // closing video streaming
          else if (streaming === "video") {
            closeVideo();
          }
          else alert(`Can't handle more than 1 stream\nCurrently streaming : ${streaming}`); // if streaming webcam
        }}
      >
        {streaming === "video" ? "Close" : "Open"} Video
      </button> */}
    </div>
  );
};

export default ButtonHandler;