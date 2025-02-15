"use client";
import React, { useRef, useState } from "react";
import Header from "../layout/Header";
import LeftSide from "./components/LeftSide";
import RightSide from "./components/RightSide";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const LandingPage = () => {
  const blurry = useRef<HTMLDivElement>(null);
  const len = useRef<HTMLDivElement>(null);
  const lenText = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const [complete, setComplete] = useState(false);

  const onComplete = () => {
    setComplete(true);
  };

  useGSAP(() => {
    gsap.to([mainRef.current], { autoAlpha: 1 });

    gsap
      .timeline({
        onComplete,
      })
      .to(blurry.current, {
        backdropFilter: "blur(0px)",
        duration: 2,
        ease: "steps(3)",
      })
      .to(len.current, { scale: 0.8, duration: 2, ease: "elastic.inOut" }, "<")
      .to(
        lenText.current,
        { filter: "blur(0px)", duration: 3, ease: "elastic.inOut" },
        "<"
      )
      .to(lenText.current, { opacity: 0 })
      .to(
        len.current,
        {
          opacity: 0,
          ease: "elastic.inOut",
        },
        "<"
      )
      .to(blurry.current, { opacity: 0, duration: 1 });
  }, []);

  return (
    <div className="p-6 mx-auto min-h-screen flex flex-col gap-2">
      <Header />
      <div
        className="grid-cols-2 gap-0 grid flex-1 opacity-0 invisible"
        ref={mainRef}
      >
        <LeftSide complete={complete} />
        <RightSide complete={complete} />
      </div>
      <div
        className="fixed top-0 left-0 w-full h-full backdrop-blur-[3px] flex items-center justify-center z-[2] bg-white"
        ref={blurry}
      >
        <div
          className="relative w-64 h-40 flex items-center justify-center"
          ref={len}
        >
          <h1 className="blur text-2xl" ref={lenText}>
            Timeless Shots
          </h1>

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
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
