import React, { useState, useEffect, useRef } from "react";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-webgl"; // set backend to webgl
import ButtonHandler from "./buttonLoader";
import { detect, detectVideo } from "./utils/detect";
import LoadingPage from "./LoadingPage";

const App = () => {
  const [loading, setLoading] = useState({ loading: true, progress: 0 }); // loading state
  const [model, setModel] = useState({
    net: null,
    inputShape: [1, 0, 0, 3],
  }); // init model & input shape

  // references
  const imageRef = useRef(null);
  const cameraRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const imgElement = document.querySelector('img');
  const videoElements = document.querySelectorAll('video');

  // if(imageRef.current){
  //   console.log("image :",imageRef.current.style.display)
  // }
  // console.log("video",imageRef.current)

  // model configs
  const modelName = "yolov8n";
  const urlModel = "https://firebasestorage.googleapis.com/v0/b/batik-management-app.appspot.com/o/trainModel%2Fmodel.json?alt=media&token=41be0361-a716-4840-b967-a7ff503a01a4&_gl=1*1xmfsty*_ga*MjAyMDc0MzM3OC4xNjk4MTI0MDgw*_ga_CW55HF8NVT*MTY5ODc1NDkwMi42LjEuMTY5ODc1Njk4MC40My4wLjA."
  const pathModel = 'best_web_model/model.json'
  useEffect(() => {
    tf.ready().then(async () => {
      const yolov8 = await tf.loadGraphModel(pathModel
        ,
        {
          onProgress: (fractions) => {
            setLoading({ loading: true, progress: fractions }); // set loading fractions
          },
        }
      ); // load model

      // warming up model
      const dummyInput = tf.ones(yolov8.inputs[0].shape);
      const warmupResults = yolov8.execute(dummyInput);

      setLoading({ loading: false, progress: 1 });
      setModel({
        net: yolov8,
        inputShape: yolov8.inputs[0].shape,
      }); // set model & input shape

      tf.dispose([warmupResults, dummyInput]); // cleanup memory
    });
  }, []);

  return (
    <div className="App">
      <div className="content">
        <img
          className="shadow-xl"
          src="#"
          ref={imageRef}
          onLoad={() => detect(imageRef.current, model, canvasRef.current)}
        />
        <video
          className="shadow-xl"
          autoPlay
          muted
          ref={cameraRef}
          onPlay={() => detectVideo(cameraRef.current, model, canvasRef.current)}
        />
        <video
          className="shadow-xl"
          autoPlay
          muted
          playsInline 
          ref={videoRef}
          onPlay={() => detectVideo(videoRef.current, model, canvasRef.current)}
        />
        <canvas width={model.inputShape[1]} height={model.inputShape[2]} ref={canvasRef} />
      </div>
      <ButtonHandler imageRef={imageRef} cameraRef={cameraRef} videoRef={videoRef} />
      {loading.loading && <LoadingPage text={`Loading model... ${(loading.progress * 100).toFixed(2)}%`}/>}
    </div>
  );
};

export default App;