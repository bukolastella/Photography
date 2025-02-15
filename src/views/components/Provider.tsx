"use client";
import React, { FC, ReactNode } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
gsap.registerPlugin(useGSAP, ScrollTrigger);

interface Props {
  children: ReactNode;
}

const Provider: FC<Props> = ({ children }) => {
  gsap.registerEffect({
    name: "aniSlideImage",
    effect: (targets: string) => {
      const elements = (gsap.utils.toArray(targets) as HTMLDivElement[]).filter(
        (target: HTMLDivElement) => {
          const yorigin = Number(target.getAttribute("data-yorigin"));
          const xorigin = Number(target.getAttribute("data-xorigin"));
          return !(yorigin === 0 && xorigin === 0);
        }
      );

      return gsap
        .timeline()
        .set(elements, {
          opacity: 0,
        })
        .to(elements, { opacity: 1, duration: 0.1 }, 0.2)
        .from(elements, {
          xPercent: (index: number, target: HTMLElement) => {
            const value = Number(target.dataset.xorigin) || 0;

            if (value === 0) return 0;
            const temp = 4;

            return value < 0 ? value - temp : value + temp;
          },
          yPercent: (index: number, target: HTMLElement) => {
            const value = Number(target.dataset.yorigin) || 0;

            if (value === 0) return 0;
            const temp = 4;

            return value < 0 ? value - temp : value + temp;
          },
          rotation: "random(45,90)",
          duration: 2,
          ease: "expo.out",
          stagger: {
            amount: 1,
            from: "random",
            ease: "power1.out",
          },
        });
    },
    defaults: {},
    extendTimeline: true,
  });

  return <div>{children}</div>;
};

export default Provider;
