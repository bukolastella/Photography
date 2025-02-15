"use client";
import React from "react";
import Header from "../layout/Header";
import LeftSide from "./components/LeftSide";
import RightSide from "./components/RightSide";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const LandingPage = () => {
  useGSAP(() => {
    gsap.to("body", { opacity: 1, duration: 0.5 });
  }, []);

  return (
    <div className=" p-6 mx-auto min-h-screen flex flex-col gap-2">
      <Header />
      <div className=" grid-cols-2 gap-0 grid flex-1">
        <LeftSide />
        <RightSide />
      </div>
    </div>
  );
};

export default LandingPage;
