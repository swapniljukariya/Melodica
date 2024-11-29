import React from 'react';

const ShimmerLoader = () => {
  return (
    <div className="flex overflow-x-auto space-x-12 p-4">
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="flex-shrink-0 text-center">
          {/* Shimmer Circle */}
          <div className="w-40 h-40 rounded-full bg-gray-200 shimmer-effect"></div>
          {/* Shimmer Text */}
          <div className="w-32 h-6 mt-4 bg-gray-200 shimmer-effect"></div>
        </div>
      ))}
    </div>
  );
};

export default ShimmerLoader;
