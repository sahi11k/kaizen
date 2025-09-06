import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  CheckCircle2,
  GripVertical,
  Pen,
  Trash2,
} from "lucide-react";

const TaskItem = ({
  task,
  onEdit,
  onRemove,
  onComplete,
  onClick,
  isActive,
  showModal,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const getTaskClass = () => {
    const baseClass =
      "group flex items-center gap-4 cursor-pointer mb-1 px-3 py-2 rounded-lg transition-colors";
    const hoverClass = "hover:bg-accent";
    const activeClass =
      "bg-primary/5 text-primary hover:bg-primary/5 hover:text-primary";
    const completedClass = "text-muted-foreground opacity-50";
    return `${baseClass} ${hoverClass} ${
      isActive ? activeClass : task.completed ? completedClass : ""
    }`;
  };

  return (
    <li
      ref={setNodeRef}
      className={getTaskClass()}
      style={style}
      onClick={onClick}
    >
      <div className="flex items-center gap-1 shrink-0">
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
        />
      </div>

      <div className="flex-1 min-w-0">
        <div
          className="body-base font-medium truncate"
          style={{ textDecoration: task.completed ? "line-through" : "none" }}
        >
          {task.title}
        </div>
        <div
          className={`text-sm ${
            isActive ? "text-primary" : "text-muted-foreground"
          }`}
        >
          {task.completed
            ? "Done"
            : `Sessions : ${task.completedSessions}/${task.totalSessions}`}
        </div>
      </div>

      <div
        className="hidden shrink-0 items-center gap-4 group-hover:flex"
        hidden={showModal}
      >
        <Button
          onClick={onEdit}
          variant="icon"
          icon={<Pen className="size-5" />}
          className="!p-0 hover:bg-transparent"
        />
        <Button
          variant="icon"
          icon={<Trash2 className="size-5" />}
          onClick={onRemove}
          className="!p-0 hover:bg-transparent hover:text-destructive"
        />
        <Button
          {...attributes}
          {...listeners}
          variant="icon"
          icon={<GripVertical className="size-5" />}
          className="!p-0 hover:bg-transparent"
        />
      </div>
    </li>
  );
};

export default TaskItem;
