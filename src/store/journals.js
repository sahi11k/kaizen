import { create } from "zustand";

const useJournalsStore = create((set) => ({
  journals: [],
  setJournals: (updatedJournals) => set(() => ({ journals: updatedJournals })),
  updateJournal: (journal) =>
    set((state) => ({
      journals: state.journals.map((j) => (j.id === journal.id ? journal : j)),
    })),
}));

export default useJournalsStore;
