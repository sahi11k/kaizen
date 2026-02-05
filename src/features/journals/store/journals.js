import { create } from "zustand";
import { STATUS } from "@/shared/constants/db";

const useJournalsStore = create((set) => ({
  journals: [],
  journalsFetchStatus: STATUS.LOADING,
  setJournalsFetchStatus: (status) =>
    set(() => ({ journalsFetchStatus: status })),
  setJournals: (updatedJournals) => set(() => ({ journals: updatedJournals })),
  updateJournal: (journal) =>
    set((state) => ({
      journals: state.journals.map((j) => (j.id === journal.id ? journal : j)),
    })),
  currentJournal: null,
  setCurrentJournal: (journal) => set(() => ({ currentJournal: journal })),
}));

export default useJournalsStore;
