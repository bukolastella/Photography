"use client";
import React, {
  FC,
  MouseEvent,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import LenBox from "./LenBox";
import { useAnimationStore } from "@/store/useAnimationStore";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollToPlugin);

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

      const mm = gsap.matchMedia();

      const tl = gsap.timeline();

      mm.add("(min-width: 1024px)", () => {
        tl.set(elements, {
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
      });

      mm.add("(max-width: 1023px)", () => {
        tl.from(elements, {
          opacity: 0,
          duration: 2,
          ease: "expo.out",
          stagger: {
            amount: 1,
            from: "random",
            ease: "power1.out",
          },
        });
      });

      return tl;
    },
    extendTimeline: true,
  });

  const app = useRef<HTMLDivElement>(null);
  const xTo = useRef<gsap.QuickToFunc>(null);
  const yTo = useRef<gsap.QuickToFunc>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const setPageLoaded = useAnimationStore((state) => state.setPageLoaded);
  const isPageLoaded = useAnimationStore((state) => state.isPageLoaded);
  const blurry = useRef<HTMLDivElement>(null);
  const len = useRef<HTMLDivElement>(null);
  const lenText = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  useEffect(() => {
    if (!isPageLoaded) {
      document.documentElement.classList.add("overflow-hidden", "h-screen");
      document.body.classList.add("overflow-hidden", "h-screen");
    } else {
      document.documentElement.classList.remove("overflow-hidden", "h-screen");
      document.body.classList.remove("overflow-hidden", "h-screen");
    }
  }, [isPageLoaded]);

  const { contextSafe } = useGSAP(
    () => {
      xTo.current = gsap.quickTo(".capture", "x", {
        duration: 0.8,
        ease: "power3",
      });

      yTo.current = gsap.quickTo(".capture", "y", {
        duration: 0.8,
        ease: "power3",
      });

      //
      gsap
        .timeline({
          onComplete: setPageLoaded,
        })
        .to(blurry.current, {
          backdropFilter: "blur(0px)",
          duration: 2,
          ease: "steps(3)",
        })
        .to(
          len.current,
          { scale: 0.8, duration: 2, ease: "elastic.inOut" },
          "<"
        )
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
        .to(blurry.current, {
          opacity: 0,
          duration: 1,
        });
    },
    { scope: app }
  );

  const moveShape = contextSafe((e: MouseEvent) => {
    if (!xTo.current || !yTo.current) return;
    xTo.current(e.clientX);
    yTo.current(e.clientY);
  });

  return (
    <div ref={app} onMouseMove={(e) => moveShape(e)}>
      <div
        className="fixed top-0 left-0 -translate-y-1/2 -translate-x-1/2  w-[100px] h-[100px] flex items-center justify-center capture z-[2] pointer-events-none"
        style={{
          display: isTouchDevice ? "hidden" : "flex",
          // WebkitMaskImage:
          //   "radial-gradient(circle, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%)",
          backdropFilter: "grayscale(1)",
        }}
      >
        <div className=" w-[10px] h-[10px] border border-black rounded-full !bg-transparent"></div>
        <LenBox />
      </div>
      {children}
      <div
        className={`fixed top-0 left-0 w-full h-full backdrop-blur-[3px] flex items-center justify-center z-[2] bg-white ${
          isPageLoaded ? "hidden" : ""
        }`}
        ref={blurry}
      >
        <div
          className="relative w-64 h-40 flex items-center justify-center"
          ref={len}
        >
          <h1 className="blur text-2xl" ref={lenText}>
            Timeless Shots
          </h1>

          <LenBox />
        </div>
      </div>
    </div>
  );
};

export default Provider;
