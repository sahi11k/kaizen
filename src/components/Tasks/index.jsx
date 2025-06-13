import React, { useState, useEffect } from "react";
import styles from "./style.module.css";
import PlusIcon from "@/assets/icons/plus.svg?react";
import TaskItem from "@/components/Tasks/TaskItem";
import AddForm from "@/components/Tasks/AddForm";
import { MIN_SESSIONS } from "@/utils/constants";
import SortableContainer from "@/components/Tasks/SortableContainer";
import { deepCopy } from "@/utils/utils";
import useTasksStore from "@/store/tasks";

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
  const tasks = useTasksStore((state) => state.tasks);
  const setTasks = useTasksStore((state) => state.setTasks);

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
      setTasks([...tasks, task]);
    } else if (mode === EDIT) {
      const updatedTasks = tasks.map((t) => (t.id === task.id ? task : t));
      setTasks(updatedTasks);
    }
    handleCancel();
  };

  const handleCancel = () => {
    setShowModal(false);
    setFormValues(DEFAULT_FORM_VALUES);
    setMode(CREATE);
  };

  const taskRemoveHandler = (taskId) => {
    const updatedTasks = tasks.filter((t) => t.id !== taskId);
    setTasks(updatedTasks);
  };

  const taskCompleteHandler = (taskId) => {
    const updatedTasks = tasks.map((t) => {
      if (t.id === taskId) {
        return { ...t, completed: !t.completed };
      }
      return t;
    });
    setTasks(updatedTasks);
  };

  const taskEditHandler = (task) => {
    setShowModal(true);
    setFormValues(task);
    setMode(EDIT);
  };

  const taskDragHandler = (updatedTasks) => {
    setTasks(updatedTasks);
  };

  const getCompletedTasks = () => {
    return tasks.filter((task) => task.completed).length;
  };

  return (
    <>
      <div className="card">
        <div className={`card__header ${styles.taskListHeader}`}>
          Task List
          {tasks.length > 0 && (
            <span className={styles.taskListHeader__completed}>
              ({getCompletedTasks()}/{tasks.length})
            </span>
          )}
        </div>
        <div className={`card__body ${styles.taskListContainer}`}>
          <ul className={styles.taskList}>
            <SortableContainer
              tasks={deepCopy(tasks)}
              onDragEnd={taskDragHandler}
            >
              {tasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onEdit={() => taskEditHandler(task)}
                  onRemove={() => taskRemoveHandler(task.id)}
                  onComplete={() => taskCompleteHandler(task.id)}
                />
              ))}
            </SortableContainer>
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
