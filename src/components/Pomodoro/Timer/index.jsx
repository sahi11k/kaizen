import React, { useState, useEffect, useRef } from "react";
import PlayIcon from "@/assets/icons/play.svg?react";
import NextIcon from "@/assets/icons/next.svg?react";
import ResetIcon from "@/assets/icons/reset.svg?react";
import StopIcon from "@/assets/icons/stop.svg?react";
import Tabs from "@/utils/components/Tabs";
import ClockIcon from "@/assets/icons/clock.svg?react";
import CupIcon from "@/assets/icons/cup.svg?react";
import { TASK_CATEGORY_ICONS, TIMER_CONSTANTS } from "@/utils/constants";
import { useGetTimerValue, getCurrentTime } from "@/hooks/useGetTimerValue";
import useTasksStore from "@/store/tasks";
import { useShallow } from "zustand/react/shallow";
import { updateTask } from "@/db/apis/tasks";
import useAuthStore from "@/store/auth";
import styles from "./style.module.css";

const { ONGOING_TAB, BREAK_TAB, TASK_TIME, SHORT_BREAK_TIME, LONG_BREAK_TIME } =
  TIMER_CONSTANTS;

const Timer = () => {
  const { user } = useAuthStore();
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
  });

  const [duration, setDuration] = useState(0);

  useEffect(() => {
    setDuration(
      currentTab === ONGOING_TAB
        ? TASK_TIME
        : isLongBreak
        ? LONG_BREAK_TIME
        : SHORT_BREAK_TIME
    );
  }, [currentTab, isLongBreak]);

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
        ? `Pomodoro : ${getFormattedTime(timerValue)}`
        : `Break : ${getFormattedTime(timerValue)}`;
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
    setTimerValue(getCurrentTime(currentTab, isLongBreak));
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
      <div className="card__body">
        <Tabs
          defaultTab={ONGOING_TAB}
          activeTab={currentTab}
          onTabChange={handleTabChange}
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
                <TabContent timerValue={timerValue} duration={duration} />
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
                <TabContent timerValue={timerValue} duration={duration} />
              ),
            },
          ]}
        />
        <div className={styles.currentTask}>
          <CurrentTask activeTab={currentTab} currentTask={currentTask} />
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
              style={{ outline: timerStarted ? "2px solid white" : "" }}
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

const CurrentTask = ({ activeTab, currentTask }) => {
  if (activeTab === BREAK_TAB) {
    return "Yay! Break Time";
  }

  if (!currentTask) return "Time to Focus";

  return (
    <>
      <span className={styles.currentTask__category}>
        {TASK_CATEGORY_ICONS[currentTask.category]}
      </span>
      <span className={styles.currentTask__currentSession}>
        #{currentTask.completedSessions + 1}
      </span>
      <span className={styles.currentTask__title}>{currentTask.title}</span>
    </>
  );
};
export default Timer;
