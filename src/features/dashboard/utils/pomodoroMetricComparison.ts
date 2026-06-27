import type { TaskSession } from "@/features/pomodoro/types";

type ComparisonVariant = "positive" | "negative" | "neutral";

export type MetricComparison = {
  label: string;
  variant: ComparisonVariant;
};

export const sumSessionMinutes = (sessions: TaskSession[] = []) =>
  sessions.reduce((total, session) => total + (Number(session.duration) || 0), 0);

export const getWeeklyComparison = (
  currentValue = 0,
  previousValue = 0,
): MetricComparison | null => {
  if (currentValue <= 0 || previousValue <= 0) {
    return null;
  }

  const difference = currentValue - previousValue;

  if (difference === 0) {
    return {
      label: "No change",
      variant: "neutral",
    };
  }

  const percentage = Math.round((Math.abs(difference) / previousValue) * 100);
  const sign = difference > 0 ? "+" : "-";

  return {
    label: `${sign}${percentage}% vs last week`,
    variant: difference > 0 ? "positive" : "negative",
  };
};

export const getCountDifferenceComparison = (
  currentValue = 0,
  previousValue = 0,
  label = "vs yesterday",
): MetricComparison | null => {
  if (currentValue <= 0 || previousValue <= 0) {
    return null;
  }

  const difference = currentValue - previousValue;

  if (difference === 0) {
    return {
      label: `No change ${label}`,
      variant: "neutral",
    };
  }

  const sign = difference > 0 ? "+" : "-";

  return {
    label: `${sign}${Math.abs(difference)} ${label}`,
    variant: difference > 0 ? "positive" : "negative",
  };
};
