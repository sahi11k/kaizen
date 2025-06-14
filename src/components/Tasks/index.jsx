import React, { useState, useEffect } from "react";
import styles from "./style.module.css";
import PlusIcon from "@/assets/icons/plus.svg?react";
import TaskItem from "@/components/Tasks/TaskItem";
import AddForm from "@/components/Tasks/AddForm";
import { MIN_SESSIONS } from "@/utils/constants";
import SortableContainer from "@/components/Tasks/SortableContainer";
import { deepCopy } from "@/utils/utils";
import useTasksStore from "@/store/tasks";
import { useShallow } from "zustand/react/shallow";
import {
  createTask,
  deleteTask,
  fetchTasks,
  sortTasks,
  updateTask,
} from "@/db/apis/tasks";
import Skeleton from "@/utils/components/Skeleton";

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
  const [showModal, setShowModal] = useState(false);
  const [mode, setMode] = useState(CREATE);
  const [formValues, setFormValues] = useState(DEFAULT_FORM_VALUES);
  const [isLoading, setIsLoading] = useState(false);

  const { tasks, setTasks, setCurrentTask, currentTask, updateTaskInStore } =
    useTasksStore(
      useShallow((state) => ({
        tasks: state.tasks,
        setTasks: state.setTasks,
        setCurrentTask: state.setCurrentTask,
        currentTask: state.currentTask,
        updateTaskInStore: state.updateTask,
      }))
    );

  useEffect(() => {
    const loadTasks = async () => {
      setIsLoading(true);
      const tasks = await fetchTasks();
      setTasks(tasks);
      setIsLoading(false);
    };

    loadTasks();
  }, []);

  const formSubmitHandler = () => {
    if (mode === CREATE) {
      addTask();
    } else if (mode === EDIT) {
      editTask();
    }
    handleCancel();
  };

  const addTask = async () => {
    const { title, ...rest } = formValues;

    const task = {
      ...rest,
      completed: false,
      completedSessions: 0,
      title: !title || title.trim().length <= 0 ? DEFAULT_TITLE : title,
    };

    const res = await createTask(task);
    if (res.error) {
      // TODO: show error message
      return;
    }
    setTasks([...tasks, ...res.data]);
  };

  const editTask = async () => {
    const { title } = formValues;
    const task = {
      ...formValues,
      title: !title || title.trim().length <= 0 ? DEFAULT_TITLE : title,
    };

    const res = await updateTask(task);
    if (res.error) {
      // TODO: show error message
      return;
    }
    updateTaskInStore(res.data[0]);
  };

  const handleCancel = () => {
    setShowModal(false);
    setFormValues(DEFAULT_FORM_VALUES);
    setMode(CREATE);
  };

  const taskRemoveHandler = async (taskId) => {
    const res = await deleteTask(taskId);
    if (res.error) {
      // TODO: show error message
      return;
    }
    const updatedTasks = tasks.filter((t) => t.id !== taskId);
    setTasks(updatedTasks);
    if (currentTask?.id === taskId) {
      setCurrentTask(null);
    }
  };

  const taskCompleteHandler = async (taskId) => {
    const task = tasks.find((t) => t.id === taskId);
    const res = await updateTask({
      id: taskId,
      completed: !task.completed,
    });
    if (res.error) {
      // TODO: show error message
      return;
    }
    updateTaskInStore(res.data[0]);
  };

  const taskEditHandler = (task) => {
    setShowModal(true);
    setFormValues(task);
    setMode(EDIT);
  };

  const taskDragHandler = async (updatedTasks) => {
    // TODO: update tasks in local storage
    // Also update the order in the database, and load items in sorted order
    setTasks(updatedTasks);
  };

  const getCompletedTasks = () => {
    return tasks.filter((task) => task.completed).length;
  };

  const handleTaskClick = (task) => {
    setCurrentTask(task);
  };

  return (
    <div className="card">
      <div className="card__header">
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
            currentTask={currentTask}
          >
            {tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                isActive={currentTask?.id === task.id}
                onEdit={(e) => {
                  e.stopPropagation();
                  taskEditHandler(task);
                }}
                onRemove={(e) => {
                  e.stopPropagation();
                  taskRemoveHandler(task.id);
                }}
                onComplete={(e) => {
                  e.stopPropagation();
                  taskCompleteHandler(task.id);
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleTaskClick(task);
                }}
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
  );
};

export default Tasks;
