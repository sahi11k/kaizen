import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { MoreOptions } from "@/shared/ui";
import { GripVertical } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { getTaskSessionSummary } from "../utils";

const base =
  "group flex items-center gap-4 cursor-pointer px-3 py-3 rounded-lg transition-colors border border-overlay-field-border hover:bg-overlay-hover";
const activeClass = "border-l-2 border-l-primary rounded-l-none";
const completedClass = "border-overlay-field-border opacity-55 hover:opacity-75";

const TaskItem = ({
  task,
  onEdit,
  onRemove,
  onComplete,
  onClick,
  isActive,
  isSortable = true,
}) => {
  const { attributes, listeners, setNodeRef, setActivatorNodeRef, transform, transition } =
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

  const completeTooltip = task.completed ? "Mark undone" : "Mark done";
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
    >
      <div className="flex items-center gap-1 shrink-0">
        {isSortable && (
          <span
            ref={setActivatorNodeRef}
            {...listeners}
            className="cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground touch-none"
            aria-label="Drag to reorder"
          >
            <GripVertical className="size-5" />
          </span>
        )}
      </div>

      <div className="flex flex-col flex-1 w-0">
        <div
          className={cn(
            "body-base !text-sm sm:!text-base !text-foreground truncate",
            task.completed && "line-through",
          )}
        >
          {task.title}
        </div>
        <div className="body-description !text-xs sm:!text-sm">
          Sessions: <span>{sessionSummary}</span>
        </div>
      </div>
      <MoreOptions
        triggerClassName="shrink-0 hover:bg-transparent md:!p-0 md:w-0 md:overflow-hidden md:group-hover:w-auto md:data-[state=open]:w-auto"
        contentClassName="border-border"
        align="end"
        items={[
          {
            label: completeTooltip,
            onClick: (e) => { e.stopPropagation(); onComplete(e); },
          },
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
