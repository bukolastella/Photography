"use client";
import React, { useEffect, useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { collectionsData } from "./data";
import { useCollectionsStore } from "@/store/useCollectionsStore";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { debounce } from "@/views/components/data";

const LeftSide = () => {
  const container = useRef<HTMLDivElement>(null);
  const elementRef = useCollectionsStore((state) => state.elementRef);
  const elementsRef = useRef<(HTMLDivElement | null)[]>([]);
  const { setVisibleId, scrollTl, setScrollTl } = useCollectionsStore();

  useEffect(() => {
    if (!scrollTl) {
      const tl = gsap.timeline();
      setScrollTl(tl);
    }
  }, [scrollTl, setScrollTl]);

  useGSAP(
    () => {
      gsap.to(".film", { delay: 1, scaleX: 0, duration: 1, ease: "none" });
      const elements = gsap.utils
        .toArray(".tamper-slide")
        .slice(1) as HTMLDivElement[];

      if (!elementRef?.current || !scrollTl) return;

      ScrollTrigger.create({
        trigger: elementRef.current,
        start: "top+=-50px top",
        end: "+=2000",
        pin: true,
        pinSpacing: true,
      });

      elements.forEach((ev, index) => {
        scrollTl
          .from(
            ev,
            {
              yPercent: 100,
              ease: "none",
            },
            index + 0.5
          )
          .addLabel(`${index + 2}`);
      });

      ScrollTrigger.create({
        trigger: container.current,
        // markers: true,
        scrub: 1,
        start: "top top",
        end: "+=1000",
        animation: scrollTl,
      });
    },
    { scope: container, dependencies: [elementRef], revertOnUpdate: true }
  );

  useLayoutEffect(() => {
    const observer = new IntersectionObserver(
      debounce((entries: IntersectionObserverEntry[]) => {
        if (entries.length > 1) return;

        entries.forEach((entry) => {
          const id = Number(entry.target.getAttribute("data-id"));

          if (entry.isIntersecting) {
            setVisibleId(id);
          } else {
            const previousId = id > 1 ? id - 1 : 1;

            setVisibleId(previousId);
          }
        });
      }, 500),
      { threshold: 0.5 }
    );

    elementsRef.current.forEach((element) => {
      if (element) observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, [setVisibleId]);

  return (
    <div className=" h-full relative overflow-hidden" ref={container}>
      <div className="absolute left-0 top-0 w-full h-full backdrop-grayscale z-[1] origin-[left_center] border-black border-r-[2px] film"></div>
      {collectionsData.map((ev, index) => (
        <div
          ref={(el) => {
            if (el) elementsRef.current[index] = el;
          }}
          data-id={(index + 1).toString()}
          key={index}
          className={`tamper-slide absolute left-0 top-0 w-full h-full gap-2 flex z[${
            index + 1
          }]`}
        >
          <div className="flex flex-col gap-2 h-full flex-1">
            <div className="flex-1 relative">
              <Image src={ev.value[0]} fill alt="" className="object-cover" />
            </div>
            <div className="flex-1 relative">
              <Image src={ev.value[1]} fill alt="" className="object-cover" />
            </div>
          </div>
          <div className="flex flex-col gap-2 flex-1 h-full">
            <div className="flex-[0.4] relative">
              <Image src={ev.value[2]} fill alt="" className="object-cover" />
            </div>
            <div className="flex-1 relative">
              <Image src={ev.value[3]} fill alt="" className="object-cover" />
            </div>
            <div className="flex-[0.4] relative">
              <Image src={ev.value[4]} fill alt="" className="object-cover" />
            </div>
          </div>
          <div className="flex flex-col gap-2 h-full flex-1">
            <div className="flex-1 relative">
              <Image src={ev.value[5]} fill alt="" className="object-cover" />
            </div>
            <div className="flex-1 relative">
              <Image src={ev.value[6]} fill alt="" className="object-cover" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LeftSide;
