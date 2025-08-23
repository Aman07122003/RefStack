import React from "react";

const Marker = () => {
  return (
    <div className="h-[30px] w-full flex justify-center items-center px-2 mb-6">
      <div className="relative flex items-center gap-2 px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 rounded-2xl text-xs sm:text-sm md:text-base text-green-600 bg-green-100 border border-green-200 shadow-sm">
        {/* Blinking light */}
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
        </span>

        {/* Text */}
        <span className="whitespace-nowrap">The Site is Online</span>
      </div>
    </div>
  );
};

export default Marker;
