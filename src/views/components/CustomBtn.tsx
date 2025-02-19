import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { FC, useRef } from "react";

interface Props {
  text: string;
  classNames?: string;
}

const CustomBtn: FC<Props> = ({ text, classNames }) => {
  const btnRef = useRef<HTMLButtonElement>(null);
  const mainTl = useRef<gsap.core.Timeline>(null);

  const { contextSafe } = useGSAP(() => {
    if (!btnRef.current) return;

    mainTl.current = gsap
      .timeline({
        paused: true,
      })
      .to(btnRef.current.querySelector(".btn-ball"), { scale: 22 })
      .to(btnRef.current.querySelector(".btn-text"), { color: "black" }, "<");
  });

  const onMouseEnter = contextSafe(() => {
    if (!mainTl.current) return;
    mainTl.current.restart();
  });

  const onMouseLeave = contextSafe(() => {
    if (!mainTl.current) return;
    mainTl.current.reverse();
  });

  return (
    <button
      className={`rounded-full bg-black text-white px-6 py-2 relative overflow-hidden z-[1] border border-black ${classNames}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      ref={btnRef}
    >
      <span className="btn-text z-[1] text-clamp-md">{text}</span>
      <div className="btn-ball absolute bottom-0 left-1/2 w-[10px] translate-y-full -translate-x-1/2 rounded-full h-[10px] bg-white -z-[1]"></div>
    </button>
  );
};

export default CustomBtn;
