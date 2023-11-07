import React, { useState, useEffect, useContext } from 'react';
import { CsvDataContext } from './context/CsvDataContext';
import { ForecastValueContext } from './context/ForecastValueContext';

const DataTabel = ({ selectedYear }) => {
  const { csvDataJsonContext } = useContext(CsvDataContext)
  const { forecastDataContext } = useContext(ForecastValueContext)

  const displayDataByYear = () => {
    if (!selectedYear) {
      return null;
    }

    const dataByYear = Object.values(csvDataJsonContext).filter(
      (item) => item.date.startsWith(selectedYear)
    );

    if (dataByYear.length === 0) {
      return <p>Data tidak ditemukan untuk tahun {selectedYear}.</p>;
    }

    const getMonthName = (monthNumber) => {
        const monthNames = [
          'January', 'February', 'March', 'April',
          'May', 'June', 'July', 'August',
          'September', 'October', 'November', 'December'
        ];
        return monthNames[monthNumber - 1] || '';
      };


      // -------------------GET FORECAST YEAR------------------------------
      csvDataJsonContext.sort((a, b) => a.date.localeCompare(b.date));
      
      // Get the last item in the sorted array, which will have the latest date
      const lastData = csvDataJsonContext[csvDataJsonContext.length - 1];
      
      // Extract the month and year from the latest date
      const [yearForecast, monthForecast] = lastData.date.split('-');
      // // -------------------GET FORECAST YEAR------------------------------

      
    return (
      <table className='table shadow-xl 2xl:text-[20px] text-[14px]'>
        <thead>
          <tr className='bg-gradient-to-r from-heading1 to-heading2 drop-shadow-2xl  text-white'>
            <th className='w-40 border-black border-2 border-l-0 border-t-0 '>Bulan</th>
            <th className='w-40 border-black border-2 border-r-0 border-t-0'>Pcs</th>
          </tr>
        </thead>
        <tbody className='bg-white text-black text-center'>
          {dataByYear.map((item, index) => (
            <tr key={index}>
              <td className='border-black border-2 border-l-0'>{getMonthName(parseInt(item.date.split('-')[1]))}</td>
              <td className='border-black border-2 border-r-0'>{item.value}</td>
            </tr>
          ))}
          {selectedYear == yearForecast && (
            <tr>
              <td className='bg-[#FFD700] border-black text-black border-2 border-l-0 border-b-0'>{forecastDataContext[0].month.split(' ')[0]}</td>
              <td className='bg-[#FFD700] border-black text-black border-2 border-r-0 border-b-0'>{forecastDataContext[0].forecast.toFixed(1)}</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  };

  return (
    <div>
      {displayDataByYear()}
    </div>
  );
};

export default DataTabel;
