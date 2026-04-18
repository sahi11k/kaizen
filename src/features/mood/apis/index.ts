import {
  transformDailyMoodFromDb,
  transformDailyMoodToDb,
} from "@/features/mood/utils/transformers";
import type { DailyMood, MoodValue } from "@/features/mood/types";
import { parseApiResponse, ApiError } from "@/shared/lib/api";
import { supabase, SUPABASE_TABLES } from "@/shared/supabase";

export async function fetchTodayMood(
  userId: string,
  dateKey: string,
): Promise<DailyMood | null> {
  const response = await supabase
    .from(SUPABASE_TABLES.DAILY_MOODS)
    .select("*")
    .eq("created_by", userId)
    .eq("entry_date", dateKey)
    .maybeSingle();

  const res = parseApiResponse({ response });
  if (!res.data || typeof res.data !== "object") {
    return null;
  }
  return transformDailyMoodFromDb(res.data as Record<string, unknown>);
}

export async function upsertDailyMood(
  payload: { mood: MoodValue; entryDate: string },
  userId: string,
): Promise<DailyMood> {
  if (!userId) throw new ApiError("User authentication required", 401);

  const dbPayload = transformDailyMoodToDb({
    mood: payload.mood,
    entryDate: payload.entryDate,
  });

  const response = await supabase
    .from(SUPABASE_TABLES.DAILY_MOODS)
    .upsert(
      {
        ...dbPayload,
        created_by: userId,
      },
      { onConflict: "created_by,entry_date" },
    )
    .select("*")
    .maybeSingle();

  const res = parseApiResponse({
    response,
    errorMessage: "Failed to save mood",
  });
  if (!res.data || typeof res.data !== "object") {
    throw new ApiError("Failed to save mood", response.status ?? 500);
  }
  return transformDailyMoodFromDb(res.data as Record<string, unknown>);
}
