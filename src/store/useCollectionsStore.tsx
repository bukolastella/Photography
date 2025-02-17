import { create } from "zustand";
import { RefObject } from "react";

interface RefStore {
  elementRef: RefObject<HTMLElement | null> | null;
  setElementRef: (ref: RefObject<HTMLElement | null>) => void;
}

export const useCollectionsStore = create<RefStore>((set) => ({
  elementRef: null,
  setElementRef: (ref) => set({ elementRef: ref }),
}));
