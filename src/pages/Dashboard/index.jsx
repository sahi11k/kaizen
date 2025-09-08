import React from "react";
import styles from "./style.module.css";
import GreetingsWidget from "@/components/Dashboard/GreetingsWidget";
import PomodoroWidget from "@/components/Dashboard/PomodoroWidget";
import JournalsWidget from "@/components/Dashboard/JournalsWidget";
import ProgressChartWidget from "@/components/Dashboard/ProgressChartWidget";
import TotalHoursWidget from "@/components/Dashboard/TotalHoursWidget";
import TaskListWidget from "@/components/Dashboard/TaskListWidget";
import ToolsUsageWidget from "@/components/Dashboard/ToolsUsageWidget";
import PrWidget from "@/components/Dashboard/PrWidget";
import Widget from "@/components/Dashboard/Widget";

const Dashboard = () => {
  return (
    <div className={styles.dashboard}>
      <div className={`${styles.widget} ${styles.dashboard__greetings}`}>
        <GreetingsWidget />
      </div>
      <div className={`${styles.widget} ${styles.dashboard__progressChart}`}>
        <ProgressChartWidget />
      </div>
      <div className={`${styles.widget} ${styles.dashboard__totalHours}`}>
        <TotalHoursWidget />
      </div>
      <div className={`${styles.widget} ${styles.dashboard__pomodoro}`}>
        <PomodoroWidget />
      </div>
      <div className={`${styles.widget} ${styles.dashboard__journals}`}>
        <JournalsWidget />
      </div>
      <div className={`${styles.widget} ${styles.dashboard__taskList}`}>
        <TaskListWidget />
      </div>
      <div className={`${styles.widget} ${styles.dashboard__toolsUsage}`}>
        <ToolsUsageWidget />
      </div>
      <div className={`${styles.widget} ${styles.dashboard__pr}`}>
        <PrWidget />
      </div>
      <div className={`${styles.widget} ${styles.dashboard__widget}`}>
        <Widget />
      </div>
    </div>
  );
};

export default Dashboard;
