import React, { useState, useEffect, useRef } from "react";
import styles from "./style.module.css";
import PlusIcon from "@/assets/icons/plus.svg?react";
import TaskItem from "@/components/Pomodoro/Tasks/TaskItem";
import AddForm from "@/components/Pomodoro/Tasks/AddForm";
import { CREATE, EDIT, MIN_SESSIONS } from "@/utils/constants";
import SortableContainer from "@/components/Pomodoro/Tasks/SortableContainer";
import { arraysEqual, deepCopy } from "@/utils/utils";
import useTasksStore from "@/store/tasks";
import useAuthStore from "@/store/auth";
import { useShallow } from "zustand/react/shallow";
import {
  createTask,
  deleteTask,
  fetchTasks,
  sortTasks,
  updateTask,
} from "@/db/apis/tasks";
import Skeleton from "@/utils/components/Skeleton";
import { Toast } from "@/utils/components/Toast";

const { toast } = Toast;

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
  const [orderChanged, setOrderChanged] = useState(false);

  const currentOrder = useRef([]);

  const { user } = useAuthStore();
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
      if (!user?.id) return;

      setIsLoading(true);
      const tasks = await fetchTasks(user.id);
      setTasks(tasks);
      currentOrder.current = tasks.map((task) => task.id);
      setIsLoading(false);
    };

    loadTasks();
  }, [setTasks, user?.id]);

  const formSubmitHandler = () => {
    if (mode === CREATE) {
      addTask();
    } else if (mode === EDIT) {
      editTask();
    }
  };

  const addTask = async () => {
    const { title, ...rest } = formValues;

    // Handle case when no tasks exist - start rank from 1
    const maxRank =
      tasks.length > 0 ? Math.max(...tasks.map((task) => task.rank)) : 0;

    const task = {
      ...rest,
      completed: false,
      completedSessions: 0,
      rank: maxRank + 1,
      title: !title || title.trim().length <= 0 ? DEFAULT_TITLE : title,
    };

    const res = await createTask(task, user.id);
    if (res.error) {
      return toast.error(res.error);
    }

    setTasks([...tasks, ...res.data]);
    toast.success("Task created successfully");
    handleCancel();
  };

  const editTask = async () => {
    const { title } = formValues;
    const task = {
      ...formValues,
      title: !title || title.trim().length <= 0 ? DEFAULT_TITLE : title,
    };

    const res = await updateTask(task, user.id);
    if (res.error) {
      return toast.error(res.error);
    }

    updateTaskInStore(res.data[0]);
    toast.success("Task updated successfully");
    handleCancel();
  };

  const handleCancel = () => {
    setShowModal(false);
    setFormValues(DEFAULT_FORM_VALUES);
    setMode(CREATE);
  };

  const taskRemoveHandler = async (taskId) => {
    const res = await deleteTask(taskId, user.id);
    if (res.error) {
      return toast.error(res.error);
    }
    const updatedTasks = tasks.filter((t) => t.id !== taskId);
    setTasks(updatedTasks);
    if (currentTask?.id === taskId) {
      setCurrentTask(null);
    }
    toast.success("Task deleted successfully");
  };

  const taskCompleteHandler = async (taskId) => {
    const task = tasks.find((t) => t.id === taskId);
    const res = await updateTask(
      {
        id: taskId,
        completed: !task.completed,
      },
      user.id
    );
    if (res.error) {
      return toast.error(res.error);
    }
    updateTaskInStore(res.data[0]);
    toast.success("Task updated successfully");
  };

  const taskEditHandler = (task) => {
    setShowModal(true);
    setFormValues(task);
    setMode(EDIT);
  };

  const taskDragHandler = async (updatedTasks) => {
    const newOrder = updatedTasks.map((task) => task.id);
    const flag = !arraysEqual(newOrder, currentOrder.current);
    setOrderChanged(flag);
    setTasks(updatedTasks);
  };

  const updateTaskOrder = async () => {
    const payload = tasks.map((task, index) => ({
      id: task.id,
      rank: index + 1,
    }));
    const res = await sortTasks(payload, user.id);
    if (res.error) {
      return toast.error(res.error);
    }
    const newTasks = res.data?.slice() || [];
    currentOrder.current = newTasks.map((task) => task.id);
    toast.success("Task order updated successfully");
    setOrderChanged(false);
    setTasks(newTasks);
  };

  const resetTaskOrder = () => {
    const taskMap = new Map(tasks.map((task) => [task.id, task]));

    const reorderedTasks = currentOrder.current
      .map((id) => taskMap.get(id))
      .filter(Boolean);

    setTasks(reorderedTasks);
    setOrderChanged(false);
  };

  const getCompletedTasks = () => {
    return tasks.filter((task) => task.completed).length;
  };

  const handleTaskClick = (task) => {
    if (currentTask?.id === task.id) {
      setCurrentTask(null);
    } else {
      setCurrentTask(task);
    }
  };

  const renderCardFooter = () => {
    if (showModal || orderChanged) {
      const onSave = showModal ? formSubmitHandler : updateTaskOrder;
      const onCancel = showModal ? handleCancel : resetTaskOrder;
      const btnLabel = showModal ? "Save" : "Update Order";
      return (
        <>
          <button className={`btn ${styles.addTaskBtn}`} onClick={onCancel}>
            <span className="btn__label">Cancel</span>
          </button>
          <button
            className={`btn btn--primary ${styles.addTaskBtn}`}
            onClick={onSave}
          >
            <span className="btn__label">{btnLabel}</span>
          </button>
        </>
      );
    }

    return (
      <button
        className={`btn ${styles.addTaskBtn}`}
        onClick={() => {
          if (!user?.id) {
            return toast.error("Please log in to add tasks");
          }
          setShowModal(true);
          setMode(CREATE);
        }}
      >
        <span className="btn__icon">
          <PlusIcon />
        </span>
        <span className="btn__label">Add Task</span>
      </button>
    );
  };

  return (
    <div className={`card ${styles.taskListWrapper}`}>
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
                mode={mode}
              />
            ))}
          </SortableContainer>
        </ul>
        {isLoading && <Skeleton count={3} height={80} />}
        {tasks.length === 0 && !showModal && !isLoading && (
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
        {renderCardFooter()}
      </div>
    </div>
  );
};

export default Tasks;
