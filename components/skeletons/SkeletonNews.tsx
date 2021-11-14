import React from 'react';

const SkeletonNews = () => {
  return (
    <div className="h-40 shadow-sm rounded-sm w-full my-6 animate-pulse bg-gray-200 overflow-hidden relative">
      <div className="h-10 absolute bottom-0 w-full  animate-pulse bg-gray-300 bg-opacity-50"></div>
    </div>
  );
};

export default SkeletonNews;
