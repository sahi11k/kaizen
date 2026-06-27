import { create } from "zustand";
import { Journal } from "@/features/journals/types";

interface JournalsState {
  unsavedJournal: Journal | null;
  setUnsavedJournal: (journal: Journal | null) => void;
  resetJournals: () => void;
}

const useJournalsStore = create<JournalsState>((set) => ({
  unsavedJournal: null,
  setUnsavedJournal: (journal) => set(() => ({ unsavedJournal: journal })),
  resetJournals: () =>
    set(() => ({
      unsavedJournal: null,
    })),
}));

export default useJournalsStore;
