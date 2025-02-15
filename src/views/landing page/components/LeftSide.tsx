"use client";
import React, { FC, useRef } from "react";
import { LandingImagesLeft } from "./data";
import WaveTextEffect from "@/views/effects/WaveTextEffect";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";
import gsap from "gsap";
import SlideImage from "./SlideImage";

interface Props {
  complete: boolean;
}

const LeftSide: FC<Props> = ({ complete }) => {
  const container = useRef<HTMLDivElement>(null);
  const mainTl = useRef<gsap.core.Timeline>(null);

  const { contextSafe } = useGSAP(
    () => {
      const slideTemp = gsap.effects.aniSlideImage(
        ".slide-image"
      ) as gsap.core.Timeline;

      if (!complete) {
        slideTemp.pause(0.1);
        return;
      }

      if (!container.current) return;

      new SplitType(container.current.querySelectorAll(".fade-in"), {
        types: "lines,words",
        lineClass: "overflow-hidden fade-line",
        wordClass: "fade-word ",
      });

      const fadeLines = gsap.utils.toArray(".fade-line") as HTMLDivElement[];

      const tl = gsap.timeline({
        defaults: {
          duration: 0.3,
          ease: "power2.out",
        },
      });

      fadeLines.forEach((ev) => {
        tl.from(ev.querySelectorAll(".fade-word"), { yPercent: 100 }, ">");
      });

      slideTemp.play();

      mainTl.current = gsap
        .timeline({
          paused: true,
        })
        .to(".btn-ball", { scale: 22 })
        .to(".btn-text", { color: "black" }, "<");
    },
    { scope: container, dependencies: [complete], revertOnUpdate: true }
  );

  const onMouseEnter = contextSafe(() => {
    if (!mainTl.current) return;
    mainTl.current.restart();
  });

  const onMouseLeave = contextSafe(() => {
    if (!mainTl.current) return;
    mainTl.current.reverse();
  });

  return (
    <div
      className=" bg-white h-full w-full border-r shadow-[-4px_8px_10px_0px_#00000020,4px_4px_10px_0px_#00000020] p-6 pr-1 flex flex-col gap-2"
      ref={container}
    >
      <div className="flex h-full">
        <div className="flex flex-col justify-end w-full h-full">
          <h1 className=" text-5xl">
            <WaveTextEffect text="Bukola Stella" />
          </h1>
          <h2 className="text-xl fade-in [font-kerning:none]">
            Creative Photographer
          </h2>
        </div>
        <div className=" grid grid-cols-5 grid-rows-7 h-full w-full gap-1">
          {LandingImagesLeft.map((ev, index) => (
            <SlideImage
              key={index}
              img={ev.img}
              xOrigin={ev.xOrigin}
              yOrigin={ev.yOrigin}
              span={ev.span}
            />
          ))}
        </div>
      </div>
      <div className="w-[100%] mt-auto flex flex-col gap-4">
        <p className="fade-in [font-kerning:none]">
          {`Through my lens, I transform ordinary moments into extraordinary
  stories. Specializing in creative and conceptual photography, I
  blend artistry with emotion to craft images that speak beyond
  words. From intimate portraits to bold editorial shoots, every
  frame is a masterpiece waiting to be told. Let's create something
  unforgettable.`}
        </p>
        <button
          className=" mr-auto rounded-full bg-black text-white px-6 py-2 relative overflow-hidden z-[1] border border-black"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <span className="btn-text z-[1]">See Collections</span>
          <div className="btn-ball absolute bottom-0 left-1/2 w-[10px] translate-y-full -translate-x-1/2 rounded-full h-[10px] bg-white -z-[1]"></div>
        </button>
      </div>
    </div>
  );
};

export default LeftSide;
