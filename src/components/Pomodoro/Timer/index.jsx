import React, { useState, useEffect, useRef } from "react";
import PlayIcon from "@/assets/icons/play.svg?react";
import NextIcon from "@/assets/icons/next.svg?react";
import ResetIcon from "@/assets/icons/reset.svg?react";
import StopIcon from "@/assets/icons/stop.svg?react";
import Tabs from "@/utils/components/Tabs";
import ClockIcon from "@/assets/icons/clock.svg?react";
import CupIcon from "@/assets/icons/cup.svg?react";
import { TIMER_CONSTANTS } from "@/utils/constants";
import { useGetTimerValue, getCurrentTime } from "@/hooks/useGetTimerValue";
import useTasksStore from "@/store/tasks";
import { useShallow } from "zustand/react/shallow";
import { updateTask } from "@/db/apis/tasks";
import useAuthStore from "@/store/auth";
import {
  getTimerDurations,
  getLongBreakInterval,
} from "../../../utils/timerHelpers";
import styles from "./style.module.css";
import SettingsIcon from "@/assets/icons/settings.svg?react";

const { ONGOING_TAB, BREAK_TAB } = TIMER_CONSTANTS;

const Timer = () => {
  const { user, userSettings } = useAuthStore();
  const { currentTask, updateTaskInStore, setCurrentTask } = useTasksStore(
    useShallow((state) => ({
      currentTask: state.currentTask,
      updateTaskInStore: state.updateTask,
      setCurrentTask: state.setCurrentTask,
    }))
  );

  const [currentTab, setCurrentTab] = useState(ONGOING_TAB);
  const [timerStarted, setTimerStarted] = useState(false);
  const [pomodoroCount, setPomodoroCount] = useState(0);
  const [isLongBreak, setIsLongBreak] = useState(false);
  const intervalRef = useRef(null);

  const [timerValue, setTimerValue] = useGetTimerValue({
    activeTab: currentTab,
    isLongBreak,
    userSettings,
  });

  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const { taskTime, shortBreakTime, longBreakTime } =
      getTimerDurations(userSettings);

    setDuration(
      currentTab === ONGOING_TAB
        ? taskTime
        : isLongBreak
        ? longBreakTime
        : shortBreakTime
    );
  }, [currentTab, isLongBreak, userSettings]);

  useEffect(() => {
    const longBreakInterval = getLongBreakInterval(userSettings);
    if (pomodoroCount > 0 && pomodoroCount % longBreakInterval === 0) {
      setIsLongBreak(true);
    } else {
      setIsLongBreak(false);
    }
  }, [pomodoroCount, userSettings]);

  useEffect(() => {
    const { minutes, seconds } = getFormattedTime(timerValue);
    document.title =
      currentTab === ONGOING_TAB
        ? `Pomodoro : ${minutes}:${seconds}`
        : `Break : ${minutes}:${seconds}`;
  }, [currentTab, timerValue]);

  const startTimer = () => {
    if (timerStarted) return;
    intervalRef.current = setInterval(() => {
      setTimerValue((prev) => {
        if (prev <= 0) {
          handleTimerComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    setTimerStarted(true);
  };

  const stopTimer = () => {
    clearTimerInterval();
  };

  const clearTimerInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setTimerStarted(false);
  };

  const resetTimer = () => {
    clearTimerInterval();
    setTimerValue(getCurrentTime(currentTab, isLongBreak, userSettings));
  };

  const skipTimer = () => {
    finishSession();
    handleTabChange(currentTab === ONGOING_TAB ? BREAK_TAB : ONGOING_TAB);
  };

  const handleTabChange = (key) => {
    setCurrentTab(key);
    clearTimerInterval();
  };

  const handleTimerComplete = () => {
    finishSession();
    skipTimer();
  };

  const finishSession = async () => {
    if (currentTab === ONGOING_TAB) {
      setPomodoroCount(pomodoroCount + 1);
      if (currentTask && user?.id) {
        const completedSessions = currentTask.completedSessions + 1;
        const res = await updateTask(
          {
            id: currentTask.id,
            completedSessions,
            completed: completedSessions === currentTask.totalSessions,
          },
          user.id
        );
        if (res.error) {
          // Handle error silently for now or show notification
          console.error("Failed to update task:", res.error);
        } else {
          updateTaskInStore(res.data[0]);
          setCurrentTask(res.data[0]);
        }
      }
    }
  };

  return (
    <div className={`card ${styles.timerContainer}`}>
      <div className={`card__body ${styles.timerBody}`}>
        <Tabs
          defaultTab={ONGOING_TAB}
          activeTab={currentTab}
          onTabChange={handleTabChange}
          tabsClassName={styles.pomodoroTabs}
          tabNavClassName={styles.pomodoroTabNav}
          tabs={[
            {
              id: ONGOING_TAB,
              label: (
                <>
                  <span className="btn__icon">
                    <ClockIcon />
                  </span>
                  <span>Ongoing</span>
                </>
              ),
              content: (
                <TabContent
                  timerValue={timerValue}
                  duration={duration}
                  currentTab={currentTab}
                />
              ),
            },
            {
              id: BREAK_TAB,
              label: (
                <>
                  <span>Break</span>
                  <span className="btn__icon">
                    <CupIcon />
                  </span>
                </>
              ),
              content: (
                <TabContent
                  timerValue={timerValue}
                  duration={duration}
                  currentTab={currentTab}
                />
              ),
            },
          ]}
        />
        <div className="card__footer">
          <div className={styles.timerControls}>
            <button
              className={`btn btn--primary ${styles.timerControls__item}`}
              onClick={resetTimer}
              title="Reset Timer"
            >
              <ResetIcon />
            </button>
            <button
              className={`btn  ${styles.timerControls__item} ${styles["timerControls__item--play"]}`}
              onClick={timerStarted ? stopTimer : startTimer}
              title={timerStarted ? "Stop Timer" : "Start Timer"}
            >
              <span className="btn__icon">
                {timerStarted ? <StopIcon /> : <PlayIcon />}
              </span>
              <span className="btn__label">
                {timerStarted ? "Stop" : "Start"}
              </span>
            </button>
            <button
              className={`btn btn--primary ${styles.timerControls__item}`}
              onClick={skipTimer}
              title="Skip Timer"
            >
              <NextIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const TabContent = ({ timerValue, duration, currentTab }) => {
  const getProgressPercentage = () => {
    return ((duration - timerValue) / duration) * 100;
  };

  const { minutes, seconds } = getFormattedTime(timerValue);

  return (
    <div className={styles.timer__display}>
      <div
        className={`${styles.circularTimer} ${
          currentTab === BREAK_TAB
            ? styles.circularTimer__break
            : styles.circularTimer__pomodoro
        }`}
        style={{
          "--progress": getProgressPercentage(),
          "--progress-color":
            currentTab === ONGOING_TAB ? "var(--accent-secondary)" : "#ffc107",
        }}
      >
        <div className={styles.timer__value}>
          <span>{minutes}</span>
          <span className={styles.timer__value__colon}>:</span>
          <span>{seconds}</span>
        </div>
      </div>
    </div>
  );
};

const getFormattedTime = (seconds) => {
  const minutes = String(Math.floor(seconds / 60)).padStart(2, "0");
  const remainingSeconds = String(seconds % 60).padStart(2, "0");
  return {
    minutes,
    seconds: remainingSeconds,
  };
};

export default Timer;
