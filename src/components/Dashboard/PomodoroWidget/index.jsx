import React from "react";
import styles from "./style.module.css";

import useTasksStore from "@/store/tasks";
import widgetStyles from "../styles.module.css";
import { CheckCircle, Clock, Coffee, Play } from "lucide-react";

const PomodoroWidget = () => {
  const { currentTask } = useTasksStore();

  return (
    <div className={`card ${styles.pomodoroWidget}`}>
      <div className={`card__header ${styles.pomodoroWidgetHeader}`}>
        <span> Pomodoro Activity</span>
        <span className={widgetStyles.tag}>Today</span>
      </div>
      <div className={`card__body ${styles.pomodoroWidgetBody}`}>
        <div className={styles.sessionInsights}>
          <SessionInsightItem
            icon={<Clock />}
            title="Focus Time"
            value="10 hrs"
          />
          <SessionInsightItem
            icon={<Coffee />}
            title="Break Time"
            value="10 hrs"
          />
          <SessionInsightItem
            icon={<CheckCircle />}
            title="Sessions Done"
            value="10"
          />
        </div>

        <div className={styles.activePomodoroSession}>
          <div className={styles.activePomodoroSessionHeader}>
            Current Session
          </div>
          <div className={styles.activePomodoroSessionContent}>
            <div className={styles.taskName}>#1001 - Task Name</div>
            <div className={styles.timer}>25:00</div>
            <div className={styles.timerControls}>
              <button className={`btn btn--primary`}>
                <Play />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SessionInsightItem = ({ icon, title, value }) => {
  return (
    <div className={styles.sessionInsightItem}>
      <div className={styles.sessionInsightItemIcon}>{icon}</div>
      <div className={styles.sessionInsightItemContent}>
        <div className={styles.sessionInsightItemTitle}>{title}</div>
        <div className={styles.sessionInsightItemValue}>{value}</div>
      </div>
    </div>
  );
};

export default PomodoroWidget;
