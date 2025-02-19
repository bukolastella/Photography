import { create } from "zustand";
import { RefObject } from "react";

interface RefStore {
  elementRef: RefObject<HTMLElement | null> | null;
  setElementRef: (ref: RefObject<HTMLElement | null>) => void;
  visibleId: null | number;
  setVisibleId: (id: number) => void;
  manualScroll: boolean;
  setManualScroll: (value: boolean) => void;
}

export const useCollectionsStore = create<RefStore>((set) => ({
  elementRef: null,
  setElementRef: (ref) => set({ elementRef: ref }),
  visibleId: 1,
  setVisibleId: (id) => set({ visibleId: id }),
  manualScroll: false,
  setManualScroll: (value) => set({ manualScroll: value }),
}));
