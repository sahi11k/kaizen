import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "@/shared/ui/button";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { Tooltip } from "@/shared/ui/tooltip";
import { MoreOptions } from "@/shared/ui/more-options";

const base =
  "group flex items-center gap-4 cursor-pointer mb-1 px-3 py-2 rounded-md transition-colors bg-background";
const hover = "hover:bg-sidebar-accent";
const activeClass =
  "bg-primary-light text-primary hover:bg-primary-light hover:text-primary";
const completedClass = "text-muted-foreground opacity-50";

const TaskItem = ({
  task,
  onEdit,
  onRemove,
  onComplete,
  onClick,
  isActive,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const getTaskClass = () => {
    return cn(base, hover, {
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
      {...attributes}
      {...listeners}
    >
      <div className="flex items-center gap-1 shrink-0">
        <Tooltip content={completeTooltip}>
          <Button
            onClick={onComplete}
            variant="icon"
            icon={<CheckCircle2 className="size-5" color="currentColor" />}
            className={`!p-0 hover:bg-transparent ${
              isActive ? "text-primary" : ""
            }`}
            aria-label={completeTooltip}
            aria-pressed={task.completed}
          />
        </Tooltip>
      </div>

      <div className="flex-1">
        <div
          className="text-base font-semibold line-clamp-1"
          style={{ textDecoration: task.completed ? "line-through" : "none" }}
        >
          {task.title}
        </div>
        <div
          className={`text-[13px] tracking-wide ${
            isActive ? "text-primary" : "text-muted-foreground"
          }`}
        >
          {task.completed
            ? "Done"
            : `Sessions : ${task.completedSessions}/${task.totalSessions}`}
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
