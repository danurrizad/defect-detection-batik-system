import React, {useState, useEffect, useContext} from 'react'
import { HashRouter as Router, Route, Routes } from 'react-router-dom'

import Home from './pages/Home'
import Detection from './pages/Detection'
import Forecasting from './pages/Forecasting'
import ScanDefect from './pages/ScanDefect'
import ResultDefect from './pages/ResultDefect'

import { UserContext } from './components/UserContext'


function App() {
  const [img, setImg] = useState("")

  const {user, setUserAndUpdateStorage} = useContext(UserContext)

  useEffect(() => {
    const userLocal = localStorage.getItem('userDataContext')
    setUserAndUpdateStorage(userLocal)
    console.log("USER : ", user)
  }, [])


  // useEffect(() => {
  //   console.log("User terupdate:", user);
  // }, []);

  // useEffect(()=>{
  //   const userLocal = localStorage.getItem('userLocal')
  //   setUser(userLocal)
  // })

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
