import { create } from "zustand";

const usePipStore = create((set) => ({
  pipWindow: null,
  pipContainer: null,

  setPipState: (pipWindow, pipContainer) => set({ pipWindow, pipContainer }),
  clearPipState: () => set({ pipWindow: null, pipContainer: null }),
}));

export default usePipStore;
