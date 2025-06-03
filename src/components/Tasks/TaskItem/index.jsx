import React from "react";
import styles from "./style.module.css";
import CheckIcon from "@/assets/icons/check.svg?react";
import EditIcon from "@/assets/icons/edit.svg?react";
import DeleteIcon from "@/assets/icons/delete.svg?react";
import DragIcon from "@/assets/icons/drag.svg?react";
import { taskCategoryIcons } from "@/utils/constants";

const TaskItem = ({ task, onEdit, onRemove, onDrag }) => {
  return (
    <li className={`${styles.taskItem} ${task.completed ? styles.active : ""}`}>
      <div className={styles.taskItem__status}>
        <button className={`btn ${styles.taskItem__actionItem}`}>
          <CheckIcon />
        </button>
      </div>
      <div className={styles.taskItem__category}>
        <div className={styles.taskItem__categoryIcon}>
          {taskCategoryIcons[task.category] || taskCategoryIcons.others}
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
          className={`btn ${styles.taskItem__actionItem}`}
          onClick={onDrag}
        >
          <DragIcon />
        </button>
      </div>
    </li>
  );
};

export default TaskItem;
