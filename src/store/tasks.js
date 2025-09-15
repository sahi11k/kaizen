import { STATUS } from "@/constants/db";
import { create } from "zustand";

const useTasksStore = create((set) => ({
  tasks: [],
  currentTask: null,
  tasksFetchStatus: STATUS.LOADING,
  setTasksFetchStatus: (status) => set(() => ({ tasksFetchStatus: status })),
  setTasks: (updatedTasks) => set(() => ({ tasks: updatedTasks })),
  setCurrentTask: (task) => set(() => ({ currentTask: task })),
  updateTask: (task) =>
    set((state) => ({
      tasks: state.tasks.map((t) => (t.id === task.id ? task : t)),
    })),
  taskSessions: [],
  setTaskSessions: (updatedTaskSessions) =>
    set(() => ({
      taskSessions: updatedTaskSessions,
    })),
  taskSessionsFetchStatus: STATUS.LOADING,
  setTaskSessionsFetchStatus: (status) =>
    set(() => ({ taskSessionsFetchStatus: status })),
}));

export default useTasksStore;
