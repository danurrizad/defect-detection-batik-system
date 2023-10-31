import React, { useEffect, useState, useRef } from "react";
import * as tf from "@tensorflow/tfjs";
import Webcam from "react-webcam";

function WebcamScanner3() {
  const [model, setModel] = useState(null);
  const canvasRef = useRef(null);
  const webcamRef = useRef(null);

  useEffect(() => {
    async function loadModel() {
      try {
        const loadedModel = await tf.loadGraphModel("/best_web_model/model.json");
        setModel(loadedModel);
      } catch (error) {
        console.error('Error loading the model:', error);
      }
    }

    loadModel();
  }, []);

  useEffect(() => {
    // Deteksi objek hanya ketika model dan webcam siap
    if (model && webcamRef.current) {
      detectObjects();
    }
  }, [model, webcamRef]);

  const detectObjects = async () => {
    const webcam = webcamRef.current;
    if (!webcam || !model) return; // Pastikan webcam dan model tersedia
    const image = webcam.getScreenshot();
    const imgElement = document.createElement("img");
    imgElement.src = image;
    imgElement.width = 640
    imgElement.height = 640
    
    const resizedImage = tf.browser.fromPixels(imgElement)
    .resizeBilinear([640, 640]) // Mengubah dimensi gambar menjadi [640, 640]
    .expandDims(); // Menambahkan dimensi batch [1, 640, 640, 3]
    
    console.log(resizedImage)
    try {
      const predictions = await model.execute(resizedImage);
      console.log("prediction", predictions)
      drawBoundingBoxes(predictions);
    } catch (error) {
      console.error('Error detecting objects:', error);
    }
  };

  const drawBoundingBoxes = (predictions) => {
    const canvas = canvasRef.current;
    console.log("Prediction di drawBoundingBox", predictions)
    if (!canvas) return; // Pastikan elemen canvas tersedia
  
    try {
      const context = canvas.getContext("2d");
      context.clearRect(0, 0, canvas.width, canvas.height);
  
      const shape = predictions.shape;
      console.log(shape)
      const classIdArray = predictions.slice([0, 1, 0], [1, 8, 8400]).dataSync();
      console.log("classIdArray", classIdArray)

      const labelArray = predictions.slice([0, 2], [1, 8, 8400]).dataSync();
      console.log("labelArray", labelArray)
      
      const scoreArray = predictions.slice([0, 5], [1, 8, 8400]).dataSync();
      console.log("scoreArray", scoreArray)
    //   const boundingBoxArray = predictions.slice([0, 0], [1, 8 * 4]).dataSync();
        const boundingBoxArray = predictions.slice([0, 0, 0], [1, 8, 4]).dataSync();


      for (let i = 0; i < shape[1]; i++) {
        const classId = classIdArray[i];
        const label = labelArray[classId];
        const score = scoreArray[i];
        const y = boundingBoxArray[i * 4];
        const x = boundingBoxArray[i * 4 + 1];
        const height = boundingBoxArray[i * 4 + 2];
        const width = boundingBoxArray[i * 4 + 3];
  
        if (score > 0.5) {
          context.strokeStyle = "red";
          context.font = "18px Arial";
          context.fillStyle = "red";
          context.lineWidth = 2;
          context.beginPath();
          context.rect(x, y, width, height);
          context.fillText(`${label} (${Math.round(score * 100)}%)`, x, y - 5);
          context.stroke();
        }
      }
    } catch (error) {
      console.log("ERROR di drawBoundingBox", error);
    }
  };
  

  return (
    <div>
      <Webcam
        ref={webcamRef}
        audio={false}
        screenshotFormat="image/jpeg"
        width={640} 
        height={460}
        onUserMedia={() => {
          // Gambar dari webcam sekarang sudah tersedia, Anda dapat melakukan deteksi objek di sini.
          detectObjects();
        }}
      />
      <p>Ini canvas di bawah</p>
      <canvas
        ref={canvasRef}
        width={webcamRef.current ? webcamRef.current.video.clientWidth : 640}
        height={webcamRef.current ? webcamRef.current.video.clientHeight : 480}
        style={{ position: "absolute" }}
      />
    </div>
  );
}

export default WebcamScanner3;
