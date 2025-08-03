"use client";
import React, { useRef } from "react";
import { collectionsData } from "./data";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SplitType from "split-type";
import { useCollectionsStore } from "@/store/useCollectionsStore";
import CustomBtn from "@/views/components/CustomBtn";
import { useRouter } from "next/navigation";

const RightSide = () => {
  const router = useRouter();
  const container = useRef<HTMLDivElement>(null);
  const { visibleId, scrollTl } = useCollectionsStore();
  const selectedContent =
    collectionsData[visibleId ? visibleId - 1 : 0] || collectionsData[0];

  useGSAP(
    () => {
      if (!container.current || !visibleId) return;

      const tempNo = container.current.querySelector(
        ".side-up-no"
      ) as HTMLDivElement;
      const tempText = container.current.querySelector(
        ".side-up-text"
      ) as HTMLDivElement;

      const noSplit = new SplitType(tempNo);
      const textSplit = new SplitType(tempText);

      gsap.to(".bar-active", { width: 60 });
      gsap.from(".side-up", { yPercent: 100 });
      gsap.from([noSplit.chars, textSplit.chars], {
        yPercent: 100,
        stagger: {
          amount: 0.8,
        },
        onComplete: () => {
          noSplit.revert();
          textSplit.revert();
        },
      });

      return () => {
        noSplit.revert();
        textSplit.revert();
      };
    },
    {
      scope: container,
      dependencies: [visibleId],
      revertOnUpdate: true,
    }
  );

  return (
    <div
      className=" min-h-[300px] lg:h-full flex flex-col justify-between gap-6"
      ref={container}
    >
      <div>
        <h1 className="text-clamp-xl mb-6 underline lg:hidden">Collections</h1>
        <div className=" flex justify-between gap-6 flex-wrap items-start">
          <div className="flex flex-col gap-1">
            {collectionsData.map((ev, index) => {
              return (
                <button
                  className={`sm:w-max flex items-center gap-2 text-clamp-md ${
                    visibleId && visibleId === index + 1 && "font-semibold"
                  }`}
                  key={index}
                  onClick={() => {
                    if (!scrollTl?.scrollTrigger) return;

                    scrollTl.scrollTrigger.scroll(
                      scrollTl.scrollTrigger.labelToScroll(`${index + 1}`)
                    );

                    // gsap.to(window, {
                    //   duration: 0,
                    //   scrollTo: scrollTl?.scrollTrigger?.labelToScroll(
                    //     `${index + 1}`
                    //   ),
                    // });
                  }}
                >
                  <div
                    className={`w-[40px] h-[1px] bg-black ${
                      visibleId && visibleId === index + 1 && "bar-active"
                    }`}
                  ></div>
                  {ev.name}
                </button>
              );
            })}
          </div>

          {visibleId && (
            <div className=" overflow-hidden">
              <div className="text-clamp-5xl side-up-no [font-kerning:none]">
                {visibleId.toString().padStart(2, "0")}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="lg:text-right flex flex-col gap-2">
        <div className=" overflow-y-hidden">
          <h1 className="text-clamp-4xl side-up-text [font-kerning:none]">
            {selectedContent.name}
          </h1>
        </div>
        <div className=" overflow-y-hidden">
          <p className="text-clamp-md side-up">{selectedContent.subText}</p>
        </div>

        <CustomBtn
          text="View All Images"
          classNames="sm:ml-auto mt-6"
          onClick={() => router.push(`collections/${selectedContent.name}`)}
        />
      </div>
    </div>
  );
};

export default RightSide;
