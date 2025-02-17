"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { collectionsData } from "./data";
import { useCollectionsStore } from "@/store/useCollectionsStore";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const LeftSide = () => {
  const container = useRef<HTMLDivElement>(null);
  const elementRef = useCollectionsStore((state) => state.elementRef);

  useGSAP(
    () => {
      gsap.to(".film", { delay: 1, scaleX: 0, duration: 1, ease: "none" });
      const elements = gsap.utils
        .toArray(".tamper-slide")
        .slice(1) as HTMLDivElement[];

      if (!elementRef?.current) return;

      ScrollTrigger.create({
        trigger: elementRef.current,
        start: "top+=-50px top",
        pin: true,
        pinSpacing: true,
      });

      gsap.from(elements, {
        yPercent: 100,
        stagger: 1,
        ease: "none",
        scrollTrigger: {
          trigger: container.current,
          markers: true,
          scrub: 0.3,
          start: "top top",
          end: "+=500",
        },
      });
    },
    { scope: container, dependencies: [elementRef], revertOnUpdate: true }
  );

  return (
    <div className=" h-full relative overflow-hidden" ref={container}>
      <div className="absolute left-0 top-0 w-full h-full backdrop-grayscale z-[1] origin-[left_center] border-black border-r-[2px] film"></div>
      {collectionsData.map((ev, index) => (
        <div
          key={index}
          className={`tamper-slide absolute left-0 top-0 w-full h-full gap-2 flex z[${
            index + 1
          }]`}
        >
          <div className="flex flex-col gap-2 h-full flex-1">
            <div className="flex-1 relative">
              <Image src={ev.value[0]} fill alt="" className="object-cover" />
            </div>
            <div className="flex-1 relative">
              <Image src={ev.value[1]} fill alt="" className="object-cover" />
            </div>
          </div>
          <div className="flex flex-col gap-2 flex-1 h-full">
            <div className="flex-[0.4] relative">
              <Image src={ev.value[2]} fill alt="" className="object-cover" />
            </div>
            <div className="flex-1 relative">
              <Image src={ev.value[3]} fill alt="" className="object-cover" />
            </div>
            <div className="flex-[0.4] relative">
              <Image src={ev.value[4]} fill alt="" className="object-cover" />
            </div>
          </div>
          <div className="flex flex-col gap-2 h-full flex-1">
            <div className="flex-1 relative">
              <Image src={ev.value[5]} fill alt="" className="object-cover" />
            </div>
            <div className="flex-1 relative">
              <Image src={ev.value[6]} fill alt="" className="object-cover" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LeftSide;
