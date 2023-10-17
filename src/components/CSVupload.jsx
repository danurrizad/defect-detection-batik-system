import React, { useState, useEffect, useContext } from 'react';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage as firebaseStorage } from '../firebase';
import { CsvDataContext } from './CsvDataContext';
import axios from 'axios'
// import { app } from '../firebase';

// const app = initializeApp(firebaseConfig);

const CsvUpload = () => {
  const [csvData, setCsvData] = useState(null);

  const { setCsvDataAndUpdateStorage } = useContext(CsvDataContext);

  useEffect(() => {
    // Cek apakah ada URL file yang tersimpan di penyimpanan lokal
    const storedCsvData = localStorage.getItem('csvData');
    if (storedCsvData) {
      setCsvData(storedCsvData);
    }
  }, []); // Gunakan efek sekali saat komponen dimuat


  //HANDLE FILE UPLOAD
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    // const storages = getStorage(firebaseStorage);
    const storageRef = ref(firebaseStorage, `csvFiles/${file.name}`);
    
    uploadBytes(storageRef, file).then((snapshot) => {
      console.log('File uploaded successfully');
      
      // Get the download URL after upload
      getDownloadURL(storageRef).then(async(url) => {
        console.log('Download URL:', url); 
        // setCsvData(url);
        localStorage.setItem('csvData', url);
        const CSVdata = await fetchCsvData(url);
        console.log("Hasil fetch csv sebelum diletakkan di konteks:", CSVdata)
        setCsvDataAndUpdateStorage(CSVdata)
      }).catch((error) => {
        console.error('Error getting download URL:', error);
      });
    }).catch((error) => {
      console.error('Error uploading file:', error);
    });
  };

  // FETCHING CSV
  const fetchCsvData = async (url) => {
    try {
      const response = await axios.get(url);

      // Assuming the response data is CSV text
      const csvText = response.data;

      // Split CSV text into rows and then split rows into columns
      const rows = csvText.split('\n').map(row => row.split(','));

      // Assuming the first row is the header, create an array of objects
      const headers = rows[0];
      const data = rows.slice(1).map(row => {
        const rowData = {};
        headers.forEach((header, index) => {
          rowData[header] = row[index];
        });
        return rowData;
      });

      return data;
    } catch (error) {
      console.error('Error fetching CSV data:', error);
      return null;
    }
  };

  return (
    <div>
      <h2>File dataset penjualan : <span>{csvData ? <a href={csvData} className='bg-primary2 hover:bg-primary1 text-white px-4 py-1' target="_blank" rel="noopener noreferrer">Download CSV File</a>:<span>-</span>}</span></h2>
      <input type="file" accept=".csv" onChange={handleFileUpload} />
    </div>
  );
};

export default CsvUpload;
 