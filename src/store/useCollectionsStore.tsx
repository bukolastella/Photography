import { create } from "zustand";
import { RefObject } from "react";

interface RefStore {
  elementRef: RefObject<HTMLElement | null> | null;
  setElementRef: (ref: RefObject<HTMLElement | null>) => void;
  visibleId: number;
  setVisibleId: (id: number) => void;
  scrollTl: gsap.core.Timeline | null;
  setScrollTl: (ref: gsap.core.Timeline | null) => void;
}

export const useCollectionsStore = create<RefStore>((set) => ({
  elementRef: null,
  setElementRef: (ref) => set({ elementRef: ref }),
  visibleId: 1,
  setVisibleId: (id) => set({ visibleId: id }),
  scrollTl: null,
  setScrollTl: (ref) => set({ scrollTl: ref }),
}));
