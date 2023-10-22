import React, { createContext, useEffect, useState } from 'react';

const CsvDataContext = createContext();

const CsvDataProvider = ({ children }) => {
  const [csvDataJsonContext, setCsvDataJsonContext] = useState([]);

  useEffect(()=>{
        console.log("setCsvDataAndUpdateStorage pada CSVDATAPROVIDER :", csvDataJsonContext)
        
  }, [csvDataJsonContext])

  const setCsvDataAndUpdateStorage = (data) => {
    // console.log("data:",data)
    setCsvDataJsonContext(data);
    localStorage.setItem('csvDataJson', JSON.stringify(data)); // Simpan sebagai JSON string
    // localStorage.setItem('csvDataJson', data); // Simpan sebagai JSON 
    // console.log("setCsvDataAndUpdateStorage pada CSVDATAPROVIDER :", csvDataJsonContext)
  };

  return (
    <CsvDataContext.Provider value={{ csvDataJsonContext, setCsvDataAndUpdateStorage }}>
      {children}
    </CsvDataContext.Provider>
  );
};

export { CsvDataProvider, CsvDataContext };
