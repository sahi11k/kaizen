import {
  TASK_FIELD_MAPPING,
  TASK_SESSION_FIELD_MAPPING,
} from "@/features/pomodoro/constants";
import { transformKeys, reverseMapping } from "@/shared/lib/transformers";

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

export const transformTaskSessionFromDb = (session) => {
  return transformKeys(session, TASK_SESSION_FIELD_MAPPING);
};

export const transformTaskSessionsFromDb = (sessions) => {
  if (!sessions || !Array.isArray(sessions)) {
    return [];
  }
  return sessions.map(transformTaskSessionFromDb);
};

export const transformTaskSessionToDb = (session = {}) => {
  return transformKeys(session, reverseMapping(TASK_SESSION_FIELD_MAPPING));
};
