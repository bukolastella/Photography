"use client";
import React, { useRef } from "react";
import { LandingImagesLeft } from "./data";
import Image from "next/image";
import WaveTextEffect from "@/views/effects/WaveTextEffect";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";
import gsap from "gsap";

const LeftSide = () => {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      new SplitType(".fade-in", {
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
    },
    { scope: container }
  );

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
            <div key={index} className={`relative ${ev.span}`}>
              <Image fill src={ev.img} alt="" className="object-cover" />
            </div>
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
        <button className=" mr-auto rounded-full bg-black text-white px-6 py-2 ">
          See Collections
        </button>
      </div>
    </div>
  );
};

export default LeftSide;
