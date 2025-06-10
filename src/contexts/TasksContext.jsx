import { createContext, useContext, useState } from "react";

const TasksContext = createContext();

export const TasksContextProvider = (props) => {
  const [tasks, setTasks] = useState(TASKS);

  return <TasksContext.Provider value={{ tasks, setTasks }} {...props} />;
};

export const useTasksContext = () => {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error("useTasksContext must be used within a TasksProvider");
  }
  return context;
};

const TASKS = [
  {
    id: 1,
    title: "Task 1",
    description: "Description 1",
    category: "others",
    totalSessions: 10,
    completedSessions: 0,
    completed: false,
  },
  {
    id: 2,
    title: "Task 2",
    description: "Description 2",
    category: "others",
    totalSessions: 10,
    completedSessions: 0,
    completed: false,
  },
  {
    id: 3,
    title: "Task 3",
    description: "Description 3",
    category: "others",
    totalSessions: 10,
    completedSessions: 0,
    completed: false,
  },
  {
    id: 4,
    title: "Task 4",
    description: "Description 4",
    category: "others",
    totalSessions: 10,
    completedSessions: 0,
    completed: false,
  },
];
