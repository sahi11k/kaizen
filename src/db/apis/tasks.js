import { supabase } from "@/db/supabase";
import { SUPABASE_TABLES } from "@/utils/constants";
import {
  transformTasksFromDb,
  transformTasksToDb,
} from "@/utils/transformers/tasks";
import { handleResponse } from "@/utils/utils";

export const fetchTasks = async (payload = {}) => {
  let res = await supabase
    .from(SUPABASE_TABLES.TASKS)
    .select("*")
    .order("rank", { ascending: true });

  res = handleResponse(res);
  if (res.status === 200) {
    return transformTasksFromDb(res.data);
  }
  return [];
};

export const createTask = async (payload = {}) => {
  const payloadToInsert = transformTasksToDb([payload]);
  let res = await supabase
    .from(SUPABASE_TABLES.TASKS)
    .insert(payloadToInsert)
    .select();
  res = handleResponse(res, "Task creation failed");
  res.data = transformTasksFromDb(res.data);
  return res;
};

export const updateTask = async (payload = {}) => {
  const payloadToUpdate = transformTasksToDb([payload]);
  let res = await supabase
    .from(SUPABASE_TABLES.TASKS)
    .update(payloadToUpdate)
    .eq("id", payload.id)
    .select();
  res = handleResponse(res, "Task update failed");
  res.data = transformTasksFromDb(res.data);
  return res;
};

export const deleteTask = async (taskId) => {
  let res = await supabase
    .from(SUPABASE_TABLES.TASKS)
    .delete()
    .eq("id", taskId);
  res = handleResponse(res, "Task deletion failed");
  return res;
};

export const sortTasks = async (payload = []) => {
  const payloadToUpdate = transformTasksToDb(payload);
  let res = await supabase
    .from(SUPABASE_TABLES.TASKS)
    .upsert(payloadToUpdate)
    .select();
  res = handleResponse(res, "Task order update failed");
  res.data = transformTasksFromDb(res.data);
  return res;
};
