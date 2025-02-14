import React from "react";
import { LandingImages } from "./data";

const RightSide = () => {
  return (
    <div className="bg-white h-full w-full border-l shadow-[4px_8px_10px_0px_#00000020,-4px_4px_10px_0px#00000020] p-6 pl-0 grid grid-cols-8 grid-rows-8 gap-1">
      {LandingImages.map((ev, index) => (
        <div key={index} className={`bg-red-300 ${ev.span}`}></div>
      ))}
    </div>
  );
};

export default RightSide;
