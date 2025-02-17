"use client";
import React, { useRef } from "react";
import { LandingImages } from "./data";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SlideImage from "./SlideImage";
import { useAnimationStore } from "@/store/useAnimationStore";

const RightSide = () => {
  const container = useRef<HTMLDivElement>(null);
  const isPageLoaded = useAnimationStore((state) => state.isPageLoaded);

  useGSAP(
    () => {
      const slideTemp = gsap.effects.aniSlideImage(
        ".slide-image"
      ) as gsap.core.Timeline;

      if (!isPageLoaded) {
        slideTemp.pause(0.1);
      } else {
        slideTemp.play();
      }
    },
    { scope: container, dependencies: [isPageLoaded], revertOnUpdate: true }
  );

  return (
    <div className="grid grid-cols-8 grid-rows-8 gap-1 h-full" ref={container}>
      {LandingImages.map((ev, index) => (
        <SlideImage
          key={index}
          img={ev.img}
          xOrigin={ev.xOrigin}
          yOrigin={ev.yOrigin}
          span={ev.span}
          sizes={ev.sizes}
        />
      ))}
    </div>
  );
};

export default RightSide;
