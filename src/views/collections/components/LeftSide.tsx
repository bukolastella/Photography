"use client";
import React, { useLayoutEffect, useRef } from "react";
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
  const { visibleId, setVisibleId, manualScroll, setManualScroll } =
    useCollectionsStore();

  useGSAP(
    () => {
      gsap.to(".film", { delay: 1, scaleX: 0, duration: 1, ease: "none" });
      const elements = gsap.utils
        .toArray(".tamper-slide")
        .slice(1) as HTMLDivElement[];

      if (!elementRef?.current) return;

      ScrollTrigger.create({
        trigger: elementRef.current,
        start: "top+=-50px top",
        end: "+=2000",
        pin: true,
        pinSpacing: true,
      });

      gsap.from(elements, {
        yPercent: 100,
        stagger: 0.5,
        ease: "none",
        scrollTrigger: {
          trigger: container.current,
          // markers: true,
          scrub: 1,
          start: "top top",
          end: "+=1000",
        },
      });
    },
    { scope: container, dependencies: [elementRef], revertOnUpdate: true }
  );

  useGSAP(
    () => {
      if (!container.current || !visibleId || !manualScroll) return;

      const element = gsap.utils.toArray(".tamper-slide")[
        visibleId - 1
      ] as HTMLDivElement[];

      gsap.fromTo(
        element,
        { yPercent: 100 },
        { yPercent: 0, duration: 2, onComplete: () => setManualScroll(false) }
      );
    },
    {
      scope: container,
      dependencies: [visibleId],
    }
  );

  useLayoutEffect(() => {
    if (manualScroll) return;

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
  }, [setVisibleId, manualScroll]);

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
