import { supabase } from "@/store/supabase";
import { SUPABASE_TABLES } from "@/utils/constants";

export const getTasks = async (payload = {}) => {
  const res = await supabase.from(SUPABASE_TABLES.TASKS).select("*");
  if (res.status === 200) {
    return res.data;
  }
  return [];
};

export const createTask = async (payload = {}) => {
  const res = await supabase.from(SUPABASE_TABLES.TASKS).insert(payload);
  if (res.status === 200) {
    return res.data;
  }
  return [];
};

export const updateTask = async (payload = {}) => {
  const res = await supabase.from(SUPABASE_TABLES.TASKS).update(payload);
  if (res.status === 200) {
    return res.data;
  }
  return [];
};

export const deleteTask = async (payload = {}) => {
  const res = await supabase.from(SUPABASE_TABLES.TASKS).delete(payload);
  if (res.status === 200) {
    return res.data;
  }
  return [];
};
