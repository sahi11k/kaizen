export const HABIT_FREQUENCY_TYPES = {
  DAILY: "daily",
  WEEKDAYS: "weekdays",
  WEEKLY_COUNT: "weekly_count",
} as const;

export const HABIT_TARGET_TYPES = {
  BINARY: "binary",
  NUMERIC: "numeric",
} as const;

export const HABIT_ENTRY_STATUS = {
  IN_PROGRESS: "in_progress",
  COMPLETED: "completed",
  SKIPPED: "skipped",
} as const;

export const HABIT_FIELD_MAPPING = {
  created_by: "createdBy",
  color: "color",
  repeat_mode: "repeatMode",
  frequency_type: "frequencyType",
  frequency_days: "frequencyDays",
  weekly_target_count: "weeklyTargetCount",
  target_type: "targetType",
  target_value: "targetValue",
  target_unit: "targetUnit",
  reminder_time: "reminderTime",
  is_paused: "isPaused",
  archived_at: "archivedAt",
  start_date: "startDate",
  end_date: "endDate",
  current_streak: "currentStreak",
  longest_streak: "longestStreak",
  last_completed_date: "lastCompletedDate",
  created_at: "createdAt",
  updated_at: "updatedAt",
} as const;

export const HABIT_ENTRY_FIELD_MAPPING = {
  habit_id: "habitId",
  created_by: "createdBy",
  entry_date: "entryDate",
  progress_value: "progressValue",
  skip_reason: "skipReason",
  created_at: "createdAt",
  updated_at: "updatedAt",
} as const;

export const WEEK_DAYS = [
  { value: 1, label: "M" },
  { value: 2, label: "T" },
  { value: 3, label: "W" },
  { value: 4, label: "T" },
  { value: 5, label: "F" },
  { value: 6, label: "S" },
  { value: 7, label: "S" },
] as const;

export const HABIT_COLOR_PALETTE = [
  "#0f766e",
  "#15803d",
  "#b45309",
  "#2563eb",
  "#7c3aed",
  "#be123c",
  "#475569",
] as const;

export const DEFAULT_HABIT_FORM_VALUES = {
  name: "",
  color: "",
  repeatMode: "daily",
  frequencyType: HABIT_FREQUENCY_TYPES.DAILY,
  frequencyDays: [1, 2, 3, 4, 5],
  weeklyTargetCount: 3,
  targetType: HABIT_TARGET_TYPES.BINARY,
  targetValue: "",
  targetUnit: "",
  startDate: "",
  endDate: "",
  neverEnds: true,
};
