import { create } from "zustand";

const useTasksStore = create((set) => ({
  tasks: [],
  currentTask: null,
  setTasks: (updatedTasks) => set(() => ({ tasks: updatedTasks })),
  setCurrentTask: (task) => set(() => ({ currentTask: task })),
  updateTask: (task) =>
    set((state) => ({
      tasks: state.tasks.map((t) => (t.id === task.id ? task : t)),
    })),
}));

export default useTasksStore;
