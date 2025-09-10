import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "@/components/ui/button";
import { CheckCircle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import TaskMoreOptions from "@/components/Pomodoro/Tasks/TaskMoreOptions";
import { Tooltip } from "@/components/ui/tooltip";

const base =
  "group flex items-center gap-4 cursor-pointer mb-1 px-3 py-2 rounded-lg transition-colors bg-background";
const hover = "hover:bg-muted";
const activeClass =
  "bg-primary/5 text-primary hover:bg-primary/5 hover:text-primary";
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
      "opacity-50": task.completed,
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
            icon={
              task.completed ? (
                <CheckCircle className="size-5" color="currentColor" />
              ) : (
                <CheckCircle2 className="size-5" color="currentColor" />
              )
            }
            className={`!p-0 hover:bg-transparent ${
              isActive ? "text-primary" : ""
            }`}
            aria-label={completeTooltip}
            aria-pressed={task.completed}
          />
        </Tooltip>
      </div>

      <div className="flex-1 min-w-0">
        <div
          className="text-base font-semibold truncate"
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
      <TaskMoreOptions
        onEdit={onEdit}
        onDelete={onRemove}
        className="opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity"
      />
    </li>
  );
};

export default TaskItem;
