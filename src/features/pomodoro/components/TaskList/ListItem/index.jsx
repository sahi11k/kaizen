import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button, Tooltip, MoreOptions } from "@/shared/ui";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { getTaskSessionSummary } from "../utils";

const base =
  "group flex items-center gap-4 cursor-pointer px-3 py-3 rounded-lg transition-colors border border-border hover:bg-muted";
const activeClass = "border-l-2 border-l-primary rounded-l-none";
const completedClass =
  "border-border opacity-40 hover:opacity-60";

const TaskItem = ({
  task,
  onEdit,
  onRemove,
  onComplete,
  onClick,
  isActive,
  isSortable = true,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const getTaskClass = () => {
    return cn(base, {
      [activeClass]: isActive,
      [completedClass]: task.completed && !isActive,
    });
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " " || e.code === "Space") {
      e.preventDefault();
      onClick?.(e);
    }
  };

  const completeTooltip = task.completed
    ? "Mark as incomplete"
    : "Mark as complete";
  const sessionSummary = getTaskSessionSummary(task);

  return (
    <li
      ref={setNodeRef}
      className={getTaskClass()}
      style={style}
      onClick={onClick}
      onKeyDown={onKeyDown}
      role="option"
      aria-selected={isActive}
      tabIndex={0}
      {...(isSortable ? attributes : {})}
      {...(isSortable ? listeners : {})}
    >
      <div className="flex items-center gap-1 shrink-0">
        <Tooltip content={completeTooltip}>
          <Button
            onClick={onComplete}
            variant="icon"
            icon={<CheckCircle2 className="size-5" color="currentColor" />}
            className={cn(
              "!p-0 hover:bg-transparent",
              task.completed && "text-[var(--color-success)]",
            )}
            aria-label={completeTooltip}
            aria-pressed={task.completed}
          />
        </Tooltip>
      </div>

      <div className="flex flex-col flex-1 w-0 gap-1">
        <div
          className={cn(
            "text-base font-semibold truncate",
            "font-heading",
            task.completed && "line-through",
          )}
        >
          {task.title}
        </div>
        <div className="text-[12px] tracking-wide text-muted-foreground">
          Sessions: <span>{sessionSummary}</span>
        </div>
      </div>
      <MoreOptions
        triggerClassName="!p-0 w-0 overflow-hidden group-hover:w-auto data-[state=open]:w-auto hover:bg-transparent"
        contentClassName="border-border"
        align="end"
        items={[
          { label: "Edit", onClick: onEdit },
          {
            label: "Delete",
            onClick: onRemove,
            className: "hover:!bg-destructive/10 !text-destructive",
          },
        ]}
      />
    </li>
  );
};

export default TaskItem;
