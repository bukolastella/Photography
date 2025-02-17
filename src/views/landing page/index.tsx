"use client";
import React from "react";
import LeftSide from "./components/LeftSide";
import RightSide from "./components/RightSide";
import CustomLayout from "../components/CustomLayout";

const LandingPage = () => {
  return <CustomLayout leftSide={<LeftSide />} rightSide={<RightSide />} />;
};

export default LandingPage;
