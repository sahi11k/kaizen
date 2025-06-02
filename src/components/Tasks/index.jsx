import React, { useState } from "react";
import styles from "./style.module.css";
import PlusIcon from "@/assets/icons/plus.svg?react";
import TaskItem from "@/components/Tasks/TaskItem";
import AddForm from "@/components/Tasks/AddForm";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    totalSessions: 0,
  });

  const handleSave = (task) => {
    setTasks([...tasks, task]);
    setShowModal(false);
  };

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="card">
        <div className="card__header">Task List</div>
        <div className={`card__body ${styles.taskListContainer}`}>
          <ul className={styles.taskList}>
            {tasks.map((task) => (
              <TaskItem key={task.id} task={task} />
            ))}
          </ul>
          {tasks.length === 0 && !showModal && (
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
          {showModal && <AddForm form={form} />}
        </div>
        <div className={`card__footer ${styles.formFooter}`}>
          {showModal ? (
            <>
              <button
                className={`btn ${styles.addTaskBtn}`}
                onClick={() => setShowModal(false)}
              >
                <span className="btn__label">Cancel</span>
              </button>
              <button
                className={`btn btn--primary ${styles.addTaskBtn}`}
                onClick={handleSave}
              >
                <span className="btn__label">Save</span>
              </button>
            </>
          ) : (
            <button
              className={`btn ${styles.addTaskBtn}`}
              onClick={() => setShowModal(true)}
            >
              <span className="btn__icon">
                <PlusIcon />
              </span>
              <span className="btn__label">Add Task</span>
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Tasks;
