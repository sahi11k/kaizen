import React, { useEffect } from "react";
import Tasks from "@/components/Tasks";
import Timer from "@/components/Timer";
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
