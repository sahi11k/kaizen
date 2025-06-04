import React, { useState } from "react";
import styles from "./style.module.css";
import PlusIcon from "@/assets/icons/plus.svg?react";
import TaskItem from "@/components/Tasks/TaskItem";
import AddForm from "@/components/Tasks/AddForm";
import { MIN_SESSIONS } from "@/utils/constants";
import { useTasksContext } from "@/contexts/TasksContext";

const EDIT = "edit";
const CREATE = "create";

const DEFAULT_FORM_VALUES = {
  title: "",
  description: "",
  totalSessions: MIN_SESSIONS,
  category: "others",
};

const DEFAULT_TITLE = "Untitled Task";

const Tasks = () => {
  const { tasks, setTasks } = useTasksContext();
  const [showModal, setShowModal] = useState(false);
  const [mode, setMode] = useState(CREATE);
  const [formValues, setFormValues] = useState(DEFAULT_FORM_VALUES);

  const formSubmitHandler = () => {
    const defaultProps =
      mode === CREATE
        ? {
            id: crypto.randomUUID(),
            completed: false,
            completedSessions: 0,
          }
        : {};

    const { title, ...rest } = formValues;

    const task = {
      ...defaultProps,
      ...rest,
      title: !title || title.trim().length <= 0 ? DEFAULT_TITLE : title,
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

  const taskRemoveHandler = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((t) => t.id !== taskId));
  };

  const taskCompleteHandler = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((t) =>
        t.id === taskId ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const taskEditHandler = (task) => {
    setShowModal(true);
    setFormValues(task);
    setMode(EDIT);
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

  return (
    <>
      <div className="card">
        <div className="card__header">
          Task List
          {/* {tasks.length > 0 && <span>{0 / tasks.length}</span>} */}
        </div>
        <div className={`card__body ${styles.taskListContainer}`}>
          <ul className={styles.taskList}>
            {tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onEdit={() => taskEditHandler(task)}
                onRemove={() => taskRemoveHandler(task.id)}
                onDrag={() => {}}
                onComplete={() => taskCompleteHandler(task.id)}
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
                onClick={formSubmitHandler}
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
