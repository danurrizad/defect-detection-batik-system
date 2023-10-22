import React, { useState, useEffect, useContext } from 'react';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage as firebaseStorage } from '../firebase';
import { CsvDataContext } from './CsvDataContext';
import axios from 'axios'

import LoadingPage from './LoadingPage';

const CsvUpload = () => {
  // const [csvData, setCsvData] = useState(null);
  const [csvDataUrl, setCsvDataUrl] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { csvDataJsonContext, setCsvDataAndUpdateStorage } = useContext(CsvDataContext);

  useEffect(() => {
    // Cek apakah ada URL file yang tersimpan di penyimpanan lokal
    const storedCsvData = localStorage.getItem('csvDataJson');
    const storedFileName = localStorage.getItem('fileName')
    if (storedCsvData) {
      console.log("Di komponen, storedCsvData:", storedCsvData)
      console.log("Di context, csvDataJsonContext:", csvDataJsonContext)
      // setCsvData(storedCsvData);
    }
    if(storedFileName){
      setFileName(storedFileName)
    }
    const csvDataUrlLocal = localStorage.getItem('csvDataUrl');
    if(csvDataUrlLocal){
      setCsvDataUrl(csvDataUrlLocal)
      console.log(csvDataUrl)
    }
  }, []); // Gunakan efek sekali saat komponen dimuat


  //HANDLE FILE UPLOAD
  const handleFileUpload = (event) => {
    setIsLoading(true)
    const file = event.target.files[0];

    if(file){
      const storageRef = ref(firebaseStorage, `csvFiles/${file.name}`);
      
      uploadBytes(storageRef, file).then((snapshot) => {
        console.log('File uploaded successfully');
        
        // Get the download URL after upload
        getDownloadURL(storageRef).then(async(url) => {
          console.log('Download URL:', url); 
          const CSVdata = await fetchData(url); //DISINI FUNCTION UNTUK FETCH CSV
          if (CSVdata != false){
            localStorage.setItem('fileName', file.name)
            localStorage.setItem('csvDataUrl', url);
            await setCsvDataAndUpdateStorage(CSVdata)
            // window.location.reload()
          }
          else{
            alert("File csv tidak valid. File tidak memiliki header date!")
          }
          setIsLoading(false)
        }).catch((error) => {
          console.error('Error getting download URL:', error);
        });
      }).catch((error) => {
        console.error('Error uploading file:', error);
      });
    }
    else{
      return alert("File csv tidak valid")
    }
  };

  // ----------------------------------------- COBA FETCH V2 ----------------------------------------------
  const processData = (data) => {
    return data.map((item, index) => {
      return {
        date: item.date,
        value: parseFloat(item.value.trim())  // Menghapus spasi dan mengonversi ke tipe data yang sesuai
      };
    });
  };
  
  // ...
  
  const fetchData = async (url) => {
    try {
      const response = await axios.get(url);
      const lines = response.data.split('\n');
      const headers = lines[0].split(',');
      console.log("header year:",headers[0])
      if(headers[0]!="date"){
        return false
        
      }
      const csvDataArray = [];
  
      for (let i = 1; i < lines.length; i++) {
        const currentLine = lines[i].split(',');
        if (currentLine.length === headers.length) {
          const entry = {};
          entry.date = currentLine[0];
          entry.value = currentLine[1];
          csvDataArray.push(entry);
        }
      }
  
      // Proses data untuk menghilangkan "\r" dan mengatasi spasi tambahan
      const processedData = processData(csvDataArray);
  
      // console.log("processedData:", processedData);
      return processedData
    } catch (error) {
      console.error('Error fetching CSV data:', error);
    }
  };

  return (
    <div>
      <h2 className='flex items-center'>File dataset penjualan : <span>{csvDataUrl ? <h2 className='px-4 py-1 font-bold'>{fileName}</h2> : <>-</>}</span></h2>
      
      <div className='flex justify-center items-center gap-4'>
        <div className="flex justify-center items-center">
          <div className="max-w-md mx-auto bg-white hover:bg-slate-200 py-1 px-4 rounded-md shadow-md">
            <label for="file-upload" className="cursor-pointer">
              <span className="text-primary2">Upload CSV file</span>
              <input id="file-upload" onChange={handleFileUpload} type="file" className="hidden" accept=".csv" />
            </label>
          </div>
        </div>
        <div className='flex justify-center items-center gap-4'>{csvDataUrl ? (<a href={csvDataUrl} className='bg-green-400 rounded-md shadow-md hover:bg-green-600  text-white px-4 py-1' target="_blank" rel="noopener noreferrer">Download CSV File</a>):<span></span>}</div>
      </div>
      {isLoading && <LoadingPage/>}
    </div>
  );
};

export default CsvUpload;
 