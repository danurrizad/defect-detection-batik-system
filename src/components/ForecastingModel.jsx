import React, { useState, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';

function ForecastingModel() {
  // State untuk menyimpan data penjualan dan hasil prediksi
  const [historicalSales, setHistoricalSales] = useState([100, 200, 300, 400, 500]);
  const [predictedSales, setPredictedSales] = useState(null);

  // Fungsi untuk melakukan prediksi penjualan
  const predictSales = async () => {
    // Persiapan data penjualan historis (contoh data)
    const inputTensor = tf.tensor(historicalSales);

    // Membuat model regresi linier sederhana
    const model = tf.sequential();
    model.add(tf.layers.dense({ units: 1, inputShape: [1] }));
    model.compile({ loss: 'meanSquaredError', optimizer: 'sgd' });

    // Melatih model
    const targetSales = [150, 250, 350, 450, 550];
    await model.fit(inputTensor, tf.tensor(targetSales), { epochs: 100 });

    // Melakukan prediksi untuk data selanjutnya (contoh: 600)
    const futureSales = [600];
    const predictedValue = model.predict(tf.tensor(futureSales));
    console.log(predictedValue)
    setPredictedSales(predictedValue.arraySync()[0]);
  };

  useEffect(() => {
    predictSales();
  }, []);

  return (
    <div>
      <h1>Model Forecasting Penjualan</h1>
      <div>
        <p>Data Penjualan Historis: {historicalSales.join(', ')}</p>
        {predictedSales !== null && <p>Hasil Prediksi: {predictedSales}</p>}
      </div>
    </div>
  );
}

export default ForecastingModel;
