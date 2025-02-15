import React from "react";

const LenBox = () => {
  return (
    <>
      {/* top */}
      <div className="w-[33%] h-[2px] bg-black absolute top-0 left-0"></div>
      <div className="w-[33%] h-[2px] bg-black absolute top-0 right-0"></div>

      {/* left */}
      <div className="h-[33%] w-[2px] bg-black absolute top-0 left-0"></div>
      <div className="h-[33%] w-[2px] bg-black absolute bottom-0 left-0"></div>

      {/* bottom */}
      <div className="w-[33%] h-[2px] bg-black absolute bottom-0 left-0"></div>
      <div className="w-[33%] h-[2px] bg-black absolute bottom-0 right-0"></div>

      {/* right */}
      <div className="h-[33%] w-[2px] bg-black absolute top-0 right-0"></div>
      <div className="h-[33%] w-[2px] bg-black absolute bottom-0 right-0"></div>
    </>
  );
};

export default LenBox;
