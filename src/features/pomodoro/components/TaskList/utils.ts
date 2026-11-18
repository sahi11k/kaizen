import { MIN_SESSIONS } from "@/features/pomodoro/constants";
import type { DefaultTask, Task } from "@/features/pomodoro/types";

import { TASK_FILTERS, type TaskFilter } from "./constants";

const DEFAULT_TITLE = "Untitled Task";

export const normalizeSessionGoal = (value: unknown) => {
  const parsedValue =
    typeof value === "number" ? value : parseInt(String(value), 10);

  if (!Number.isFinite(parsedValue) || parsedValue < MIN_SESSIONS) {
    return MIN_SESSIONS;
  }

  return Math.floor(parsedValue);
};

export const getTaskTitle = (title: unknown) => {
  if (typeof title !== "string" || title.trim().length === 0) {
    return DEFAULT_TITLE;
  }

  return title;
};

export const getTaskGroups = (tasks: Task[] = []) => ({
  pendingTasks: tasks.filter((task) => !task.completed),
  completedTasks: tasks.filter((task) => task.completed),
});

export const getFilteredTasks = (
  tasks: Task[] = [],
  selectedFilter: TaskFilter,
) => {
  if (selectedFilter === TASK_FILTERS.PENDING) {
    return tasks.filter((task) => !task.completed);
  }

  if (selectedFilter === TASK_FILTERS.COMPLETED) {
    return tasks.filter((task) => task.completed);
  }

  return tasks;
};

export const getTaskSessionSummary = (task: Partial<Task>) => {
  const plannedSessions = Math.max(
    MIN_SESSIONS,
    Math.floor(task.totalSessions || MIN_SESSIONS),
  );
  const completedSessions = Math.max(
    0,
    Math.floor(task.completedSessions || 0),
  );
  const plannedCompletedSessions = Math.min(completedSessions, plannedSessions);
  const extraSessions = Math.max(0, completedSessions - plannedSessions);

  return `${plannedCompletedSessions}/${plannedSessions}${
    extraSessions > 0 ? ` + ${extraSessions} more` : ""
  }`;
};

export const buildCreateTaskPayload = (
  formValues: Record<string, unknown>,
  rank: number,
) => {
  const { title, ...rest } = formValues;

  return {
    ...rest,
    completed: false,
    completedSessions: 0,
    totalSessions: normalizeSessionGoal(rest.totalSessions),
    rank,
    title: getTaskTitle(title),
  } as DefaultTask;
};

export const buildUpdateTaskPayload = (formValues: Record<string, unknown>) => {
  return {
    ...formValues,
    totalSessions: normalizeSessionGoal(formValues.totalSessions),
    title: getTaskTitle(formValues.title),
  } as Task;
};
