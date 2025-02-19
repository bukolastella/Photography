"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useRef } from "react";
import Img2 from "../../../../public/img-2.webp";
import Image from "next/image";

const SingleCollectionPage = () => {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      //   const elements = gsap.utils
      //     .toArray(".tamper-slide")
      //     .slice(1) as HTMLDivElement[];
      //   ScrollTrigger.create({
      //     trigger: container.current,
      //     start: "top+=-50px top",
      //     end: "+=2000",
      //     pin: true,
      //     pinSpacing: true,
      //     // markers: true,
      //   });
      ScrollTrigger.create({
        trigger: container.current,
        // markers: true,
        scrub: 1,
        start: "top top",
        end: "+=2000",
        animation: gsap.timeline().to(".img-container", { yPercent: -85 }),
        pin: true,
      });
    },
    { scope: container, dependencies: [] }
  );

  return (
    <div
      ref={container}
      className=" bg-white min-h-full w-full shadow-[-4px_8px_10px_0px_#00000020,4px_4px_10px_0px_#00000020] px-[5%] lg:px-6 flex-grow flex items-center justify-center relative flex-col overflow-y-hidden"
    >
      <div className="h-[80px] border-b border-black w-full border-dashed backdrop-grayscale z-[1]"></div>
      {/*  */}
      <div className="flex flex-col gap-6 flex-1 w-full h-full relative">
        <div className="absolute top-0 left-0 items-center w-full flex flex-col gap-6 img-container">
          {new Array(4).fill(1).map((ev, index) => (
            <div
              key={index}
              className=" w-[700px] h-[400px] border-[20px] border-[#e5e5e5] my-6 relative"
            >
              <Image alt="" src={Img2} className=" object-cover" fill />
            </div>
          ))}
        </div>
      </div>

      <div className="h-[80px] border-t border-black w-full border-dashed  backdrop-grayscale z-[1]"></div>
    </div>
  );
};

export default SingleCollectionPage;
