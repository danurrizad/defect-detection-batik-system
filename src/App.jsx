import React, {useState, useEffect} from 'react'
import { HashRouter as Router, Route, Routes } from 'react-router-dom'

import Home from './pages/Home'
import Detection from './pages/Detection'
import Forecasting from './pages/Forecasting'
import ScanDefect from './pages/ScanDefect'
import ResultDefect from './pages/ResultDefect'


function App() {
  const [img, setImg] = useState("")
  const [user, setUser] = useState("PEGAWAI")

  useEffect(() => {
    console.log("User terupdate:", user);
  }, [user]);

  return (
    <>
    <Router>
      <Routes>
        <Route path='/'  element={<Home user={user} setUser={setUser}/>}/>
        <Route path='/deteksi-cacat' element={<Detection img={img} setImg={setImg} user={user} setUser={setUser}/>}/>
        <Route path='/perkiraan-penjualan' element={<Forecasting user={user} setUser={setUser}/>}/>
        <Route path='/scan-cacat' element={<ScanDefect img={img} setImg={setImg} user={user} setUser={setUser}/>}/>
        <Route path='/hasil-deteksi' element={<ResultDefect img={img} setImg={setImg} user={user} setUser={setUser}/>}/>
      </Routes>
    </Router>
    </>
  )
}

export default App
