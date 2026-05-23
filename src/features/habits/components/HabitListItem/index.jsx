import React from "react";
import { CheckCircle2, Flame } from "lucide-react";

import { Button, MoreOptions, Tooltip } from "@/shared/ui";
import {
  getNextHabitDueDateLabel,
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

const HabitListItem = ({
  habit,
  entries,
  dateKey,
  isActive,
  isLifecycleCompleted,
  streakCount = 0,
  onClick,
  onEdit,
  onDelete,
  onCompleteToggle,
}) => {
  const completed = isHabitCompletedForDate(habit.id, entries, dateKey);
  const canComplete = !isLifecycleCompleted && isHabitStarted(habit, dateKey);
  const nextDueLabel = getNextHabitDueDateLabel(habit, dateKey, completed);
  const completeTooltip = isLifecycleCompleted
    ? "Habit completed"
    : completed
    ? "Mark pending for today"
    : canComplete
      ? "Mark done for today"
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
        [completedClass]: (completed || isLifecycleCompleted) && !isActive,
      })}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role="option"
      aria-selected={isActive}
      tabIndex={0}
    >
      <Tooltip content={completeTooltip}>
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
      </Tooltip>

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
            "truncate text-[13px]",
            !isActive && "text-muted-foreground",
          )}
        >
          {nextDueLabel}
        </div>
      </div>

      <div
        className={cn(
          "flex shrink-0 items-center gap-1 text-xs font-medium text-amber-500",
          isActive && "text-primary-container-foreground",
        )}
        aria-label={`${streakCount} day streak`}
      >
        <span>{streakCount}</span>
        <Flame className="size-4" aria-hidden="true" />
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

export default HabitListItem;
