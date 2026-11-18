import { create } from "zustand";
import { Task } from "@/features/pomodoro/types";

interface TasksState {
  currentTask: Task | null;
  createTaskRequestId: number;
  setCurrentTask: (task: Task | null) => void;
  requestCreateTask: () => void;
}

const useTasksStore = create<TasksState>((set) => ({
  currentTask: null,
  createTaskRequestId: 0,
  setCurrentTask: (task) => set(() => ({ currentTask: task })),
  requestCreateTask: () =>
    set((state) => ({ createTaskRequestId: state.createTaskRequestId + 1 })),
}));

export default useTasksStore;
