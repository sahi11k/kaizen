import { supabase } from "@/shared/api/supabase";
import { SUPABASE_TABLES } from "@/shared/constants/db";
import {
  transformTasksFromDb,
  transformTasksToDb,
} from "@/features/pomodoro/utils/transformers/tasks";
import { handleResponse } from "@/shared/api/db";
import dayjs from "dayjs";

export const fetchTasks = async (userId) => {
  if (!userId) {
    return [];
  }

  let res = await supabase
    .from(SUPABASE_TABLES.TASKS)
    .select("*")
    .eq("created_by", userId)
    .is("deleted_at", null)
    .order("rank", { ascending: true });

  res = handleResponse({
    response: res,
  });
  if (res.status === 200) {
    return transformTasksFromDb(res.data);
  }
  return [];
};

export const createTask = async (payload = {}, userId) => {
  if (!userId) {
    return { error: "User authentication required" };
  }

  const taskWithUser = { ...payload, created_by: userId };
  const payloadToInsert = transformTasksToDb([taskWithUser]);

  let res = await supabase
    .from(SUPABASE_TABLES.TASKS)
    .insert(payloadToInsert)
    .select();

  res = handleResponse({
    response: res,
    errorMessage: "Task creation failed",
  });
  res.data = transformTasksFromDb(res.data);
  return res;
};

export const updateTask = async (payload = {}, userId) => {
  if (!userId) {
    return { error: "User authentication required" };
  }

  const payloadToUpdate = transformTasksToDb([payload]);
  let res = await supabase
    .from(SUPABASE_TABLES.TASKS)
    .update(payloadToUpdate)
    .eq("id", payload.id)
    .eq("created_by", userId)
    .select();

  const status = res.status === 200 && res.data.length === 0 ? 404 : res.status;
  res = handleResponse({
    response: {
      ...res,
      status,
    },
    errorMessage: "Task update failed",
  });
  res.data = transformTasksFromDb(res.data);
  return res;
};

export const deleteTask = async (taskId, userId) => {
  if (!userId) {
    return { error: "User authentication required" };
  }

  let res = await supabase
    .from(SUPABASE_TABLES.TASKS)
    .update({ deleted_at: dayjs().toISOString() })
    .eq("id", taskId)
    .eq("created_by", userId);

  const status = res.status === 200 && res.data.length === 0 ? 404 : res.status;
  res = handleResponse({
    response: {
      ...res,
      status,
    },
    errorMessage: "Task not found or you don't have permission to delete it",
  });

  return res;
};

export const sortTasks = async (payload = [], userId) => {
  if (!userId) {
    return { error: "User authentication required" };
  }

  // Add created_by to each task in the payload
  const payloadWithUser = payload.map((task) => ({
    ...task,
    created_by: userId,
  }));
  const payloadToUpdate = transformTasksToDb(payloadWithUser);

  let res = await supabase
    .from(SUPABASE_TABLES.TASKS)
    .upsert(payloadToUpdate)
    .eq("created_by", userId)
    .select();

  res = handleResponse({
    response: res,
    errorMessage: "Task order update failed",
  });
  res.data = transformTasksFromDb(res.data);
  return res;
};

export const addTaskSession = async (payload = {}, userId) => {
  if (!userId) {
    return { error: "User authentication required" };
  }
  const taskWithUser = { ...payload, created_by: userId };
  let res = await supabase
    .from(SUPABASE_TABLES.TASK_SESSIONS)
    .insert(taskWithUser)
    .select();

  res = handleResponse({
    response: res,
    errorMessage: "Task session addition failed",
  });

  return res;
};

export const getLastWeekTaskSessions = async (payload = {}, userId) => {
  if (!userId) {
    return { error: "User authentication required" };
  }

  let res = await supabase
    .from(SUPABASE_TABLES.TASK_SESSIONS)
    .select("*")
    .eq("created_by", userId)
    .gte("created_at", payload.startDate)
    .lte("created_at", payload.endDate);

  res = handleResponse({
    response: res,
  });

  return res;
};
