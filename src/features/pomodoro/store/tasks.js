import { create } from "zustand";

const useTasksStore = create((set) => ({
  currentTask: null,
  setCurrentTask: (task) => set(() => ({ currentTask: task })),
}));

export default useTasksStore;
