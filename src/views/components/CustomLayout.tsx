"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { FC, useRef } from "react";

interface Props {
  leftSide: React.JSX.Element;
  rightSide: React.JSX.Element;
}

const CustomLayout: FC<Props> = ({ leftSide, rightSide }) => {
  const mainRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.to([mainRef.current], { autoAlpha: 1 });
  }, []);

  return (
    <>
      <div
        className="lg:grid-cols-2 gap-0 grid flex-1 opacity-0 invisible h-full"
        ref={mainRef}
      >
        <div className=" bg-white h-full w-full border-r shadow-[-4px_8px_10px_0px_#00000020,4px_4px_10px_0px_#00000020] p-[5%] sm:p-6 sm:pr-1">
          {leftSide}
        </div>
        <div className="bg-white h-[600px] lg:h-full w-full border-l shadow-[4px_8px_10px_0px_#00000020,-4px_4px_10px_0px#00000020]  p-[5%] sm:p-6 sm:pl-1">
          {rightSide}
        </div>
      </div>
    </>
  );
};

export default CustomLayout;
