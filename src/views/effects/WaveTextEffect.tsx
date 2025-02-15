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

      const split = new SplitType(
        container.current.querySelectorAll(".move-away")
      );

      if (!split.chars) return;

      split.chars.forEach((char) => {
        const clone = char.cloneNode(true) as HTMLElement;
        clone.classList.add("clone");

        clone.style.position = "absolute";
        clone.style.top = "0";
        clone.style.left = "0";

        char.appendChild(clone);
      });

      gsap.set(split.chars, { yPercent: 100 });

      gsap
        .timeline({
          defaults: {
            duration: 0.3,
            ease: "power1.out",
            paused: isOnClick,
          },
        })
        .to(".clone", { yPercent: -100, stagger: 0.1 })
        .set(".clone", { opacity: 0, stagger: 0.1 }, 0.2)
        .to(split.chars, { yPercent: 0, stagger: 0.1 }, 0);

      return () => {
        split.revert();
      };
    },

    { scope: container, dependencies: [isPageLoaded] }
  );

  return (
    <div ref={container} className="overflow-y-hidden relative">
      <div className="move-away [font-kerning:none] relative">{text}</div>
    </div>
  );
};

export default WaveTextEffect;
