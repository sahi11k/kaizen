import dayjs from "dayjs";
import {
  HABIT_ENTRY_FIELD_MAPPING,
  HABIT_ENTRY_STATUS,
  HABIT_FIELD_MAPPING,
  HABIT_FREQUENCY_TYPES,
  HABIT_TARGET_TYPES,
} from "@/features/habits/constants";
import { Habit, HabitEntry, HabitFormValues } from "@/features/habits/types";
import { reverseMapping, transformKeys } from "@/shared/lib/transformers";

export const getTodayDateKey = (): string => dayjs().format("YYYY-MM-DD");

export const getHabitColor = (color?: string | null): string => {
  return color || "var(--primary)";
};

export const transformHabitFromDb = (habit: Record<string, unknown>) => {
  return transformKeys(habit, HABIT_FIELD_MAPPING) as Habit;
};

export const transformHabitsFromDb = (habits?: Record<string, unknown>[]) => {
  if (!Array.isArray(habits)) return [];
  return habits.map(transformHabitFromDb);
};

export const transformHabitToDb = (habit: Record<string, unknown>) => {
  return transformKeys(habit, reverseMapping(HABIT_FIELD_MAPPING));
};

export const transformHabitEntryFromDb = (entry: Record<string, unknown>) => {
  return transformKeys(entry, HABIT_ENTRY_FIELD_MAPPING) as HabitEntry;
};

export const transformHabitEntriesFromDb = (
  entries?: Record<string, unknown>[],
) => {
  if (!Array.isArray(entries)) return [];
  return entries.map(transformHabitEntryFromDb);
};

export const transformHabitEntryToDb = (entry: Record<string, unknown>) => {
  return transformKeys(entry, reverseMapping(HABIT_ENTRY_FIELD_MAPPING));
};

export const isHabitCompletedToday = (
  habitId: string,
  entries: HabitEntry[] = [],
): boolean => {
  const today = getTodayDateKey();
  return isHabitCompletedForDate(habitId, entries, today);
};

export const isHabitCompletedForDate = (
  habitId: string,
  entries: HabitEntry[] = [],
  dateKey = getTodayDateKey(),
): boolean => {
  return entries.some(
    (entry) =>
      entry.habitId === habitId &&
      entry.entryDate === dateKey &&
      entry.status === HABIT_ENTRY_STATUS.COMPLETED,
  );
};

export const isHabitStarted = (
  habit: Habit,
  dateKey = getTodayDateKey(),
): boolean => {
  return !dayjs(habit.startDate).startOf("day").isAfter(dayjs(dateKey), "day");
};

export const isHabitDueForDate = (
  habit: Habit,
  dateKey = getTodayDateKey(),
): boolean => {
  if (!isHabitStarted(habit, dateKey)) return false;

  const selectedDay = dayjs(dateKey).day();
  const isoWeekday = selectedDay === 0 ? 7 : selectedDay;

  if (habit.repeatMode === "daily") return true;
  if (habit.repeatMode === "weekdays") return isoWeekday >= 1 && isoWeekday <= 5;
  if (habit.repeatMode === "custom_days") {
    return habit.frequencyDays?.includes(isoWeekday) ?? false;
  }

  return habit.repeatMode === "weekly_count";
};

export const isHabitDueToday = (habit: Habit): boolean => {
  return isHabitDueForDate(habit, getTodayDateKey());
};

export const getNextHabitDueDate = (
  habit: Habit,
  dateKey = getTodayDateKey(),
  completedForDate = false,
): string | null => {
  const selectedDate = dayjs(dateKey).startOf("day");
  const startDate = dayjs(habit.startDate).startOf("day");
  const startsLater = startDate.isAfter(selectedDate, "day");
  const shouldStartAfterSelected =
    !startsLater && isHabitDueForDate(habit, dateKey) && completedForDate;
  let cursor = startsLater
    ? startDate
    : selectedDate.add(shouldStartAfterSelected ? 1 : 0, "day");

  for (let offset = 0; offset < 370; offset += 1) {
    const cursorKey = cursor.format("YYYY-MM-DD");
    if (isHabitDueForDate(habit, cursorKey)) return cursorKey;
    cursor = cursor.add(1, "day");
  }

  return null;
};

