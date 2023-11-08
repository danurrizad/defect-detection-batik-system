import React, { useState, useEffect, useRef, useContext } from 'react'

import Header from '../components/Header'
import TableSalesData from '../components/TableSalesData'
import CsvUpload from '../components/CSVupload';

import { CsvDataProvider } from '../components/context/CsvDataContext';
import { UserContext } from '../components/context/UserContext';
import { CsvDataContext } from '../components/context/CsvDataContext';
import { ForecastValueContext } from '../components/context/ForecastValueContext';

import { Bar } from "react-chartjs-2";
import { BarElement,  CategoryScale,Chart as ChartJS,Legend, LinearScale,Title, Tooltip } from "chart.js";
import Footer from '../components/Footer';

ChartJS.register(CategoryScale, LinearScale, BarElement,Title,Tooltip,Legend);
ChartJS.defaults.color = '#ffffff';

const Forecasting = () => {
    const [isOpenYears, setIsOpenYears] = useState(false);
    const [selectedYear, setSelectedYear] = useState(null);
    const dropdownYearsRef = useRef(null);

    const { user } = useContext(UserContext)
    const { csvDataJsonContext } = useContext(CsvDataContext);
    const { forecastDataContext } = useContext(ForecastValueContext);

    const getMonthName = (monthNumber) => {
      const monthNames = [
        'January', 'February', 'March', 'April',
        'May', 'June', 'July', 'August',
        'September', 'October', 'November', 'December'
      ];
      return monthNames[monthNumber - 1] || '';
    };

  let months = [];
  let values = [];
  let years = [];
  // let valueMax = 0
  
  if (csvDataJsonContext) {
    const dataByYear = Object.values(csvDataJsonContext).filter(
      (item) => item.date && item.date.startsWith(selectedYear)
    );
    years = Array.from(new Set(csvDataJsonContext.map(item => item && item.date && item.date.split('-')[0])))
    months = dataByYear.map(item => getMonthName(parseInt(item.date.split('-')[1])));
    values = dataByYear.map(item => item.value);
  } else {
    console.log("Data CSV tidak tersedia.");
  }
  

  const option = {
    maintainAspectRatio: false,
    scales: {
      x: {
        stacked: true,
        grid: {
          offset: true
        },
        ticks: {
          color: 'white', // Warna teks sumbu x
        }
      },
      y: {
        beginAtZero: true,
        stacked: true,
        min: 0,
        ticks: {
          stepSize: 1000, // Ini adalah langkah antara nilai-nilai pada sumbu Y
          color: 'white', 
        }
      }
    },
    // responsive: true,
    plugins: {
      // legend: { position: "chartArea" },
      title: {
        display: true,
        text: "Penjualan Batik",
        color: 'white'
      },
    },
  };
  
  const chartData = {
    labels: months,
    datasets: [
      {
        label: "Penjualan per bulan",
        color: "white",
        data: values.filter(value => value !== undefined),
        backgroundColor: [],
      },
    ],
  };  
  
 if(forecastDataContext){
  chartData.datasets[0].backgroundColor= Array(values.length).fill("#D7FAFF")

  // // // -------------------GET FORECAST YEAR------------------------------
  const csvDataArray = Object.values(csvDataJsonContext);
  csvDataArray.sort((a, b) => a.date.localeCompare(b.date));
      
  // // // Get the last item in the sorted array, which will have the latest date
  const lastData = csvDataArray[csvDataArray.length - 1];
  if (lastData && lastData.date){
    // // Extract the month and year from the latest date
    const [yearForecast, monthForecast] = lastData.date.split('-');
    const monthNumberForecast = parseInt(monthForecast);
    const monthNameForecast = getMonthName(monthNumberForecast+1);

    const forecastData = {
      label: "Perkiraan penjualan",
      data: [],
      backgroundColor: "#FFD700", // Warna latar belakang yang sesuai
      color: 'white'
    };
    
    // Menambahkan data forecasting ke dalam chartData
    if(selectedYear == yearForecast){
      forecastData.data = Array(values.length).fill(0);
      forecastData.data.push(forecastDataContext[0].forecast.toFixed(1))
      chartData.datasets.push(forecastData);
      chartData.labels.push(monthNameForecast)
    }
  }
 }
 else{
  chartData.datasets[0].backgroundColor= Array(values.length).fill("#D7FAFF")
  console.log("Tidak ada hasil forecast tersimpan")
 }
  
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
 
  if(user) return (
    <div className='min-h-screen bg-primary0 flex flex-col justify-between gap-32' style={{fontFamily: "font-inter"}}>
      <main>
        <Header title="PERKIRAAN PENJUALAN" />
        
        {/* Content */}
        <div className='2xl:p-10 p-2 2xl:pt-0 pt-10  flex 2xl:flex-row flex-col 2xl:gap-0 gap-20 justify-between items-center'>
          {/* <ForecastingModel/> */}
          <div className='flex flex-col items-center'>
            <TableSalesData selectedYear={selectedYear}/>
            
            <div className='py-4 px-10'>
              <CsvDataProvider>
                <CsvUpload/>
              </CsvDataProvider>
            </div>
          </div>
          <div>
        
          {/* Tahun Dropdown */}
          <div className='flex justify-end gap-10 2xl:text-[24px] text-[14px]'>
            <div className='flex justify-center gap-4'>
              <div className='relative inline-block' ref={dropdownYearsRef}>
                <button onClick={()=>setIsOpenYears(!isOpenYears)} type="button" className="inline-flex items-center gap-4 justify-center w-full px-4 py-2 text-sm font-medium bg-secondary1 text-white border border-gray-300 rounded-md hover:bg-secondary0 focus:outline-none focus:ring focus:ring-primary1 active:bg-primary1">
                  <img className='w-[12px]' src='/img/down_arrow.png'/>{selectedYear ? selectedYear : 'Tahun'}
                </button>
                {isOpenYears && (
                    <div className='origin-top-right absolute right-0 mt-2  rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-200'>
                    {years.map((year, index) => (
                      <div key={index} className="">
                        <a
                          className="block text-sm text-black bg-white hover:bg-secondary1 hover:text-white px-10 py-2 border-b-2 border-black hover:ring-white hover:ring cursor-pointer"
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
              <div className='2xl:min-h-[400px] min-h-[400px] 2xl:min-w-[900px] w-fit bg-secondary1 border-white border-2 shadow-xl p-4 rounded-xl'>
                <Bar options={option} data={chartData} />
              </div>
            </div>
        
            <div className='pb-10'>
              {/* <h2>Saran stok produk bulan depan : <span className='2xl:p-2 p-1 px-2 rounded-xl shadow-xl text-white bg-primary2'>Tingkatkan</span></h2> */}
            </div>
          </div>
        </div>
      </main>

      <Footer/>
    </div>
  )

  return(
    <div className='min-h-screen bg-primary0 font-heading flex flex-col justify-between gap-32' style={{fontFamily: "font-inter"}}>
      <main>
        <Header title="PERKIRAAN PENJUALAN"/>
        
        <div className='p-10 font-heading flex justify-center'>
          <h1 className='2xl:text-2xl text-base text-center'>Maaf, hanya Admin yang dapat mengakses halaman ini</h1>
        </div>
      </main>
      <Footer/>
    </div>
  )
}

export default Forecasting