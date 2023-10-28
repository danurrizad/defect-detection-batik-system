import React, {useState, useEffect, useContext} from 'react'
import { HashRouter as Router, Route, Routes } from 'react-router-dom'

import Home from './pages/Home'
import Detection from './pages/Detection'
import Forecasting from './pages/Forecasting'
import ScanDefect from './pages/ScanDefect'
import ResultDefect from './pages/ResultDefect'

import { UserContext } from './components/context/UserContext'
import { CsvDataContext } from './components/context/CsvDataContext'
import { ForecastValueContext } from './components/context/ForecastValueContext'


function App() {
  const [img, setImg] = useState("")

  const { setUserAndUpdateStorage} = useContext(UserContext)
  const { setCsvDataAndUpdateStorage} = useContext(CsvDataContext)
  const { setForecastDataAndUpdateStorage} = useContext(ForecastValueContext)

  useEffect(() => {
    const userLocal = JSON.parse(localStorage.getItem('userDataContext'));
    // console.log("user local pada localstorage :", userLocal)
    if (userLocal === null || userLocal === "") {
      // Data pengguna tidak ada atau dalam bentuk string kosong
      setUserAndUpdateStorage(null); // Atur pengguna dalam state menjadi null
    } else {
      // Data pengguna ada, Anda dapat mengonversinya dari string ke objek JSON
      setUserAndUpdateStorage(userLocal); // Atur pengguna dalam state
    }
  }, []);

  useEffect(() => {
    try {
      const csvLocal = JSON.parse(localStorage.getItem('csvDataJsonContext'));
      // console.log("csv local pada localstorage :", csvLocal)
      if (csvLocal === null || csvLocal === undefined) {
        // Data pengguna tidak ada atau dalam bentuk string kosong
        setCsvDataAndUpdateStorage(null); // Atur pengguna dalam state menjadi null
      } else {
        // Data pengguna ada, Anda dapat mengonversinya dari string ke objek JSON
        setCsvDataAndUpdateStorage(csvLocal); // Atur pengguna dalam state
    }
    } catch (error) {
      console.log(error)
      setCsvDataAndUpdateStorage(null)
    }
    
  }, []);

  useEffect(() => {
    try {
      const forecastLocal = JSON.parse(localStorage.getItem('forecastData'));
      // console.log("forecast local pada localstorage :", forecastLocal)
      if (forecastLocal === null || forecastLocal === undefined) {
        // Data pengguna tidak ada atau dalam bentuk string kosong
        setForecastDataAndUpdateStorage(null); // Atur pengguna dalam state menjadi null
      } else {
        // Data pengguna ada, Anda dapat mengonversinya dari string ke objek JSON
        setForecastDataAndUpdateStorage(forecastLocal); // Atur pengguna dalam state
    }
    } catch (error) {
      console.log(error)
      setForecastDataAndUpdateStorage(null)
    }
    
  }, []);

  return (
    <>
    <Router>
      <Routes>
        <Route path='/'  element={<Home />}/>
        <Route path='/deteksi-cacat' element={<Detection img={img} setImg={setImg} />}/>
        <Route path='/perkiraan-penjualan' element={<Forecasting />}/>
        <Route path='/scan-cacat' element={<ScanDefect img={img} setImg={setImg} />}/>
        <Route path='/hasil-deteksi' element={<ResultDefect img={img} setImg={setImg} />}/>
      </Routes>
    </Router>
    </>
  )
}

export default App
