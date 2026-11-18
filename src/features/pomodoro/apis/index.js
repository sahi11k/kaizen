import { supabase, SUPABASE_TABLES } from "@/shared/supabase";
import {
  transformTasksFromDb,
  transformTasksToDb,
  transformTaskSessionsFromDb,
  transformTaskSessionToDb,
  sumDurations,
} from "@/features/pomodoro/utils";
import { parseApiResponse, ApiError } from "@/shared/lib/api";

export const fetchTasks = async (userId) => {
  const response = await supabase
    .from(SUPABASE_TABLES.TASKS)
    .select("*")
    .eq("created_by", userId)
    .order("rank", { ascending: true });

  const res = parseApiResponse({ response });
  return transformTasksFromDb(res.data ?? []);
};

export const createTask = async (payload = {}, userId) => {
  if (!userId) throw new ApiError("User authentication required");

  const taskWithUser = { ...payload, created_by: userId };
  const payloadToInsert = transformTasksToDb([taskWithUser]);

  const response = await supabase
    .from(SUPABASE_TABLES.TASKS)
    .insert(payloadToInsert)
    .select();

  const res = parseApiResponse({
    response,
    errorMessage: "Task creation failed",
  });
  return transformTasksFromDb(res.data ?? []);
};

export const updateTask = async (payload = {}, userId) => {
  if (!userId) throw new ApiError("User authentication required");

  const payloadToUpdate = transformTasksToDb([payload]);
  const response = await supabase
    .from(SUPABASE_TABLES.TASKS)
    .update(payloadToUpdate)
    .eq("id", payload.id)
    .eq("created_by", userId)
    .select();

  const status =
    response.status === 200 && response.data.length === 0
      ? 404
      : response.status;
  const res = parseApiResponse({
    response: { ...response, status },
    errorMessage: "Task update failed",
  });
  return transformTasksFromDb(res.data ?? []);
};

export const deleteTask = async (taskId, userId) => {
  if (!userId) throw new ApiError("User authentication required");

  const response = await supabase.rpc("delete_task_with_progress", {
    target_task_id: taskId,
    target_user_id: userId,
  });

  parseApiResponse({
    response,
    errorMessage:
      "Task delete failed. The task may not exist or you may not have permission to delete it.",
  });
};

export const sortTasks = async (payload = [], userId) => {
  if (!userId) throw new ApiError("User authentication required");

  const payloadToUpdate = transformTasksToDb(payload);

  const response = await supabase
    .from(SUPABASE_TABLES.TASKS)
    .upsert(payloadToUpdate)
    .eq("created_by", userId)
    .select();

  const res = parseApiResponse({
    response,
    errorMessage: "Task order update failed",
  });
  return transformTasksFromDb(res.data ?? []);
};

export const addTaskSession = async (payload = {}, userId) => {
  if (!userId) throw new ApiError("User authentication required");

  const dbPayload = transformTaskSessionToDb({ ...payload, createdBy: userId });

  const response = await supabase
    .from(SUPABASE_TABLES.TASK_SESSIONS)
    .insert(dbPayload)
    .select();

  const res = parseApiResponse({
    response,
    errorMessage: "Task session addition failed",
  });
  return transformTaskSessionsFromDb(res.data ?? []);
};

export const getTotalSessionDuration = async (userId) => {
  const response = await supabase
    .from(SUPABASE_TABLES.TASK_SESSIONS)
    .select("duration")
    .eq("created_by", userId);

  const res = parseApiResponse({ response });
  return sumDurations(res.data ?? []);
};

export const getTotalSessionCount = async (userId) => {
  const response = await supabase
    .from(SUPABASE_TABLES.TASK_SESSIONS)
    .select("id", { count: "exact", head: true })
    .eq("created_by", userId);

  parseApiResponse({ response });
  return response.count ?? 0;
};

export const getTaskSessionsForRange = async (payload = {}, userId) => {
  const response = await supabase
    .from(SUPABASE_TABLES.TASK_SESSIONS)
    .select("*")
    .eq("created_by", userId)
    .gte("created_at", payload.startDate)
    .lte("created_at", payload.endDate);

  const res = parseApiResponse({ response });
  return transformTaskSessionsFromDb(res.data ?? []);
};

export const getLastWeekTaskSessions = getTaskSessionsForRange;
