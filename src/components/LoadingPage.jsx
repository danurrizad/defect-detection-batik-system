import React from 'react';

const LoadingPage = ({text}) => {
  return (
    <div className=' min-h-screen bg-slate-200 bg-opacity-90 fixed w-screen top-0 left-0 z-10'>
        <div className="flex flex-col justify-center items-center h-screen ">
          <div className="border-t-8 border-primary1 border-solid rounded-full w-16 h-16 animate-spin"></div>
          <h1 className='animate-pulse font-bold'>{text}</h1>
        </div>
    </div>
  );
};

export default LoadingPage;
