import { supabase, SUPABASE_TABLES } from "@/shared/supabase";
import { parseApiResponse, ApiError } from "@/shared/lib/api";
import dayjs from "dayjs";
import {
  transformJournalsFromDb,
  transformJournalToDb,
} from "@/features/journals/utils/transformers/journals";

export const fetchJournals = async (userId) => {
  const response = await supabase
    .from(SUPABASE_TABLES.JOURNALS)
    .select("*")
    .eq("created_by", userId);

  const res = parseApiResponse({ response });
  return transformJournalsFromDb(res.data ?? []);
};

export const deleteJournal = async (journalId, userId) => {
  if (!userId) throw new ApiError("User authentication required");

  const response = await supabase
    .from(SUPABASE_TABLES.JOURNALS)
    .delete()
    .eq("id", journalId)
    .eq("created_by", userId)
    .select();

  const status =
    response.status === 200 && response.data.length === 0
      ? 404
      : response.status;
  parseApiResponse({
    response: { ...response, status },
    errorMessage: "Journal not found or you don't have permission to delete it",
  });
};

export const saveJournal = async (payload = {}, userId) => {
  if (!userId) throw new ApiError("User authentication required");

  const dbPayload = transformJournalToDb(payload);
  const payloadToUpsert = {
    ...dbPayload,
    created_by: userId,
    date: dayjs(dbPayload.date).format("YYYY-MM-DD"),
  };

  const response = await supabase
    .from(SUPABASE_TABLES.JOURNALS)
    .upsert(payloadToUpsert, {
      onConflict: "id",
    })
    .select();

  const res = parseApiResponse({
    response,
    errorMessage: "Failed to save journal",
  });
  return transformJournalsFromDb(res.data ?? []);
};
