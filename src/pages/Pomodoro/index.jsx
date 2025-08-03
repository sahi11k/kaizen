import React from "react";
import Timer from "@/components/Pomodoro/Timer";
import Tasks from "@/components/Pomodoro/Tasks";
import styles from "./style.module.css";

const Pomodoro = () => {
  return (
    <div className={styles.pomodoro}>
      <Timer />
      <Tasks />
    </div>
  );
};

export default Pomodoro;
