import React, { useContext, useState } from 'react'

const UploadGuide = () => {
    const [selectedTab, setSelectedTab] = useState('expo'); // 'upload' or 'expo'

    const toggleTab = (tab) => {
      setSelectedTab(tab);
    };

    const downloadFile = (fileurl, filename) => {
        // const fileUrl = '/download_path/Contoh-File-CSV.csv'; // Sesuaikan dengan path ke file Anda
    
        // Buat elemen anchor untuk memicu unduhan
        const link = document.createElement('a');
        link.href = fileurl;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };

      
      return (
        <div className='bg-heading2 w-2/3 2xl:min-h-[400px] min-h-[250px] rounded-xl shadow-sm shadow-black' style={{ fontFamily: 'font-inter' }}>
          <div className='flex mb-4 w-full justify-between gap-0'>
              <button
                className={`w-full px-4 py-2 bg-${selectedTab === 'upload' ? 'secondary1' : 'gray'} text-white rounded-tl-xl shadow-sm shadow-black hover:bg-blue-400`}
                onClick={() => toggleTab('upload')}
              >
                Panduan Upload File CSV
              </button>
              <button
                className={`w-full px-4 py-2 bg-${selectedTab === 'expo' ? 'secondary1' : 'gray'} text-white rounded-tr-xl shadow-sm shadow-black hover:bg-blue-400`}
                onClick={() => toggleTab('expo')}
              >
                Panduan Expo
              </button>
          </div>
          <div className='p-4 flex flex-col items-center justify-center'>
            <div className='text-center text-white font-bold'>
              {selectedTab === 'upload' ? 'Panduan Upload File CSV' : 'Panduan Expo'}
            </div>
            {selectedTab === 'upload' ? (
              <>
                <img className='w-' src='/img/upload-guide.png' alt='Upload Guide' />
                <button onClick={()=>downloadFile('/download_path/Contoh-File-CSV.csv', 'Contoh-File-CSV.csv')} className='px-4 py-2 bg-green-400 shadow-md hover:bg-green-600 text-white rounded-xl'>
                  Download contoh file CSV
                </button>
              </>
            ) : (
              <>
                <div className='bg-white p-4 mt-2 '>
                  <p>Silakan pilih dan download file di bawah ini, kemudian upload File CSV tersebut pada bagian yang disediakan</p>
                </div>
                <div className='flex justify-center gap-2 mt-10 2xl:flex-row xl:flex-row lg:flex-row md:flex-col sm:flex-row flex-col'>
                  <button onClick={()=>downloadFile('/download_path/File-CSV-Expo1.csv', 'File-CSV-Expo1.csv')} className='px-4 py-2 bg-green-400 shadow-md hover:bg-green-600 text-white rounded-xl'>
                    Download file CSV 1
                  </button>
                  <button onClick={()=>downloadFile('/download_path/File-CSV-Expo2.csv', 'File-CSV-Expo2.csv')} className='px-4 py-2 bg-green-400 shadow-md hover:bg-green-600 text-white rounded-xl'>
                    Download file CSV 2
                  </button>
                  <button onClick={()=>downloadFile('/download_path/File-CSV-Expo3.csv', 'File-CSV-Expo3.csv')} className='px-4 py-2 bg-green-400 shadow-md hover:bg-green-600 text-white rounded-xl'>
                    Download file CSV 3
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      );
}

export default UploadGuide 