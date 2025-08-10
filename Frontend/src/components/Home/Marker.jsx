import React from "react";

const Marker = () => {
  return (
    <div className="h-[30px] w-full flex justify-center items-center">
      <div className="flex items-center gap-2 px-5 py-2 rounded-2xl text-sm text-green-500 bg-green-100 border border-green-200">
        {/* Blinking light */}
        <span className="h-3 w-3 rounded-full bg-green-500 animate-ping"></span>
        <span className="h-3 w-3 rounded-full bg-green-500 absolute"></span>

        {/* Text */}
        <span>The Site is Online</span>
      </div>
    </div>
  );
};

export default Marker;
