export type HabitFrequencyType = "daily" | "weekdays" | "weekly_count";
export type HabitRepeatMode =
  | "daily"
  | "weekdays"
  | "custom_days"
  | "weekly_count";
export type HabitTargetType = "binary" | "numeric";
export type HabitEntryStatus = "in_progress" | "completed" | "skipped";

export type Habit = {
  id: string;
  createdBy: string;
  name: string;
  description: string | null;
  icon: string | null;
  color: string | null;
  category: string | null;
  repeatMode: HabitRepeatMode;
  frequencyType: HabitFrequencyType;
  frequencyDays: number[] | null;
  weeklyTargetCount: number | null;
  targetType: HabitTargetType;
  targetValue: number | null;
  targetUnit: string | null;
  reminderTime: string | null;
  isPaused: boolean;
  archivedAt: string | null;
  startDate: string;
  rank: number;
  createdAt: string;
  updatedAt: string;
};

export type HabitEntry = {
  id: string;
  habitId: string;
  createdBy: string;
  entryDate: string;
  status: HabitEntryStatus;
  progressValue: number;
  note: string | null;
  skipReason: string | null;
  createdAt: string;
  updatedAt: string;
};

export type HabitFormValues = {
  name: string;
  repeatMode: HabitRepeatMode;
  frequencyType: HabitFrequencyType;
  frequencyDays: number[];
  weeklyTargetCount: number;
  targetType: HabitTargetType;
  targetValue: string | number;
  targetUnit: string;
  startDate: string;
};
