import { create } from "zustand";

const useTasksStore = create((set) => ({
  tasks: [],
  setTasks: (updatedTasks) => set(() => ({ tasks: updatedTasks })),
}));

export default useTasksStore;
