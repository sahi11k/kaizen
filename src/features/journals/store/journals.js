import { create } from "zustand";

const useJournalsStore = create((set) => ({
  currentJournal: null,
  setCurrentJournal: (journal) => set(() => ({ currentJournal: journal })),
  unsavedJournal: null,
  setUnsavedJournal: (journal) => set(() => ({ unsavedJournal: journal })),
}));

export default useJournalsStore;
