import { create } from "zustand";
import { Task } from "@/features/pomodoro/types";

interface TasksState {
  currentTask: Task | null;
  setCurrentTask: (task: Task | null) => void;
}

const useTasksStore = create<TasksState>((set) => ({
  currentTask: null,
  setCurrentTask: (task) => set(() => ({ currentTask: task })),
}));

export default useTasksStore;
