import React, { useEffect } from "react";
import Tasks from "@/components/Tasks";
import Timer from "@/components/Timer";
import { TasksContextProvider } from "@/contexts/TasksContext";
import styles from "./style.module.css";

const Pomodoro = () => {
  return (
    <TasksContextProvider>
      <div className={styles.pomodoro}>
        <Timer />
        <Tasks />
      </div>
    </TasksContextProvider>
  );
};

export default Pomodoro;
