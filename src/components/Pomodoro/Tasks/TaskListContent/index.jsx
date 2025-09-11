import React, { useState, useEffect, useRef } from "react";
import TaskItem from "@/components/Pomodoro/Tasks/TaskItem";
import AddForm from "@/components/Pomodoro/Tasks/AddForm";
import { CREATE, EDIT } from "@/constants/global";
import SortableContainer from "@/components/Pomodoro/Tasks/SortableContainer";
import { arraysEqual, deepCopy } from "@/utils/jsUtils";
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
import { Toast } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import { FolderOpen, Plus } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { MIN_SESSIONS } from "@/constants/pomodoro";
import { TimerMobile } from "@/components/Pomodoro/Timer";
import { Tooltip } from "@/components/ui/tooltip";
import { STATUS } from "@/constants/db";

const { toast } = Toast;

const DEFAULT_FORM_VALUES = {
  title: "",
  description: "",
  totalSessions: MIN_SESSIONS,
  category: "others",
};

const DEFAULT_TITLE = "Untitled Task";

const TaskListContent = () => {
  const [showModal, setShowModal] = useState(false);
  const [mode, setMode] = useState(CREATE);
  const [formValues, setFormValues] = useState(DEFAULT_FORM_VALUES);
  const [isLoading, setIsLoading] = useState(false);
  const [orderChanged, setOrderChanged] = useState(false);
  const [reorderLoading, setReorderLoading] = useState(false);

  const currentOrder = useRef([]);

  const { user } = useAuthStore();
  const {
    tasks,
    setTasks,
    setCurrentTask,
    currentTask,
    updateTaskInStore,
    tasksFetchStatus,
    setTasksFetchStatus,
  } = useTasksStore(
    useShallow((state) => ({
      tasks: state.tasks,
      setTasks: state.setTasks,
      setCurrentTask: state.setCurrentTask,
      currentTask: state.currentTask,
      updateTaskInStore: state.updateTask,
      tasksFetchStatus: state.tasksFetchStatus,
      setTasksFetchStatus: state.setTasksFetchStatus,
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
      setTasksFetchStatus(STATUS.FETCHED);
    };

    if (tasksFetchStatus === STATUS.LOADING) {
      loadTasks();
    }
  }, [setTasks, user?.id, tasksFetchStatus, setTasksFetchStatus]);

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
    toast.success("Task Created");
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
    toast.success("Task Updated");
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
    toast.success("Task Deleted");
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
    toast.success("Task Updated");
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
    setReorderLoading(true);
    const payload = tasks.map((task, index) => ({
      id: task.id,
      rank: index + 1,
    }));
    const res = await sortTasks(payload, user.id);
    if (res.error) {
      setReorderLoading(false);
      return toast.error(res.error);
    }
    const newTasks = res.data?.slice() || [];
    currentOrder.current = newTasks.map((task) => task.id);
    toast.success("Task Order Updated");
    setOrderChanged(false);
    setTasks(newTasks);
    setReorderLoading(false);
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

  const renderFooter = () => {
    if (orderChanged) {
      return (
        <div className="border-t border-border -mx-6">
          <div className="flex items-center justify-between py-2 md:py-4 gap-4 px-6 text-muted-foreground">
            <strong className="text-sm">Unsaved changes : </strong>
            <div className="flex items-center gap-4">
              <Button
                variant="link"
                onClick={resetTaskOrder}
                size="sm"
                className="text-sm !text-muted-foreground !no-underline"
              >
                Cancel
              </Button>
              <Button
                onClick={updateTaskOrder}
                size="sm"
                className="!text-sm"
                disabled={reorderLoading}
                loading={reorderLoading}
              >
                Update
              </Button>
            </div>
          </div>
        </div>
      );
    }
  };

  console.info({ tasksFetchStatus, tasks, isLoading });

  return (
    <>
      <div className="mt-4 xl:mt-6 pb-2 xl:pb-4 flex items-center justify-between">
        <div>
          <span className="heading-3 mr-1">Tasks</span>
          <span
            className="text-muted-foreground text-sm"
            hidden={tasks.length === 0}
          >
            ({getCompletedTasks()}/{tasks.length})
          </span>
        </div>
        <Tooltip content="Add task">
          <Button
            onClick={() => setShowModal(true)}
            icon={<Plus className="size-4" />}
            size="sm"
            className="hidden md:flex"
          >
            Task
          </Button>
        </Tooltip>
      </div>
      <div className="h-full overflow-y-auto scrollbar-thin -mr-4 xl:-mr-6 -ml-2">
        <ul className="pr-2 xl:pr-4" role="listbox">
          <SortableContainer
            tasks={deepCopy(tasks)}
            onDragEnd={taskDragHandler}
            currentTask={currentTask}
          >
            {tasks.map((task) => {
              return (
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
                  showModal={showModal}
                />
              );
            })}
          </SortableContainer>
        </ul>
        <div className="pr-6">
          {isLoading &&
            tasks.length === 0 &&
            Array.from({ length: 3 }).map((_, index) => (
              <Skeleton
                key={index}
                className="h-16 w-full bg-card mb-2 rounded-lg"
              />
            ))}
        </div>
        {tasks.length === 0 && !showModal && !isLoading && (
          <div className="flex justify-center items-center h-full">
            <div className="flex flex-col items-center gap-3 text-muted-foreground">
              <FolderOpen className="size-8" />
              <div className="flex flex-col items-center">
                <h3 className="heading-3">No Tasks</h3>
                <p className="body-description">Add a task to get started.</p>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-center items-center pt-2 pb-4 gap-2 mx-auto relative w-full bg-transparent">
        <TimerMobile />
        <Tooltip content="Add task">
          <Button
            onClick={() => setShowModal(true)}
            className="rounded-full justify-end absolute right-0 h-10 w-10 flex items-center justify-center md:hidden"
            icon={<Plus className="size-5" />}
            variant="secondary"
          />
        </Tooltip>
      </div>
      <>{renderFooter()}</>
      <AddForm
        setFormValues={setFormValues}
        formValues={formValues}
        showModal={showModal}
        setShowModal={setShowModal}
        onSave={formSubmitHandler}
        onCancel={handleCancel}
      />
    </>
  );
};

export default TaskListContent;
