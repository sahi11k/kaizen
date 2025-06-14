import { create } from "zustand";

const useTasksStore = create((set) => ({
  tasks: [],
  currentTask: null,
  setTasks: (updatedTasks) => set(() => ({ tasks: updatedTasks })),
  setCurrentTask: (task) => set(() => ({ currentTask: task })),
}));

export default useTasksStore;
