"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";
import React, { FC, useRef } from "react";
import SplitType from "split-type";

interface Props {
  text: string;
  href: string;
}

const NavButton: FC<Props> = ({ text, href }) => {
  const container = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline>(null);

  const { contextSafe } = useGSAP(
    () => {
      if (!container.current) return;
      const moveAwaytext = new SplitType(
        container.current.querySelectorAll(".reveal-away"),
        {
          types: "words,chars",
        }
      );

      const moveTotext = new SplitType(
        container.current.querySelectorAll(".reveal-to"),
        { types: "words,chars" }
      );

      tl.current = gsap
        .timeline({
          defaults: {
            duration: 0.3,
            ease: "none",
          },
        })
        .to(moveAwaytext.chars, { yPercent: -100, stagger: 0.1 })
        .to(moveTotext.chars, { yPercent: -100, stagger: 0.1 }, 0);

      tl.current.pause();

      return () => {
        moveAwaytext.revert();
        moveTotext.revert();
      };
    },
    { scope: container }
  );

  const onMouseEnter = contextSafe(() => {
    if (!tl.current) return;
    tl.current.restart();
  });

  const onMouseLeave = contextSafe(() => {
    if (!tl.current) return;
    tl.current.reverse();
  });

  return (
    <div ref={container}>
      <Link
        href={href}
        className="relative overflow-y-hidden block"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <div className="reveal-away [font-kerning:none]">{text}</div>
        <div className="bottom-0 absolute reveal-to translate-y-full [font-kerning:none]">
          {text}
        </div>
      </Link>
    </div>
  );
};

export default NavButton;
