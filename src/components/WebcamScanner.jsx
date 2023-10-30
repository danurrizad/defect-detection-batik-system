import React, { useState, useEffect, useRef } from "react";


const WebcamYOLOComponent = () => {
  const videoRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const urlVideo = 'http://127.0.0.1:5000/webcam'

    const startStream = () => {
      if (videoRef.current) {
        console.log("disini")
        videoRef.current.src = urlVideo;
        setIsLoading(false);
      }
    }

    startStream();
  }, []);

  console.log(videoRef)

  return (
    <>
      <div>
        <h2 className="text-center">YOLO webcam</h2>
        {/* {isLoading ? <h1>LOADING YOLO....</h1>:<img ref={videoRef} alt="Webcam Feed"/>} */}
        <div className="bg-white p-2">
          <img width="" className="w-fit h-[70vh]" ref={videoRef} alt="Webcam Feed"/>
        </div>
      </div>
    </>
  );
}

export default WebcamYOLOComponent;
