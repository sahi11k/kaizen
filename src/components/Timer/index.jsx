import React, { useState, useEffect, useRef } from "react";
import styles from "./style.module.css";
import PlayIcon from "@/assets/icons/play.svg?react";
import NextIcon from "@/assets/icons/next.svg?react";
import ResetIcon from "@/assets/icons/reset.svg?react";
import StopIcon from "@/assets/icons/stop.svg?react";
import Tabs from "@/components/Tabs";
import ClockIcon from "@/assets/icons/clock.svg?react";
import CupIcon from "@/assets/icons/cup.svg?react";
import { useTasksContext } from "@/contexts/TasksContext";
import { TASK_CATEGORY_ICONS, TIMER_CONSTANTS } from "@/utils/constants";
import { useGetTimerValue, getCurrentTime } from "@/hooks/useGetTimerValue";

const { ONGOING_TAB, BREAK_TAB, TASK_TIME, SHORT_BREAK_TIME, LONG_BREAK_TIME } =
  TIMER_CONSTANTS;

const Timer = () => {
  const { tasks } = useTasksContext();
  const [currentTab, setCurrentTab] = useState(ONGOING_TAB);
  const [currentTask, setCurrentTask] = useState({
    category: "",
    title: "",
    currentSession: "",
  });

  const [timerStarted, setTimerStarted] = useState(false);
  const [pomodoroCount, setPomodoroCount] = useState(0);
  const [isLongBreak, setIsLongBreak] = useState(false);
  const intervalRef = useRef(null);

  const [timerValue, setTimerValue] = useGetTimerValue({
    activeTab: currentTab,
    isLongBreak,
  });

  useEffect(() => {
    const getCurrentTaskDetails = () => {
      const firstIncompleteTask = tasks.find((task) => !task.completed);
      if (currentTab === BREAK_TAB) {
        return {
          title: "Yay! Break Time",
          category: "",
          currentSession: "",
        };
      }

      if (!firstIncompleteTask || tasks.length === 0) {
        return {
          title: "Time to Focus",
          category: "",
          currentSession: "",
        };
      }

      return {
        title: firstIncompleteTask.title,
        category: firstIncompleteTask.category,
        currentSession: `#${firstIncompleteTask.completedSessions + 1} -`,
      };
    };
    setCurrentTask(getCurrentTaskDetails());
  }, [tasks, currentTab]);

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
    setTimerValue(getCurrentTime(currentTab, isLongBreak));
  };

  const skipTimer = () => {
    if (currentTab === ONGOING_TAB) {
      setPomodoroCount(pomodoroCount + 1);
    }
    handleTabChange(currentTab === ONGOING_TAB ? BREAK_TAB : ONGOING_TAB);
  };

  const handleTabChange = (key) => {
    setCurrentTab(key);
    clearTimerInterval();
  };

  const handleTimerComplete = () => {
    if (currentTab === ONGOING_TAB) {
      setPomodoroCount(pomodoroCount + 1);
    }
    skipTimer();
  };

  useEffect(() => {
    if (pomodoroCount > 0 && pomodoroCount % 4 === 0) {
      setIsLongBreak(true);
    } else {
      setIsLongBreak(false);
    }
  }, [pomodoroCount]);

  useEffect(() => {
    document.title =
      currentTab === ONGOING_TAB
        ? `🍅 Pomodoro : ${getFormattedTime(timerValue)}`
        : `💤 Break : ${getFormattedTime(timerValue)}`;
  }, [currentTab, timerValue]);

  return (
    <div className={`card`}>
      <div className="card__body">
        <Tabs
          defaultTab={ONGOING_TAB}
          activeTab={currentTab}
          onTabChange={handleTabChange}
        >
          <Tabs.Tab
            label={
              <>
                <span className="btn__icon">
                  <ClockIcon />
                </span>
                <span>Ongoing</span>
              </>
            }
            tabKey={ONGOING_TAB}
            key={ONGOING_TAB}
          >
            <TabContent timerValue={timerValue} duration={TASK_TIME} />
          </Tabs.Tab>
          <Tabs.Tab
            label={
              <>
                <span>Break</span>
                <span className="btn__icon">
                  <CupIcon />
                </span>
              </>
            }
            tabKey={BREAK_TAB}
            key={BREAK_TAB}
          >
            <TabContent
              timerValue={timerValue}
              duration={isLongBreak ? LONG_BREAK_TIME : SHORT_BREAK_TIME}
            />
          </Tabs.Tab>
        </Tabs>
        <div className={styles.currentTask}>
          <span className={styles.currentTask__category}>
            {TASK_CATEGORY_ICONS[currentTask.category]}
          </span>
          <span className={styles.currentTask__currentSession}>
            {currentTask.currentSession}
          </span>
          <span className={styles.currentTask__title}>{currentTask.title}</span>
        </div>
        <div className="card__footer">
          <div className={styles.timerControls}>
            <button
              className={`btn ${styles.timerControls__item}`}
              onClick={resetTimer}
            >
              <ResetIcon />
            </button>
            <button
              className={`btn  ${styles["timerControls__item--play"]}`}
              onClick={timerStarted ? stopTimer : startTimer}
            >
              <span className="btn__icon">
                {timerStarted ? <StopIcon /> : <PlayIcon />}
              </span>
              <span className="btn__label">
                {timerStarted ? "Stop" : "Start"}
              </span>
            </button>
            <button
              className={`btn ${styles.timerControls__item}`}
              onClick={skipTimer}
            >
              <NextIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const TabContent = ({ timerValue, duration }) => {
  console.info(timerValue, duration);

  const getProgressPercentage = () => {
    return ((duration - timerValue) / duration) * 100;
  };

  return (
    <div className={styles.timer__display}>
      <div className={styles.timer__value}>{getFormattedTime(timerValue)}</div>
      <div
        className={styles.timer__progressBar}
        style={{
          "--progress": getProgressPercentage(),
        }}
      ></div>
    </div>
  );
};

const getFormattedTime = (seconds) => {
  const minutes = String(Math.floor(seconds / 60)).padStart(2, "0");
  const remainingSeconds = String(seconds % 60).padStart(2, "0");
  return `${minutes}:${remainingSeconds}`;
};

export default Timer;
