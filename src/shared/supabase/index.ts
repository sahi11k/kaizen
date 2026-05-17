import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

export const SUPABASE_TABLES = {
  TASKS: "tasks_master",
  JOURNALS: "journals_master",
  USER_SETTINGS: "user_settings_master",
  TASK_SESSIONS: "task_sessions_master",
  DAILY_MOODS: "daily_moods_master",
  HABITS: "habits_master",
  HABIT_ENTRIES: "habit_entries_master",
} as const;
