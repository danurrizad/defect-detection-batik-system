import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const WebcamYOLOComponent =()=> {
  const videoRef = useRef(null);

  useEffect(() => {
    const urlVideo = 'http://127.0.0.1:5000/'

    const startStream = () =>{
        videoRef.current.src = urlVideo
    }

    startStream();
  }, []);


  return (
    <>
      <div>
        <h2>YOLO webcam:</h2>
        <img ref={videoRef} alt="Webcam Feed" />
      </div>
    </>
  );
}

export default WebcamYOLOComponent;
