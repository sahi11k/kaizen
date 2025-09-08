import { supabase } from "@/db/supabase";
import { SUPABASE_TABLES } from "@/constants/db";
import {
  transformTasksFromDb,
  transformTasksToDb,
} from "@/utils/transformers/tasks";
import { handleResponse } from "@/utils/db";

export const fetchTasks = async (userId) => {
  if (!userId) {
    return [];
  }

  let res = await supabase
    .from(SUPABASE_TABLES.TASKS)
    .select("*")
    .eq("created_by", userId)
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
    .delete()
    .eq("id", taskId)
    .eq("created_by", userId)
    .select();

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
