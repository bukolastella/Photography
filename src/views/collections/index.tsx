"use client";
import React, { useEffect, useRef } from "react";
import CustomLayout from "../components/CustomLayout";
import LeftSide from "./components/LeftSide";
import RightSide from "./components/RightSide";
import { useCollectionsStore } from "@/store/useCollectionsStore";

const CollectionsPage = () => {
  const container = useRef<HTMLDivElement>(null);

  const setElementRef = useCollectionsStore((state) => state.setElementRef);

  useEffect(() => {
    if (container.current) {
      setElementRef(container);
    }
  }, [setElementRef]);

  return (
    <div ref={container} className=" flex-grow">
      <CustomLayout leftSide={<LeftSide />} rightSide={<RightSide />} />
    </div>
  );
};

export default CollectionsPage;
