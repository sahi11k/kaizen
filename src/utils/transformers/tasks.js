import { transformKeys, reverseMapping } from "./common";

// Mapping configuration for snake_case to camelCase transformation
const TASK_FIELD_MAPPING = {
  completed_sessions: "completedSessions",
  total_sessions: "totalSessions",
  created_by: "createdBy",
  time_spent: "timeSpent",
};

export const transformTasksFromDb = (tasks) => {
  if (!tasks || !Array.isArray(tasks)) {
    return [];
  }
  return tasks.map(transformTaskFromDb);
};

export const transformTaskFromDb = (task) => {
  return transformKeys(task, TASK_FIELD_MAPPING);
};

export const transformTasksToDb = (tasks = []) => {
  if (!tasks || !Array.isArray(tasks)) {
    return [];
  }
  return tasks.map(transformTaskToDb);
};

export const transformTaskToDb = (task = {}) => {
  return transformKeys(task, reverseMapping(TASK_FIELD_MAPPING));
};