export const getNextHabitDueDateLabel = (
  habit: Habit,
  dateKey = getTodayDateKey(),
  completedForDate = false,
): string => {
  if (!isHabitStarted(habit, dateKey)) {
    return `Starts ${dayjs(habit.startDate).format("MMM D")}`;
  }

  const nextDueDate = getNextHabitDueDate(habit, dateKey, completedForDate);
  if (!nextDueDate) return "No upcoming due date";

  const today = dayjs(getTodayDateKey()).startOf("day");
  const dueDate = dayjs(nextDueDate).startOf("day");
  if (dueDate.isSame(today, "day")) return "Due Today";
  if (dueDate.isSame(today.add(1, "day"), "day")) return "Next Due: Tomorrow";
  return `Next Due: ${dueDate.format("MMM D")}`;
};

export const getFrequencyLabel = (habit: Habit): string => {
  if (habit.repeatMode === "daily") return "Daily";
  if (habit.repeatMode === "weekdays") return "Weekdays";
  if (habit.repeatMode === "custom_days") return "Custom days";
  if (
    habit.repeatMode === "weekly_count" &&
    habit.weeklyTargetCount
  ) {
    return `${habit.weeklyTargetCount}x/week`;
  }
  return "Daily";
};

export const getGoalLabel = (habit: Habit): string => {
  if (habit.targetType === HABIT_TARGET_TYPES.BINARY) return "Done daily";
  return `${Number(habit.targetValue ?? 0)} ${habit.targetUnit ?? ""}`.trim();
};

export const getHabitStatusLabel = (
  habit: Habit,
  entries: HabitEntry[] = [],
  dateKey = getTodayDateKey(),
): string => {
  if (!isHabitStarted(habit, dateKey)) {
    return `Starts ${dayjs(habit.startDate).format("MMM D")}`;
  }
  return isHabitCompletedForDate(habit.id, entries, dateKey)
    ? "Done"
    : "Not done yet";
};

export const validateHabitForm = (values: HabitFormValues) => {
  const errors: Partial<Record<keyof HabitFormValues, string>> = {};
  const name = values.name.trim();

  if (!name) errors.name = "Habit name is required";
  if (name.length > 50) errors.name = "Habit name must be 50 characters or less";

  if (
    values.repeatMode === "custom_days" &&
    values.frequencyDays.length === 0
  ) {
    errors.frequencyDays = "Choose at least one day";
  }

  if (
    values.repeatMode === "weekly_count" &&
    (values.weeklyTargetCount < 1 || values.weeklyTargetCount > 7)
  ) {
    errors.weeklyTargetCount = "Choose between 1 and 7";
  }

  if (values.targetType === HABIT_TARGET_TYPES.NUMERIC) {
    const numericValue = Number(values.targetValue);
    if (!Number.isFinite(numericValue) || numericValue <= 0) {
      errors.targetValue = "Enter a goal greater than 0";
    }
  }

  if (!values.startDate) errors.startDate = "Start date is required";

  return errors;
};

export const buildHabitPayload = (values: HabitFormValues) => {
  const frequencyType =
    values.repeatMode === "custom_days"
      ? HABIT_FREQUENCY_TYPES.WEEKDAYS
      : values.frequencyType;
  const isWeeklyCount = frequencyType === HABIT_FREQUENCY_TYPES.WEEKLY_COUNT;
  const isNumeric = values.targetType === HABIT_TARGET_TYPES.NUMERIC;

  return {
    name: values.name.trim(),
    color: values.color || null,
    repeatMode: values.repeatMode,
    frequencyType,
    frequencyDays:
      frequencyType === HABIT_FREQUENCY_TYPES.WEEKDAYS
        ? values.frequencyDays
        : null,
    weeklyTargetCount: isWeeklyCount ? Number(values.weeklyTargetCount) : null,
    targetType: values.targetType,
    targetValue: isNumeric ? Number(values.targetValue) : null,
    targetUnit: isNumeric ? values.targetUnit.trim() || null : null,
    startDate: values.startDate,
  };
};
