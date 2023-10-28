import React, { createContext, useEffect, useState } from 'react';

const ForecastValueContext = createContext();

const ForecastValueProvider = ({ children }) => {
  const [forecastDataContext, setForecastDataContext] = useState([]);

  // useEffect(()=>{
  //       console.log("setCsvDataAndUpdateStorage pada CSVDATAPROVIDER :", csvDataJsonContext)
  //       const getCsvData = localStorage.getItem('csvDataJson', csvDataJsonContext);
  //       const jsonGetCsvData = JSON.parse(getCsvData)
  //       console.log("jsonGetCsvData di context :", jsonGetCsvData)
        
  // }, [csvDataJsonContext])

  const setForecastDataAndUpdateStorage = (data) => {
    setForecastDataContext(data);
    localStorage.setItem('forecastData', JSON.stringify(data)); // Simpan sebagai JSON string
  };

  return (
    <ForecastValueContext.Provider value={{ forecastDataContext, setForecastDataAndUpdateStorage }}>
      {children}
    </ForecastValueContext.Provider>
  );
};

export { ForecastValueProvider, ForecastValueContext };
