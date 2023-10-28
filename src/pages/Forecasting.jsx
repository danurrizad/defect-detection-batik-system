import React, { useState, useEffect, useRef, useContext } from 'react'

import Header from '../components/Header'
import TableSalesData from '../components/TableSalesData'
import CsvUpload from '../components/CSVupload';
import { CsvDataProvider } from '../components/CsvDataContext';
import { CsvDataContext } from '../components/CsvDataContext';

import { Bar } from "react-chartjs-2";
import { BarElement,  CategoryScale,Chart as ChartJS,Legend, LinearScale,Title, Tooltip } from "chart.js";
import { UserContext } from '../components/UserContext';
import { ForecastValueContext } from '../components/context/ForecastValueContext';

ChartJS.register(CategoryScale, LinearScale, BarElement,Title,Tooltip,Legend);

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
        'September', 'October', 'November', 'Desember'
      ];
      return monthNames[monthNumber - 1] || '';
    };

  let months = [];
  let values = [];
  let years = [];
  
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
        stacked: true,
        ticks: {
          color: 'white', // Warna teks sumbu y
        }
      }
    },
    responsive: true,
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
        data: values.filter(value => value !== undefined),
        backgroundColor: [],
        color: 'white'
      },
    ],
  };  
  
  chartData.datasets[0].backgroundColor= Array(values.length).fill("#D7FAFF")

  // // // -------------------GET FORECAST YEAR------------------------------
  const csvDataArray = Object.values(csvDataJsonContext);
  csvDataArray.sort((a, b) => a.date.localeCompare(b.date));
  console.log('values', values)
      
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
    <div className='min-h-screen bg-primary5 font-heading'>
      <Header title="PERKIRAAN PENJUALAN" />

      {/* Content */}
      <div className='2xl:p-10 p-2 2xl:pt-0 pt-10 font-heading flex 2xl:flex-row flex-col 2xl:gap-0 gap-20 justify-between'>
        {/* <ForecastingModel/> */}
        <div>
          <TableSalesData selectedYear={selectedYear}/>
          
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
            <div className='2xl:min-h-[400px] min-h-[300px] 2xl:min-w-[900px] w-full bg-primary2 border-white border-2 shadow-xl p-4'>
              <Bar options={option} data={chartData} />
            </div>
          </div>

          <div className='pb-10'>
            {/* <h2>Saran stok produk bulan depan : <span className='2xl:p-2 p-1 px-2 rounded-xl shadow-xl text-white bg-primary2'>Tingkatkan</span></h2> */}
          </div>
        </div>
      </div>
    </div>
  )

  return(
    <div className='min-h-screen bg-primary5 font-heading'>
      <Header title="PERKIRAAN PENJUALAN"/>

      <div className='p-10 font-heading flex justify-center'>
        <h1 className='2xl:text-2xl text-base text-center'>Maaf, hanya Admin yang dapat mengakses halaman ini</h1>
      </div>
    </div>
  )
}

export default Forecasting