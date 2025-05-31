import React, { useState } from "react";
import styles from "./style.module.css";
import PlusIcon from "@/assets/icons/plus.svg?react";
import TaskItem from "@/components/Tasks/TaskItem";
import AddModal from "@/components/Tasks/AddModal";
import AddForm from "@/components/Tasks/AddForm";

const Tasks = () => {
  const [tasks, setTasks] = useState(TASKS);
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="card">
        <div className="card__header">Task List</div>
        <div className={`card__body ${styles.taskListContainer}`}>
          {tasks.length ? (
            <ul className={styles.taskList}>
              {tasks.map((task) => (
                <TaskItem key={task.id} task={task} />
              ))}
            </ul>
          ) : (
            <div className={styles.taskListEmpty}>
              <div className={styles.taskListEmptyContent}>
                <span className={styles.taskListEmptyIcon}> 🗂️ </span>
                <span className={styles.taskListEmptyMessage}>
                  <strong>No Tasks</strong>
                  <span>Add a task to get started.</span>
                </span>
              </div>
            </div>
          )}
        </div>
        <div className="card__footer">
          <button
            className={`btn ${styles.addTaskBtn}`}
            onClick={() => setShowModal(true)}
          >
            <span className="btn__icon">
              <PlusIcon />
            </span>
            <span className="btn__label">Add Task</span>
          </button>
        </div>
      </div>
      {showModal && <AddForm visible={showModal} setVisible={setShowModal} />}
    </>
  );
};

const TASKS = [
  {
    id: "task-1",
    name: "Complete JavaScript Course",
    category: "study",
    sessions: 8,
    completedSessions: 3,
    completed: false,
  },
  {
    id: "task-2",
    name: "Morning Workout Routine",
    category: "health",
    sessions: 5,
    completedSessions: 4,
    completed: false,
  },
  {
    id: "task-3",
    name: "Write Blog Post",
    category: "writing",
    sessions: 3,
    completedSessions: 3,
    completed: true,
  },
  {
    id: "task-4",
    name: "Read Design Patterns Book - Devils wear Prada",
    category: "study",
    sessions: 6,
    completedSessions: 2,
    completed: false,
  },
  {
    id: "task-5",
    name: "Practice Piano",
    category: "music",
    sessions: 10,
    completedSessions: 7,
    completed: false,
  },
];

export default Tasks;
