import React, { useMemo } from "react";
import dayjs from "dayjs";
import { Link } from "react-router";
import { useAuthStore } from "@/features/auth";
import { useTasksQuery } from "@/features/pomodoro";
import { Card, Skeleton } from "@/shared/ui";

const StaleTasksWidget = () => {
  const { user } = useAuthStore();
  const { data: tasks = [], isLoading } = useTasksQuery(user?.id);

  const incompleteTasks = tasks.filter((t) => !t.completed);

  const staleTasks = useMemo(() => {
    return incompleteTasks
      .map((t) => ({
        ...t,
        days: dayjs().diff(dayjs(t.updatedAt || t.createdAt), "day"),
      }))
      .filter((t) => t.days >= 3)
      .sort((a, b) => b.days - a.days)
      .slice(0, 4);
  }, [incompleteTasks]);

  if (isLoading) {
    return <Skeleton className="h-full w-full" />;
  }

  return (
    <Card className="h-full" contentClassName="flex h-full flex-col">
      <div className="flex justify-between items-baseline mb-5">
        <p className="label-overline">
          Stale Tasks
        </p>
      </div>

      {staleTasks.length > 0 ? (
        <div>
          {staleTasks.map((task) => (
            <div
              key={task.id}
              className="flex justify-between items-baseline py-3 border-b border-border last:border-0"
            >
              <span className="text-sm text-foreground/70 flex-1 mr-5 leading-relaxed">
                {task.title}
              </span>
              <span
                className={`font-mono text-sm whitespace-nowrap shrink-0 tracking-tight ${
                  task.days >= 90
                    ? "text-red-500"
                    : task.days >= 30
                      ? "text-red-600"
                      : "text-red-400"
                }`}
              >
                {task.days}d
              </span>
            </div>
          ))}
        </div>
      ) : tasks.length === 0 ? (
        <div className="flex flex-1 items-center justify-center">
          <p className="font-sans text-sm leading-snug text-center text-subtle-foreground italic">
            No tasks yet.
            <br />
            <Link to="/dashboard/pomodoro" className="text-muted-foreground underline">
              Add a task
            </Link>{" "}
            to get started.
          </p>
        </div>
      ) : (
        <p className="flex flex-1 items-center justify-center text-sm text-subtle-foreground italic">
          No stale tasks — great momentum!
        </p>
      )}
    </Card>
  );
};

export default StaleTasksWidget;
