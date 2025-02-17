"use client";
import React, { useRef } from "react";
import { collectionsData } from "./data";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SplitType from "split-type";

const RightSide = () => {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!container.current) return;

      const split = new SplitType(
        container.current.querySelectorAll(".side-up-text")
      );
      // gsap.set(".side-up", { overflowY: "hidden", yPercent: 100 });
      gsap.from(".side-up", { yPercent: 100, delay: 1 });
      gsap.from(split.chars, {
        yPercent: 100,
        delay: 1,
        stagger: {
          amount: 0.8,
        },
      });
    },
    { scope: container }
  );

  return (
    <div className="h-full flex flex-col justify-between" ref={container}>
      <div className=" flex justify-between gap-6 flex-wrap items-start">
        <div className="flex flex-col gap-1">
          {collectionsData.map((ev, index) => {
            return (
              <button
                className=" w-max flex items-center gap-2 text-clamp-md"
                key={index}
              >
                <div className=" w-[60px] h-[1px] bg-black"></div>
                {ev.name}
              </button>
            );
          })}
        </div>

        <div className=" overflow-hidden">
          <div className="text-clamp-5xl side-up-text [font-kerning:none]">
            01
          </div>
        </div>
      </div>

      <div className=" text-right flex flex-col gap-2">
        <div className=" overflow-y-hidden">
          <h1 className="text-clamp-4xl side-up-text [font-kerning:none]">
            Light & Shadow Chronicles
          </h1>
        </div>
        <div className=" overflow-y-hidden">
          <p className="text-clamp-md side-up">
            A play of contrast, depth, and emotion through the lens of artistic
            vision.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RightSide;
