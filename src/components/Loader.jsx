// Loader.js
import React from 'react';

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-10 h-10 absolute ml-[700px] mb-[370px] border-4 border-dashed rounded-full animate-spin border-gray-600"></div>
    </div>
  );
};

export default Loader;
