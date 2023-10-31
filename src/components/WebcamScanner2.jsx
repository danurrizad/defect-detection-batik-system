import React, { useEffect, useState, useRef } from 'react';
import * as tf from '@tensorflow/tfjs';

function ModelLoader() {
  const [model, setModel] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [predictionText, setPredictionText] = useState('');

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
    if (model && videoRef.current) {
      // Get access to the webcam
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          videoRef.current.srcObject = stream;
        })
        .catch((error) => {
          console.error('Error accessing webcam:', error);
        });
    }
  }, [model]);

  useEffect(() => {
    if (model && videoRef.current && canvasRef.current) {
        async function runModel() {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            canvas.width = video.width;
            canvas.height = video.height;
            const context = canvas.getContext('2d');
          
            async function predict() {
                const input = tf.browser.fromPixels(video);
              
                // Resize the input image to match the model's expected input shape
                const resizedInput = input.resizeBilinear([640, 640]);
              
                // Expand the dimensions to include a batch size of 1
                const expandedInput = resizedInput.expandDims(0);
              
                // Normalize the pixel values if your model expects that
                const normalizedInput = tf.div(expandedInput, 255.0);
              
                const output = model.execute({ x: normalizedInput }); // Assume the model expects 'x' as the input key
              
                // Process the prediction results as needed
                const predictionResult = await model.execute({ x: normalizedInput });
                
                // Get the index of the predicted class (assumed to be a single number)
                const predictedIndex = predictionResult.dataSync()[0];
                // const roundedIndex = Math.round(predictedIndex)
                // console.log("predictedIndex", roundedIndex)

                // Map the index to the class name based on your label definitions
                const classNames = [
                    'Kurang warna',
                    'Luntur',
                    'Meleset',
                    'Noda',
                    'Warna timpa',
                ];
                
                // const predictedClass = classNames[roundedIndex];
                const predictedClass = classNames[Math.round(predictedIndex)];
                console.log("Index:",Math.round(predictedIndex))
                console.log("CLASS:",predictedClass)

                setPredictionText(`Prediction: ${predictedClass}`);

                // Gambar bounding box pada elemen canvas
                context.clearRect(0, 0, canvas.width, canvas.height); // Bersihkan gambar sebelum menggambar bounding box baru
                const x = 100; // Koordinat X pojok kiri atas bounding box
                const y = 100; // Koordinat Y pojok kiri atas bounding box
                const width = 200; // Lebar bounding box
                const height = 200; // Tinggi bounding box
                context.strokeStyle = '#FF0000'; // Warna bounding box (merah)
                context.lineWidth = 2; // Lebar garis bounding box
                context.strokeRect(x, y, width, height);
              
                // input.dispose();
                // resizedInput.dispose();
                // expandedInput.dispose();
                // normalizedInput.dispose();
                // output.dispose();
              
                requestAnimationFrame(predict);
              }
          
            video.onloadedmetadata = () => {
              predict();
            };
          }
          

      runModel();
    }
  }, [model, videoRef, canvasRef]);

  return (
    <div>
      {model ? (
        <div>
          <p>Model Loaded Successfully</p>
          <video ref={videoRef} autoPlay playsInline />
          <canvas ref={canvasRef} />
          <p>{predictionText}</p>
        </div>
      ) : (
        <p>Loading Model...</p>
      )}
    </div>
  );
}

export default ModelLoader;
