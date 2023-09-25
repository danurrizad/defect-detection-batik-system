import React from 'react'

import Header from '../components/Header'

// import { Bar } from 'react-chartjs-2';
// import faker from 'faker';
// import 'chartjs-adapter-date-fns';
// import { Chart, Title, Tooltip, Legend } from 'chart.js';

// Register required plugins and scales
// Chart.register(Title, Tooltip, Legend);

// const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

// const data = {
//   labels,
//   datasets: [
//     {
//       label: 'Dataset 1',
//       data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
//       backgroundColor: 'rgba(255, 99, 132, 0.5)',
//     },
//     {
//       label: 'Dataset 2',
//       data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
//       backgroundColor: 'rgba(53, 162, 235, 0.5)',
//     },
//   ],
// };

// const options = {
//   plugins: {
//     legend: {
//       position: 'top',
//     },
//     title: {
//       display: true,
//       text: 'Chart.js Bar Chart',
//     },
//   },
// };


const Forecasting = ({user, setUser}) => {
  if(user == "ADMIN") return (
    <div className='min-h-screen bg-primary5 font-heading'>
      <Header title="PERKIRAAN PENJUALAN" user={user} setUser={setUser}/>

      {/* Content */}
      <div className='2xl:p-10 p-2 2xl:pt-0 pt-10 font-heading flex 2xl:flex-row flex-col 2xl:gap-0 gap-20 justify-between'>
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
        <div>
          {/* Produk dan Tahun */}
          <div className='flex justify-end gap-10 2xl:text-[24px] text-[14px]'>
            <div className='flex justify-center gap-4'>
              Produk
              <div className=' bg-primary2 2xl:px-10 px-2 text-white'>Batik Kawang</div>
            </div>
            <div className='flex justify-center gap-4'>
              Tahun
              <div className=' bg-primary2 2xl:px-10 px-4 text-white'>2023</div>
            </div>
          </div>

          {/* Chart Bar */}
          <div className='py-4'>
            <div className='2xl:h-[400px] h-[300px] 2xl:w-[900px] w-full bg-primary2 border-white border-2 shadow-xl'></div>
          </div>

          <div className='pb-10'>
            <h2>Saran stok produk bulan depan : <span className='2xl:p-2 p-1 px-2 rounded-xl shadow-xl text-white bg-primary2'>Tingkatkan</span></h2>
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