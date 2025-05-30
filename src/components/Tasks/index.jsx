import React from "react";
import styles from "./style.module.css";
import PlusIcon from "@/assets/icons/plus.svg?react";

const Tasks = () => {
  return (
    <div className="card">
      <div className="card__header">Task List</div>
      <div className={`card__body ${styles.taskListContainer}`}>
        <ul className={styles.taskList}></ul>
        <div className={styles.taskListEmpty}>
          <div className={styles.taskListEmptyContent}>
            <span className={styles.taskListEmptyIcon}> 🗂️ </span>
            <span className={styles.taskListEmptyMessage}>
              <strong>No Tasks</strong>
              <span>Add a task to get started.</span>
            </span>
          </div>
        </div>
      </div>
      <div className="card__footer">
        <button className={`btn ${styles.addTaskBtn}`}>
          <span className="btn__icon">
            <PlusIcon />
          </span>
          <span className="btn__label">Add Task</span>
        </button>
      </div>
    </div>
  );
};

export default Tasks;
