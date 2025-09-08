import React from "react";
import styles from "./style.module.css";
import PlayIcon from "@/assets/icons/play.svg?react";
import StopIcon from "@/assets/icons/stop.svg?react";
import ScheduleOutlineIcon from "@/assets/icons/schedule-outline.svg?react";
import CupIcon from "@/assets/icons/cup.svg?react";
import CheckCircleOutlineIcon from "@/assets/icons/checkcircle-outline.svg?react";
import useTasksStore from "@/store/tasks";
import widgetStyles from "../styles.module.css";

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
            icon={<ScheduleOutlineIcon />}
            title="Focus Time"
            value="10 hrs"
          />
          <SessionInsightItem
            icon={<CupIcon />}
            title="Break Time"
            value="10 hrs"
          />
          <SessionInsightItem
            icon={<CheckCircleOutlineIcon />}
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
                <PlayIcon />
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
