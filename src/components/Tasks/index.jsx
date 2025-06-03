import React, { useState } from "react";
import styles from "./style.module.css";
import PlusIcon from "@/assets/icons/plus.svg?react";
import TaskItem from "@/components/Tasks/TaskItem";
import AddForm from "@/components/Tasks/AddForm";
import { CREATE, EDIT, MIN_SESSIONS } from "@/utils/constants";

const DEFAULT_FORM_VALUES = {
  title: "",
  description: "",
  totalSessions: MIN_SESSIONS,
  category: "others",
};

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [mode, setMode] = useState(CREATE);
  const [formValues, setFormValues] = useState(DEFAULT_FORM_VALUES);

  const handleSave = () => {
    const task = {
      ...formValues,
      ...(mode === CREATE
        ? {
            id: crypto.randomUUID(),
            completed: false,
            completedSessions: 0,
          }
        : {}),
    };
    if (mode === CREATE) {
      setTasks((prevTasks) => [...prevTasks, task]);
    } else if (mode === EDIT) {
      setTasks((prevTasks) =>
        prevTasks.map((t) => (t.id === task.id ? task : t))
      );
    }
    handleCancel();
  };

  const handleCancel = () => {
    setShowModal(false);
    setFormValues(DEFAULT_FORM_VALUES);
    setMode(CREATE);
  };

  const handleRemove = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((t) => t.id !== taskId));
  };

  // function onDragStart(e) {
  //   const $dragHandle = e.target.closest('[data-action="drag"]');
  //   if (!$dragHandle) return;
  //   const $taskItem = $dragHandle.closest(".task-item");
  //   e.dataTransfer.setData("text/plain", $taskItem.dataset.id);
  //   e.dataTransfer.setDragImage($taskItem, $taskItem.clientWidth, 0);
  // }

  // function onDragOver(e) {
  //   e.preventDefault();
  // }

  // function onDrop(e) {
  //   e.preventDefault();
  //   const draggedTaskId = e.dataTransfer.getData("text/plain");
  //   const $dropTarget = e.target.closest(".task-item");

  //   if (!$dropTarget || draggedTaskId === $dropTarget.dataset.id) return;

  //   const tasks = store.getTasks();
  //   const draggedTaskIndex = tasks.findIndex(
  //     (task) => task.id === draggedTaskId
  //   );
  //   const dropTargetIndex = tasks.findIndex(
  //     (task) => task.id === $dropTarget.dataset.id
  //   );

  //   const [draggedTask] = tasks.splice(draggedTaskIndex, 1);
  //   tasks.splice(dropTargetIndex, 0, draggedTask);

  //   store.updateTasks(tasks);
  //   renderTaskList(tasks);
  // }

  // const onTaskComplete = ($taskItem) => {
  //   const taskId = $taskItem.dataset.id;
  //   const task = store.getTaskById(taskId);
  //   task.completed = !task.completed;
  //   task.completedSessions = task.completed ? task.sessions : 0;
  //   store.updateTask(task);
  //   const tasks = store.getTasks();
  //   renderTaskList(tasks);
  // };

  return (
    <>
      <div className="card">
        <div className="card__header">Task List</div>
        <div className={`card__body ${styles.taskListContainer}`}>
          <ul className={styles.taskList}>
            {tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onEdit={() => {
                  setShowModal(true);
                  setFormValues(task);
                  setMode(EDIT);
                }}
                onRemove={() => handleRemove(task.id)}
                onDrag={() => {}}
              />
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
          {showModal && (
            <AddForm formValues={formValues} setFormValues={setFormValues} />
          )}
        </div>
        <div className={`card__footer ${styles.formFooter}`}>
          {showModal ? (
            <>
              <button
                className={`btn ${styles.addTaskBtn}`}
                onClick={handleCancel}
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
              onClick={() => {
                setShowModal(true);
                setMode(CREATE);
              }}
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
