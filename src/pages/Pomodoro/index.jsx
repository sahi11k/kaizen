import React from "react";
import TaskList from "@/components/TaskList";
import Timer from "@/components/Timer";
import styles from "./style.module.css";

const Pomodoro = () => {
  return (
    <div className={styles.pomodoro}>
      <Timer />
      <TaskList />
    </div>
  );
};

export default Pomodoro;
