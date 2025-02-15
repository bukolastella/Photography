"use client";
import React, { useRef } from "react";
import { LandingImages } from "./data";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SlideImage from "./SlideImage";

const RightSide = () => {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.effects.aniSlideImage(".slide-image");
    },
    { scope: container }
  );

  return (
    <div
      className="bg-white h-full w-full border-l shadow-[4px_8px_10px_0px_#00000020,-4px_4px_10px_0px#00000020] p-6 pl-1 grid grid-cols-8 grid-rows-8 gap-1"
      ref={container}
    >
      {LandingImages.map((ev, index) => (
        <SlideImage
          key={index}
          img={ev.img}
          xOrigin={ev.xOrigin}
          yOrigin={ev.yOrigin}
          span={ev.span}
        />
      ))}
    </div>
  );
};

export default RightSide;
