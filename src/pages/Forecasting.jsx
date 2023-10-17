import React, { useState, useEffect, useRef, useContext } from 'react'

import Header from '../components/Header'
import CsvUpload from '../components/CSVupload';
import { CsvDataProvider } from '../components/CsvDataContext';
import { CsvDataContext } from '../components/CsvDataContext';

import { Bar } from "react-chartjs-2";
import { BarElement,  CategoryScale,Chart as ChartJS,Legend, LinearScale,Title, Tooltip } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement,Title,Tooltip,Legend);

const option = {
  responsive: true,
  plugins: {
    legend: { position: "chartArea" },
    title: {
      display: true,
      text: "Penjualan Batik"
    },
  },
};

const data = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Okt", "Nov", "Des"],
  datasets: [
    {
      label: "Product ",
      data: [ 4850, 7669.5, 8330, 7000, 5775, 4750, 4650, 7875, 5175, 4750, 5175, 4850],
      backgroundColor: "#D7FAFF",
    },

  ],

};



const Forecasting = ({user, setUser}) => {

  const years = ['2021','2022', '2023']
  const [isOpenYears, setIsOpenYears] = useState(false);
  const [selectedYear, setSelectedYear] = useState(null);
  const dropdownYearsRef = useRef(null);

  // const { csvData } = useContext(CsvDataProvider);
  const [csvData, setCsvData] = useState([]);
  const { csvDataJson } = useContext(CsvDataContext);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownYearsRef.current && !dropdownYearsRef.current.contains(event.target)) {
        setIsOpenYears(false);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    if (selectedYear !== null) {
      setIsOpenYears(false);  
    }
  }, [selectedYear]);

  // useEffect(() => {
  //   // Cek apakah ada URL file yang tersimpan di penyimpanan lokal
  //   const storedCsvData = localStorage.getItem('csvDataJson');
  //   console.log("ADA di local :", storedCsvData)
  //   if (storedCsvData) {
  //     setCsvData(storedCsvData);
  //   }
  // }, []); // Gunakan efek sekali saat komponen dimuat

  useEffect(()=>{
    setCsvData(csvDataJson)
    console.log("TEST DATASET DI FORECASTING : ", csvData)
  }, [csvDataJson])

  const testFetch = () =>{
    console.log("TEST DATASET : ", csvData)
  }

  if(user == "ADMIN") return (
    <div className='min-h-screen bg-primary5 font-heading'>
      <Header title="PERKIRAAN PENJUALAN" user={user} setUser={setUser}/>

      {/* Content */}
      <div className='2xl:p-10 p-2 2xl:pt-0 pt-10 font-heading flex 2xl:flex-row flex-col 2xl:gap-0 gap-20 justify-between'>
        <div>
          <table class="table shadow-xl 2xl:text-[24px] text-[14px]">
            <thead>
              <tr className='bg-primary1 text-white'>
                <th className='w-40 border-white border-2 '>Bulan</th>
                <th className='w-40 border-white border-2'>Pcs</th>
              </tr>
            </thead>
            <tbody className='bg-primary3 text-white text-center'>
              <tr>
                <td scope="row" className='border-white border-2 '>Januari</td>
                <td className='border-white border-2 '></td>
              </tr>
              <tr>
                <td scope="row" className='border-white border-2 '>Februari</td>
                <td className='border-white border-2 '></td>
              </tr>
              <tr>
                <td scope="row" className='border-white border-2 '>Maret</td>
                <td className='border-white border-2 '></td>
              </tr>
              <tr>
                <td scope="row" className='border-white border-2 '>April</td>
                <td className='border-white border-2 '></td>
              </tr>
              <tr>
                <td scope="row" className='border-white border-2 '>Mei</td>
                <td className='border-white border-2 '></td>
              </tr>
              <tr>
                <td scope="row" className='border-white border-2 '>Juni</td>
                <td className='border-white border-2 '></td>
              </tr>
              <tr>
                <td scope="row" className='border-white border-2 '>Juli</td>
                <td className='border-white border-2 '></td>
              </tr>
              <tr>
                <td scope="row" className='border-white border-2 '>Agustus</td>
                <td className='border-white border-2 '></td>
              </tr>
              <tr>
                <td scope="row" className='border-white border-2 '>September</td>
                <td className='border-white border-2 '></td>
              </tr>
              <tr>
                <td scope="row" className='border-white border-2 '>Oktober</td>
                <td className='border-white border-2 '></td>
              </tr>
              <tr>
                <td scope="row" className='border-white border-2 '>November</td>
                <td className='border-white border-2 '></td>
              </tr>
              <tr>
                <td scope="row" className='border-white border-2 '>Desember</td>
                <td className='border-white border-2 '></td>
              </tr>
            </tbody>
          </table>
          <div className='py-4'>
            <CsvDataProvider>
              <CsvUpload/>
            </CsvDataProvider>
          </div>
        </div>
        <div>
          {/* Produk dan Tahun */}
          <div className='flex justify-end gap-10 2xl:text-[24px] text-[14px]'>
            <div className='flex justify-center gap-4'>
              <div className='relative inline-block' ref={dropdownYearsRef}>
                <button onClick={()=>setIsOpenYears(!isOpenYears)} type="button" className="inline-flex items-center gap-4 justify-center w-full px-4 py-2 text-sm font-medium bg-primary2 text-white border border-gray-300 rounded-md hover:bg-primary1 focus:outline-none focus:ring focus:ring-primary1 active:bg-primary1">
                  <img className='w-[12px]' src='/img/down_arrow.png'/>{selectedYear ? selectedYear : 'Years'}
                </button>
                {isOpenYears && (
                    <div className='origin-top-right absolute right-0 mt-2  rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-200'>
                    {years.map((year, index) => (
                      <div key={index} className="">
                        <a
                          className="block text-sm text-primary1 bg-white hover:bg-primary3 hover:text-white px-10 py-2 hover:ring-white hover:ring cursor-pointer"
                          onClick={() => setSelectedYear(year)} 
                        >
                          {year}
                        </a>
                      </div>
                    ))}
                  </div>
                  )}
              </div>

            </div>
          </div>

          {/* Chart Bar */}
          <div className='py-4'>
            <div className='2xl:h-[400px] h-[300px] 2xl:w-[900px] w-full bg-primary2 border-white border-2 shadow-xl'>
              <Bar options={option} data={data} />
            </div>
          </div>

          <div className='pb-10'>
            <h2>Saran stok produk bulan depan : <span className='2xl:p-2 p-1 px-2 rounded-xl shadow-xl text-white bg-primary2'>Tingkatkan</span></h2>
            <button onClick={testFetch} className='bg-green-500'>Test fetch</button>
          </div>
        </div>
      </div>
    </div>
  )

  return(
    <div className='min-h-screen bg-primary5 font-heading'>
      <Header title="PERKIRAAN PENJUALAN" user={user} setUser={setUser}/>

      <div className='p-10 font-heading flex justify-center'>
        <h1 className='2xl:text-2xl text-base text-center'>Maaf, hanya Admin yang dapat mengakses halaman ini</h1>
      </div>
    </div>
  )
}

export default Forecasting