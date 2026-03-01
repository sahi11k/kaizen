import { create } from "zustand";

interface PipState {
  pipWindow: Window | null;
  pipContainer: HTMLElement | null;
  setPipState: (pipWindow: Window, pipContainer: HTMLElement) => void;
  clearPipState: () => void;
}

const usePipStore = create<PipState>((set) => ({
  pipWindow: null,
  pipContainer: null,

  setPipState: (pipWindow, pipContainer) => set({ pipWindow, pipContainer }),
  clearPipState: () => set({ pipWindow: null, pipContainer: null }),
}));

export default usePipStore;
