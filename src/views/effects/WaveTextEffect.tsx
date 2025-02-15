"use client";
import React, { FC, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";
import { useAnimationStore } from "@/store/useAnimationStore";

interface Props {
  text: string;
  isOnClick?: boolean;
}

const WaveTextEffect: FC<Props> = ({ text, isOnClick }) => {
  const container = useRef<HTMLDivElement>(null);
  const isPageLoaded = useAnimationStore((state) => state.isPageLoaded);

  useGSAP(
    () => {
      if (!container.current || !isPageLoaded) return;
      const moveAwaytext = new SplitType(
        container.current.querySelectorAll(".move-away"),
        {
          types: "words,chars",
        }
      );
      const moveTotext = new SplitType(
        container.current.querySelectorAll(".move-to"),
        { types: "words,chars" }
      );

      gsap
        .timeline({
          defaults: {
            duration: 0.3,
            ease: "none",
            paused: isOnClick,
          },
        })
        .to(moveAwaytext.chars, { yPercent: -100, stagger: 0.1 })
        .to(moveTotext.chars, { yPercent: -100, stagger: 0.1 }, 0);

      return () => {
        moveAwaytext.revert();
        moveTotext.revert();
      };
    },

    { scope: container, dependencies: [isPageLoaded] }
  );

  return (
    <div ref={container} className="overflow-y-hidden relative">
      <div className="move-away [font-kerning:none]">{text}</div>
      <div className="bottom-0 absolute move-to translate-y-full [font-kerning:none]">
        {text}
      </div>
    </div>
  );
};

export default WaveTextEffect;
