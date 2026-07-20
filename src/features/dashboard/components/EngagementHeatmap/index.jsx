import React, { useMemo } from "react";
import dayjs from "dayjs";
import { Link } from "react-router";
import { useAuthStore } from "@/features/auth";
import { useTasksQuery, useTaskSessionsQuery } from "@/features/pomodoro";
import { useJournalsQuery } from "@/features/journals";
import { Card, Skeleton } from "@/shared/ui";
import { getDayKeys } from "../../utils/dateRange";
import { buildDayMap, heatmapLevel } from "../../utils/heatmap";

const HeatmapCell = ({ level }) => {
  const bg = level === "active" ? "bg-primary" : "bg-background";

  return <div className={`h-8 min-h-8 min-w-8 rounded-md ${bg}`} />;
};

const HeatmapRow = ({ label, tooltip, levels }) => (
  <div
    className="grid gap-2 items-center grid-cols-[minmax(64px,auto)_repeat(7,minmax(2rem,1fr))]"
  >
    <span className="body-base !text-xs pr-0.5 md:pr-1.5" title={tooltip}>
      {label}
    </span>
    {levels.map((lvl, i) => (
      <HeatmapCell key={i} level={lvl} />
    ))}
  </div>
);

const EngagementHeatmap = () => {
  const { user } = useAuthStore();
  const { data: tasks = [], isLoading: tasksLoading } = useTasksQuery(user?.id);
  const { data: sessions = [], isLoading: sessionsLoading } =
    useTaskSessionsQuery(user?.id);
  const { data: journals = [], isLoading: journalsLoading } = useJournalsQuery(
    user?.id,
  );
  const isLoading = tasksLoading || sessionsLoading || journalsLoading;

  const dayKeys = useMemo(() => getDayKeys(), []);
  const dayLabels = useMemo(
    () => dayKeys.map((k) => dayjs(k).format("dd").charAt(0)),
    [dayKeys],
  );
  const completedTasks = useMemo(
    () => tasks.filter((t) => t.completed),
    [tasks],
  );

  const sessionsByDay = useMemo(
    () => buildDayMap(sessions, (s) => s.createdAt),
    [sessions],
  );
  const journalsByDay = useMemo(
    () => buildDayMap(journals, (j) => j.createdAt || j.date),
    [journals],
  );
  const tasksByDay = useMemo(
    () => buildDayMap(completedTasks, (t) => t.updatedAt),
    [completedTasks],
  );

  const pomodoroLevels = dayKeys.map((k) => heatmapLevel(sessionsByDay, k));
  const journalLevels = dayKeys.map((k) => heatmapLevel(journalsByDay, k));
  const taskLevels = dayKeys.map((k) => heatmapLevel(tasksByDay, k));
  const pomodoroTaskLevels = dayKeys.map((k, i) =>
    pomodoroLevels[i] === "active" || taskLevels[i] === "active"
      ? "active"
      : "none",
  );

  const hasActivity =
    pomodoroLevels.includes("active") ||
    journalLevels.includes("active") ||
    taskLevels.includes("active");

  if (isLoading) {
    return <Skeleton className="h-full w-full" />;
  }

  return (
    <Card
      title="7-Day Engagement"
      className="h-full py-3 md:py-4 xl:py-6"
      contentClassName="flex h-full flex-col px-3 md:px-4 xl:px-6"
      headerClassName="px-3 md:px-4 xl:px-6"
    >
      {hasActivity ? (
        <>
          <div className="flex flex-1 flex-col justify-center gap-2 overflow-x-auto pt-2 pb-4">
            <div className="flex flex-col gap-2 min-w-fit">
              <div className="grid gap-2 items-center grid-cols-[minmax(64px,auto)_repeat(7,minmax(2rem,1fr))]">
                <span className="body-base !text-xs pr-0.5 md:pr-1.5 invisible">
                  Journal
                </span>
                {dayLabels.map((d, i) => (
                  <div
                    key={i}
                    className="body-description text-center !text-muted-foreground !text-xs"
                  >
                    {d}
                  </div>
                ))}
              </div>

              <HeatmapRow
                label="Pomo."
                tooltip="Complete Pomodoro & Tasks"
                levels={pomodoroTaskLevels}
              />
              <HeatmapRow label="Journal" levels={journalLevels} />
              <HeatmapRow label="Reading" levels={Array(7).fill("none")} />
            </div>
          </div>

          <div className="flex items-center gap-3.5 pt-4 border-t border-border">
            <span className="text-label text-subtle-foreground">Activity</span>
            {[
              {
                className:
                  "bg-muted dark:bg-[color-mix(in_oklab,var(--card-bg)_65%,white)] border border-border",
                label: "none",
              },
              {
                className: "bg-primary border border-primary",
                label: "active",
              },
            ].map(({ className, label }) => (
              <div key={label} className="flex items-center gap-1">
                <div className={`w-2.5 h-2.5 rounded-sm ${className}`} />
                <span className="text-xs text-muted-foreground">{label}</span>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="flex flex-1 items-center justify-center">
          <p className="font-sans text-sm leading-snug text-center text-subtle-foreground italic">
            No activity this week yet.
            <br />
            Start with{" "}
            <Link
              to="/dashboard/pomodoro"
              className="text-muted-foreground underline"
            >
              Pomodoro
            </Link>
            ,{" "}
            <Link
              to="/dashboard/journals/new"
              className="text-muted-foreground underline"
            >
              Journals
            </Link>
            , or{" "}
            <Link
              to="/dashboard/bookmarked"
              className="text-muted-foreground underline"
            >
              Bookmarked
            </Link>
            .
          </p>
        </div>
      )}
    </Card>
  );
};

export default EngagementHeatmap;
