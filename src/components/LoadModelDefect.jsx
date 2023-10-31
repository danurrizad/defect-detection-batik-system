import React, { useEffect, useState } from 'react';
import * as tf from '@tensorflow/tfjs';

function ModelLoader({ modelPath }) {
  const [model, setModel] = useState(null);

  useEffect(() => {
    async function loadModel() {
      try {
        const loadedModel = await tf.loadGraphModel(modelPath);
        setModel(loadedModel);
      } catch (error) {
        console.error('Error loading the model:', error);
      }
    }

    loadModel();
  }, [modelPath]);

  return (
    <div>
      {model ? (
        // Render your application using the loaded model
        <p>Model Loaded Successfully</p>
      ) : (
        <p>Loading Model...</p>
      )}
    </div>
  );
}

export default ModelLoader;
