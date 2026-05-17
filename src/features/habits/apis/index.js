import { supabase, SUPABASE_TABLES } from "@/shared/supabase";
import { ApiError, parseApiResponse } from "@/shared/lib/api";
import {
  transformHabitEntriesFromDb,
  transformHabitEntryToDb,
  transformHabitsFromDb,
  transformHabitToDb,
} from "@/features/habits/utils";
import {
  HABIT_ENTRY_STATUS,
  HABIT_FREQUENCY_TYPES,
  HABIT_TARGET_TYPES,
} from "@/features/habits/constants";

export const fetchHabits = async (userId, lifecycleFilter = "active") => {
  if (!userId) throw new ApiError("User authentication required");

  let query = supabase
    .from(SUPABASE_TABLES.HABITS)
    .select("*")
    .eq("created_by", userId)
    .eq("is_paused", false)
    .order("rank", { ascending: true })
    .order("created_at", { ascending: true });

  if (lifecycleFilter === "active") {
    query = query.is("archived_at", null);
  }

  if (lifecycleFilter === "completed") {
    query = query.not("archived_at", "is", null);
  }

  const response = await query;

  const res = parseApiResponse({ response });
  return transformHabitsFromDb(res.data ?? []);
};

export const createHabit = async (payload = {}, userId) => {
  if (!userId) throw new ApiError("User authentication required");

  const dbPayload = transformHabitToDb({
    repeatMode: HABIT_FREQUENCY_TYPES.DAILY,
    frequencyType: HABIT_FREQUENCY_TYPES.DAILY,
    targetType: HABIT_TARGET_TYPES.BINARY,
    isPaused: false,
    ...payload,
    createdBy: userId,
  });

  const response = await supabase
    .from(SUPABASE_TABLES.HABITS)
    .insert(dbPayload)
    .select();

  const res = parseApiResponse({
    response,
    errorMessage: "Habit creation failed",
  });
  return transformHabitsFromDb(res.data ?? []);
};

export const updateHabit = async (payload = {}, userId) => {
  if (!userId) throw new ApiError("User authentication required");

  const dbPayload = transformHabitToDb(payload);
  const response = await supabase
    .from(SUPABASE_TABLES.HABITS)
    .update(dbPayload)
    .eq("id", payload.id)
    .eq("created_by", userId)
    .select();

  const status =
    response.status === 200 && response.data.length === 0
      ? 404
      : response.status;
  const res = parseApiResponse({
    response: { ...response, status },
    errorMessage: "Habit update failed",
  });
  return transformHabitsFromDb(res.data ?? []);
};

export const archiveHabit = async (habitId, userId) => {
  if (!userId) throw new ApiError("User authentication required");

  const response = await supabase
    .from(SUPABASE_TABLES.HABITS)
    .update({ archived_at: new Date().toISOString() })
    .eq("id", habitId)
    .eq("created_by", userId)
    .select();

  const res = parseApiResponse({
    response,
    errorMessage: "Habit archive failed",
  });
  return transformHabitsFromDb(res.data ?? []);
};

export const deleteHabit = async (habitId, userId) => {
  if (!userId) throw new ApiError("User authentication required");

  const entriesResponse = await supabase
    .from(SUPABASE_TABLES.HABIT_ENTRIES)
    .delete()
    .eq("habit_id", habitId)
    .eq("created_by", userId);

  parseApiResponse({
    response: entriesResponse,
    errorMessage: "Habit entry delete failed",
  });

  const response = await supabase
    .from(SUPABASE_TABLES.HABITS)
    .delete()
    .eq("id", habitId)
    .eq("created_by", userId);

  parseApiResponse({
    response,
    errorMessage: "Habit delete failed",
  });
};

export const fetchHabitEntriesForDate = async (dateKey, userId) => {
  if (!userId) throw new ApiError("User authentication required");

  const response = await supabase
    .from(SUPABASE_TABLES.HABIT_ENTRIES)
    .select("*")
    .eq("created_by", userId)
    .eq("entry_date", dateKey);

  const res = parseApiResponse({ response });
  return transformHabitEntriesFromDb(res.data ?? []);
};

export const fetchTodayHabitEntries = fetchHabitEntriesForDate;

export const completeHabitForDate = async (payload = {}, userId) => {
  if (!userId) throw new ApiError("User authentication required");

  const dbPayload = transformHabitEntryToDb({
    habitId: payload.habitId,
    createdBy: userId,
    entryDate: payload.entryDate,
    status: HABIT_ENTRY_STATUS.COMPLETED,
    progressValue: payload.progressValue ?? 1,
  });

  const response = await supabase
    .from(SUPABASE_TABLES.HABIT_ENTRIES)
    .upsert(dbPayload, {
      onConflict: "created_by,habit_id,entry_date",
    })
    .select();

  const res = parseApiResponse({
    response,
    errorMessage: "Habit completion failed",
  });
  return transformHabitEntriesFromDb(res.data ?? []);
};

export const uncompleteHabitForDate = async (payload = {}, userId) => {
  if (!userId) throw new ApiError("User authentication required");

  const response = await supabase
    .from(SUPABASE_TABLES.HABIT_ENTRIES)
    .delete()
    .eq("created_by", userId)
    .eq("habit_id", payload.habitId)
    .eq("entry_date", payload.entryDate);

  parseApiResponse({
    response,
    errorMessage: "Habit completion removal failed",
  });
};
