import React from "react";
import dayjs from "dayjs";
import { CheckCircle2, Flame } from "lucide-react";

import { Button, MoreOptions, Tooltip } from "@/shared/ui";
import {
  getNextHabitDueDate,
  getTodayDateKey,
  isHabitCompletedForDate,
  isHabitStarted,
} from "@/features/habits/utils";
import { cn } from "@/shared/lib/utils";

const base =
  "group flex items-center gap-4 cursor-pointer px-3 py-2 rounded-lg transition-colors bg-background";
const hover = "hover:bg-muted";
const activeClass =
  "bg-primary-container text-primary-container-foreground hover:bg-primary-container hover:text-primary-container-foreground";
const completedClass = "text-muted-foreground";

const CompleteButton = ({
  canComplete,
  completeTooltip,
  completed,
  isActive,
  onCompleteToggle,
}) => {
  const button = (
    <Button
      onClick={(e) => {
        e.stopPropagation();
        if (canComplete) onCompleteToggle();
      }}
      variant="icon"
      icon={<CheckCircle2 className="size-5" color="currentColor" />}
      className={cn(
        "!p-0 hover:bg-transparent",
        completed && "text-primary",
        isActive && "text-primary-container-foreground",
        !canComplete && "opacity-40",
      )}
      aria-label={completeTooltip}
      aria-pressed={completed}
      disabled={!canComplete}
    />
  );

  return (
    <Tooltip content={completeTooltip}>
      {canComplete ? (
        button
      ) : (
        <span
          className="inline-flex shrink-0 rounded-full"
          onClick={(e) => e.stopPropagation()}
          role="presentation"
        >
          {button}
        </span>
      )}
    </Tooltip>
  );
};

const HabitListItem = ({
  habit,
  entries,
  dateKey,
  isActive,
  isLifecycleCompleted,
  isMuted = false,
  canCompleteOverride,
  disabledCompleteTooltip,
  hideCompleteButton = false,
  streakCount = 0,
  onClick,
  onEdit,
  onDelete,
  onCompleteToggle,
}) => {
  const completed = isHabitCompletedForDate(habit.id, entries, dateKey);
  const canComplete =
    canCompleteOverride ??
    (!isLifecycleCompleted && isHabitStarted(habit, dateKey));
  const nextDueLabel = getCompactNextDueLabel(habit, dateKey, completed);
  const completeTooltip = isLifecycleCompleted
    ? "Habit completed"
    : !canComplete && disabledCompleteTooltip
      ? disabledCompleteTooltip
      : completed
        ? "Undo check-in"
        : canComplete
          ? "Check in"
          : "Habit starts later";

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " " || e.code === "Space") {
      e.preventDefault();
      onClick?.(e);
    }
  };

  const handleMenuAction = (action) => {
    window.setTimeout(() => {
      action?.();
    }, 0);
  };

  return (
    <li
      className={cn(base, hover, {
        [activeClass]: isActive,
        [completedClass]:
          (completed || isLifecycleCompleted || isMuted) && !isActive,
      })}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role="option"
      aria-selected={isActive}
      tabIndex={0}
    >
      {!hideCompleteButton && (
        <CompleteButton
          canComplete={canComplete}
          completeTooltip={completeTooltip}
          completed={completed}
          isActive={isActive}
          onCompleteToggle={onCompleteToggle}
        />
      )}

      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <div
          className={cn(
            "truncate text-base font-semibold",
            (completed || isLifecycleCompleted) && "line-through",
          )}
        >
          {habit.name}
        </div>
        <div
          className={cn(
            "flex min-w-0 items-center gap-1.5 truncate text-[13px]",
            !isActive && "text-muted-foreground",
          )}
        >
          <span className="truncate">{nextDueLabel}</span>
          <span aria-hidden="true">·</span>
          <span
            className={cn(
              "inline-flex shrink-0 items-center gap-1 text-xs font-medium text-amber-500",
              isActive && "text-primary-container-foreground",
            )}
            aria-label={`${streakCount} day streak`}
          >
            <Flame className="size-4" aria-hidden="true" />
            <span>{streakCount}</span>
          </span>
        </div>
      </div>

      <MoreOptions
        triggerClassName="!p-0 w-0 overflow-hidden group-hover:w-auto data-[state=open]:w-auto hover:bg-transparent"
        contentClassName="border-border"
        align="end"
        items={[
          {
            label: "Edit",
            onClick: (e) => {
              e?.stopPropagation();
              handleMenuAction(onEdit);
            },
          },
          {
            label: "Delete",
            onClick: (e) => {
              e?.stopPropagation();
              handleMenuAction(onDelete);
            },
            className: "hover:!bg-destructive/10 !text-destructive",
          },
        ]}
      />
    </li>
  );
};

const getCompactNextDueLabel = (habit, dateKey, completedForDate) => {
  const nextDueDate = getNextHabitDueDate(habit, dateKey, completedForDate);
  if (!nextDueDate) return "No upcoming";

  const today = dayjs(getTodayDateKey()).startOf("day");
  const dueDate = dayjs(nextDueDate).startOf("day");

  if (dueDate.isSame(today, "day")) return "Today";
  if (dueDate.isSame(today.add(1, "day"), "day")) return "Tomorrow";
  return dueDate.format("MMM D");
};

export default HabitListItem;
