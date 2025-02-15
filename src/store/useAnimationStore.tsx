import { create } from "zustand";

interface AnimationState {
  isPageLoaded: boolean;
  setPageLoaded: () => void;
}

export const useAnimationStore = create<AnimationState>((set) => ({
  isPageLoaded: false,
  setPageLoaded: () => set({ isPageLoaded: true }),
}));
