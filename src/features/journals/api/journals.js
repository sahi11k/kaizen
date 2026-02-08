import { SUPABASE_TABLES } from "@/shared/constants/db";
import { supabase } from "@/shared/api/supabase";
import { handleResponse } from "@/shared/api/db";
import dayjs from "dayjs";

export const fetchJournals = async (userId) => {
  if (!userId) {
    return [];
  }

  let res = await supabase
    .from(SUPABASE_TABLES.JOURNALS)
    .select("*")
    .eq("created_by", userId);

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

export const saveJournal = async (payload = {}, userId) => {
  if (!userId) {
    return { error: "User authentication required" };
  }

  const payloadToUpsert = {
    ...payload,
    created_by: userId,
    date: dayjs(payload.date).format("YYYY-MM-DD"),
  };

  let res = await supabase
    .from(SUPABASE_TABLES.JOURNALS)
    .upsert(payloadToUpsert, {
      onConflict: "id",
    })
    .select();

  res = handleResponse({
    response: res,
    errorMessage: "Failed to save journal",
  });

  return res;
};
