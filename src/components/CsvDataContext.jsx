import React, { createContext, useEffect, useState } from 'react';

const CsvDataContext = createContext();

const CsvDataProvider = ({ children }) => {
  const [csvDataJson, setCsvDataJson] = useState([]);

  // useEffect(()=>{
  //       // console.log("setCsvDataAndUpdateStorage pada CSVDATAPROVIDER :", csvDataJson)
        
  // }, [csvDataJson])

  const setCsvDataAndUpdateStorage = (data) => {
    // console.log("data:",data)
    setCsvDataJson(data);
    localStorage.setItem('csvDataJson', JSON.stringify(data)); // Simpan sebagai JSON string
    // localStorage.setItem('csvDataJson', data); // Simpan sebagai JSON 
    // console.log("setCsvDataAndUpdateStorage pada CSVDATAPROVIDER :", csvDataJson)
  };

  return (
    <CsvDataContext.Provider value={{ csvDataJson, setCsvDataAndUpdateStorage }}>
      {children}
    </CsvDataContext.Provider>
  );
};

export { CsvDataProvider, CsvDataContext };
