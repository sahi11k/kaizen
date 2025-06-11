import React from "react";
import styles from "./style.module.css";
import CheckIcon from "@/assets/icons/check.svg?react";
import EditIcon from "@/assets/icons/edit.svg?react";
import DeleteIcon from "@/assets/icons/delete.svg?react";
import DragIcon from "@/assets/icons/drag.svg?react";
import { TASK_CATEGORY_ICONS } from "@/utils/constants";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const TaskItem = ({ task, onEdit, onRemove, onComplete }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      ref={setNodeRef}
      className={`${styles.taskItem} ${task.completed ? styles.active : ""}`}
      style={style}
    >
      <div className={styles.taskItem__status}>
        <button
          className={`btn ${styles.taskItem__actionItem}`}
          onClick={onComplete}
        >
          <CheckIcon />
        </button>
      </div>
      <div className={styles.taskItem__category}>
        <div className={styles.taskItem__categoryIcon}>
          {TASK_CATEGORY_ICONS[task.category] || TASK_CATEGORY_ICONS.others}
        </div>
      </div>
      <div className={styles.taskItem__details}>
        <div className={styles.taskItem__title}>{task.title}</div>
        <div className={styles.taskItem__progress}>
          <div className={styles.taskItem__sessions}>
            {task.completed
              ? "Done"
              : `Sessions : ${task.completedSessions}/${task.totalSessions}`}
          </div>
        </div>
      </div>
      <div className={styles.taskItem__actions}>
        <button
          className={`btn ${styles.taskItem__actionItem}`}
          onClick={onEdit}
        >
          <EditIcon />
        </button>
        <button
          className={`btn ${styles.taskItem__actionItem}`}
          onClick={onRemove}
        >
          <DeleteIcon />
        </button>
        <button
          className={`btn ${styles.taskItem__actionItem} ${styles.taskItem__actionItemDrag}`}
          {...attributes}
          {...listeners}
        >
          <DragIcon />
        </button>
      </div>
    </li>
  );
};

export default TaskItem;
