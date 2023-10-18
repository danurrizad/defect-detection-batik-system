import React, { useState, useEffect } from 'react';

const DataTabel = ({ selectedYear }) => {
  const [tahun, setTahun] = useState('');
  const [csvDataLocal, setCsvDataLocal] = useState([])

  useEffect(()=>{
    const storedDataLocal = localStorage.getItem('csvDataJson')
    if(storedDataLocal){
        const dataJson = JSON.parse(storedDataLocal);
        setCsvDataLocal(dataJson) 
    }
  },[])

  const displayDataByYear = () => {
    if (!selectedYear) {
      return null;
    }

    const dataByYear = Object.values(csvDataLocal).filter(
      (item) => item.date.startsWith(selectedYear)
    );

    if (dataByYear.length === 0) {
      return <p>Data tidak ditemukan untuk tahun {selectedYear}.</p>;
    }

    const getMonthName = (monthNumber) => {
        const monthNames = [
          'Januari', 'Februari', 'Maret', 'April',
          'Mei', 'Juni', 'Juli', 'Agustus',
          'September', 'Oktober', 'November', 'Desember'
        ];
        return monthNames[monthNumber - 1] || '';
      };

    return (
      <table className='table shadow-xl 2xl:text-[24px] text-[14px]'>
        <thead>
          <tr className='bg-primary1 text-white'>
            <th className='w-40 border-white border-2 '>Bulan</th>
            <th className='w-40 border-white border-2 '>Pcs</th>
          </tr>
        </thead>
        <tbody className='bg-primary3 text-white text-center'>
          {dataByYear.map((item, index) => (
            <tr key={index}>
              <td className='border-white border-2 '>{getMonthName(parseInt(item.date.split('-')[1]))}</td>
              <td className='border-white border-2 '>{item.value}</td>
            </tr>
          ))}
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
