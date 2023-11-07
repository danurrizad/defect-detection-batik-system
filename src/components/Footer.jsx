import React from 'react'

const Footer = () => {
  return (
    <div className='z-0'>
        <div className='footer-batik w-screen h-[15vh] bg-cover bg-center bg-no-repeat bg-secondary0 p-10' style={{fontFamily: "font-inter"}}>
        {/* <div className='w-screen h-[15vh] bg-cover bg-center bg-no-repeat p-5 bg-primary1' style={{backgroundImage: `url('/img/batik-footer-full.png')`}}> */}
            <div className='flex flex-col justify-center items-center text-white h-full 2xl:text-[17px] xl:text-[15px] lg:text-[12px] md:text-[11px] sm:text-[8px] text-[8px]'>
                <h1 className='text-center text-heading2 font-bold'>Produk ini merupakan proyek Capstone Tim B-03 2023 DTETI FT UGM. Produk ini tidak diperbolehkan untuk digunakan tanpa seizin tim.</h1>
                <h1 className='text-center text-heading2 font-bold'>©2023 Capstone B03 DTETI FT UGM</h1>
            </div>
        </div>
    </div>
  )
}

export default Footer