import { create } from "zustand";
import { Journal } from "@/features/journals/types";

interface JournalsState {
  currentJournal: Journal | null;
  setCurrentJournal: (journal: Journal | null) => void;
  unsavedJournal: Journal | null;
  setUnsavedJournal: (journal: Journal | null) => void;
}

const useJournalsStore = create<JournalsState>((set) => ({
  currentJournal: null,
  setCurrentJournal: (journal) => set(() => ({ currentJournal: journal })),
  unsavedJournal: null,
  setUnsavedJournal: (journal) => set(() => ({ unsavedJournal: journal })),
}));

export default useJournalsStore;
