import React from "react";
import dayjs from "dayjs";
import { useAuthStore } from "@/features/auth";
import { useTaskSessionsQuery } from "@/features/pomodoro";
import { useJournalsQuery } from "@/features/journals";
import { useBookmarkedQuery } from "@/features/bookmarked/queries";
import { Card, Skeleton } from "@/shared/ui";
import { getWeekStart } from "../../utils/dateRange";
import { minutesToHours, formatTimeFocused } from "../../utils/timeFormat";

const StatCard = ({
  label,
  value,
  unit,
  diff,
  diffLabel,
  diffUnit = "",
  hasHistory,
}) => {
  const isNeutral = diff === 0;
  const isPositive = diff > 0;
  const icon = isNeutral ? "−" : isPositive ? "↑" : "↓";
  const colorClass = isNeutral
    ? "text-muted-foreground"
    : isPositive
      ? "text-success"
      : "text-destructive";
  const isZeroValue = value === 0 || value === "0";

  return (
    <Card className="" contentClassName="">
      <p className="text-label mb-4">{label}</p>
      <div className="flex items-baseline gap-1.5 mb-2">
        <h3
          className={`heading-3 !font-mono ${isZeroValue ? "text-muted-foreground" : "text-foreground"}`}
        >
          {value}
        </h3>
        {unit && (
          <span className="text-sm font-light text-muted-foreground">
            {unit}
          </span>
        )}
      </div>
      {hasHistory && diff !== 0 && (
        <p className={`text-xs tracking-wide ${colorClass}`}>
          {icon} <span className="font-mono">{Math.abs(diff)}
          {diffUnit}</span> {diffLabel}
        </p>
      )}
    </Card>
  );
};

const StatCards = () => {
  const { user } = useAuthStore();
  const { data: sessions = [], isLoading: sessionsLoading } =
    useTaskSessionsQuery(user?.id);
  const { data: journals = [], isLoading: journalsLoading } = useJournalsQuery(
    user?.id,
  );
  const { data: bookmarkedItems = [], isLoading: bookmarkedLoading } =
    useBookmarkedQuery(user?.id);
  const isLoading = sessionsLoading || journalsLoading || bookmarkedLoading;

  const weekStart = getWeekStart();
  const prevWeekStart = weekStart.subtract(7, "day");
  const prevWeekEnd = weekStart.subtract(1, "millisecond");

  const thisWeekSessions = sessions.filter((s) =>
    dayjs(s.createdAt).isAfter(weekStart),
  );
  const prevWeekSessions = sessions.filter(
    (s) =>
      dayjs(s.createdAt).isAfter(prevWeekStart) &&
      dayjs(s.createdAt).isBefore(prevWeekEnd),
  );

  const thisWeekMins = thisWeekSessions.reduce(
    (a, s) => a + (s.duration || 0),
    0,
  );
  const prevWeekMins = prevWeekSessions.reduce(
    (a, s) => a + (s.duration || 0),
    0,
  );
  const timeFocused = formatTimeFocused(thisWeekMins);
  const timeFocusedDiff =
    timeFocused.unit === "h"
      ? {
          diff: parseFloat(
            (
              parseFloat(minutesToHours(thisWeekMins)) -
              parseFloat(minutesToHours(prevWeekMins))
            ).toFixed(1),
          ),
          unit: "h",
        }
      : { diff: Math.round(thisWeekMins - prevWeekMins), unit: "m" };

  const sessionsDiff = thisWeekSessions.length - prevWeekSessions.length;

  const thisWeekJournals = journals.filter((j) =>
    dayjs(j.date).isAfter(weekStart),
  );
  const prevWeekJournals = journals.filter((j) => {
    const d = dayjs(j.date);
    return d.isAfter(prevWeekStart) && d.isBefore(prevWeekEnd);
  });
  const journalsDiff = thisWeekJournals.length - prevWeekJournals.length;

  const finishedItems = bookmarkedItems.filter((b) => b.status === "finished");
  const thisWeekRead = finishedItems.filter((b) =>
    dayjs(b.updatedAt).isAfter(weekStart),
  );
  const prevWeekRead = finishedItems.filter((b) => {
    const d = dayjs(b.updatedAt);
    return d.isAfter(prevWeekStart) && d.isBefore(prevWeekEnd);
  });
  const readDiff = thisWeekRead.length - prevWeekRead.length;

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 xl:gap-6 [&>*]:h-40">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className="h-full w-full" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-5 xl:gap-6 [&>*]:h-40">
      <StatCard
        label="Sessions Completed"
        value={thisWeekSessions.length}
        diff={sessionsDiff}
        diffLabel="vs last week"
        hasHistory={sessions.length > 0}
      />
      <StatCard
        label="Time Focused"
        value={timeFocused.value}
        unit={timeFocused.unit}
        diff={timeFocusedDiff.diff}
        diffUnit={timeFocusedDiff.unit}
        diffLabel="vs last week"
        hasHistory={sessions.length > 0}
      />
      <StatCard
        label="Journal Entries"
        value={thisWeekJournals.length}
        diff={journalsDiff}
        diffLabel="vs last week"
        hasHistory={journals.length > 0}
      />
      <StatCard
        label="Read Entries"
        value={thisWeekRead.length}
        diff={readDiff}
        diffLabel="vs last week"
        hasHistory={bookmarkedItems.length > 0}
      />
    </div>
  );
};

export default StatCards;
