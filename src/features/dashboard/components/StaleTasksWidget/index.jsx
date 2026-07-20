import React, { useMemo } from "react";
import dayjs from "dayjs";
import { Link } from "react-router";
import { ArrowUpRight } from "lucide-react";
import { useAuthStore } from "@/features/auth";
import { useTasksQuery, useTasksStore } from "@/features/pomodoro";
import { Card, Skeleton } from "@/shared/ui";

const StaleTasksWidget = () => {
  const { user } = useAuthStore();
  const { data: tasks = [], isLoading } = useTasksQuery(user?.id);
  const setCurrentTask = useTasksStore((s) => s.setCurrentTask);

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
    <Card
      className="h-full py-3 md:py-4 xl:py-6"
      contentClassName="flex h-full flex-col px-3 md:px-4 xl:px-6"
    >
      <div className="flex justify-between items-baseline mb-5">
        <p className="text-label">Stale Tasks</p>
      </div>

      {staleTasks.length > 0 ? (
        <ul className="list-none m-0 p-0">
          {staleTasks.map((task) => (
            <li
              key={task.id}
              className="flex items-baseline border-b border-border last:border-0 py-3"
            >
              <Link
                to="/dashboard/pomodoro"
                title="Open with Pomodoro"
                aria-label={`Set "${task.title}" as current task`}
                onClick={() => setCurrentTask(task)}
                className="group inline-flex items-center gap-1.5 min-w-0 mr-5 font-sans text-sm leading-relaxed text-muted-foreground"
              >
                <span className="truncate min-w-0 group-hover:text-foreground">
                  {task.title}
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 shrink-0 group-hover:text-foreground" />
              </Link>

              <span
                className={`font-mono text-sm whitespace-nowrap shrink-0 tracking-tight ml-auto ${
                  task.days >= 90
                    ? "text-primary"
                    : task.days >= 30
                      ? "text-foreground"
                      : "text-muted-foreground"
                }`}
              >
                {task.days}d
              </span>
            </li>
          ))}
        </ul>
      ) : tasks.length === 0 ? (
        <div className="flex flex-1 items-center justify-center">
          <p className="font-sans text-sm leading-snug text-center text-subtle-foreground italic">
            No tasks yet.
            <br />
            <Link
              to="/dashboard/pomodoro"
              className="text-muted-foreground underline"
            >
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
