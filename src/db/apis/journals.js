import { SUPABASE_TABLES } from "@/constants/db";
import { supabase } from "@/db/supabase";
import { handleResponse } from "@/utils/db";

export const createJournal = async (payload = {}, userId) => {
  if (!userId) {
    return { error: "User authentication required" };
  }
  const journalPayload = { ...payload, created_by: userId };
  let res = await supabase
    .from(SUPABASE_TABLES.JOURNALS)
    .insert(journalPayload)
    .select();
  res = handleResponse({
    response: res,
    errorMessage: "Journal creation failed",
  });
  return res;
};

export const fetchJournals = async (userId) => {
  if (!userId) {
    return [];
  }

  let res = await supabase
    .from(SUPABASE_TABLES.JOURNALS)
    .select("*")
    .eq("created_by", userId)
    .order("date", { ascending: false });

  res = handleResponse({
    response: res,
  });

  return res;
};

export const deleteJournal = async (journalId, userId) => {
  if (!userId) {
    return { error: "User authentication required" };
  }

  let res = await supabase
    .from(SUPABASE_TABLES.JOURNALS)
    .delete()
    .eq("id", journalId)
    .eq("created_by", userId)
    .select();

  const status = res.status === 200 && res.data.length === 0 ? 404 : res.status;
  res = handleResponse({
    response: {
      ...res,
      status,
    },
    errorMessage: "Journal not found or you don't have permission to delete it",
  });

  return res;
};

export const updateJournal = async (payload = {}, userId) => {
  if (!userId) {
    return { error: "User authentication required" };
  }

  const payloadToUpdate = { ...payload };
  let res = await supabase
    .from(SUPABASE_TABLES.JOURNALS)
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
    errorMessage: "Journal update failed",
  });
  return res;
};
