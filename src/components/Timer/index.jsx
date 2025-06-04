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
import { TASK_CATEGORY_ICONS } from "@/utils/constants";

const ONGOING_TAB = "ongoing";
const BREAK_TAB = "break";

const TASK_TIME = 1 * 10;
const SHORT_BREAK_TIME = 1 * 5;
const LONG_BREAK_TIME = 1 * 8;

const Timer = () => {
  const { tasks } = useTasksContext();
  const [currentTab, setCurrentTab] = useState(ONGOING_TAB);
  const [currentTask, setCurrentTask] = useState({
    category: "",
    title: "",
    currentSession: "",
  });

  const [timerStarted, setTimerStarted] = useState(false);
  const [remainingTime, setRemainingTime] = useState(TASK_TIME);
  const intervalRef = useRef(null);

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
      setRemainingTime((prev) => prev - 1);
    }, 1000);
    setTimerStarted(true);
  };

  const stopTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setTimerStarted(false);
  };

  const resetTimer = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setRemainingTime(TASK_TIME);
    setTimerStarted(false);
  };

  const skipTimer = () => {
    const nextTab = currentTab === ONGOING_TAB ? BREAK_TAB : ONGOING_TAB;
    handleTabChange(nextTab);
  };

  const handleTabChange = (key) => {
    setCurrentTab(key);
    resetTimer();
    setRemainingTime(key === ONGOING_TAB ? TASK_TIME : SHORT_BREAK_TIME);
  };

  const handleTimerComplete = () => {
    console.info("timer complete");
  };

  // function startTimer() {
  //   if (!timerStarted) {
  //     remainingTime = duration;
  //   }

  //   intervalId = setInterval(() => {
  //     remainingTime--;
  //     updateTimer(remainingTime);
  //   }, 1000);

  //   timerStarted = true;
  //   timerStartAudio.play();
  //   $timerStartBtn.querySelector(".btn__icon").innerHTML = ICON_STOP;
  //   $timerStartBtn.querySelector(".btn__label").textContent = "Stop";
  //   $timerStartBtn.dataset.action = "stop";
  // }

  // function stopTimer() {
  //   clearInterval(intervalId);
  //   $timerStartBtn.querySelector(".btn__icon").innerHTML = ICON_PLAY;
  //   $timerStartBtn.querySelector(".btn__label").textContent = "Start";
  //   $timerStartBtn.dataset.action = "start";
  //   timerStartAudio.pause();
  //   timerStartAudio.currentTime = 0;
  // }

  // export function resetTimer() {
  //   if (!timerStarted) return;
  //   stopTimer();
  //   updateTimer(duration);
  //   timerStarted = false;
  // }

  // function skipTimer() {
  //   const inActiveEl = getInactiveTab();
  //   onTabChange({ target: inActiveEl });
  // }

  // function onTabChange(e) {
  //   const $target = e.target.closest(".tab-nav__item");
  //   if ($target) {
  //     clearInterval(intervalId);
  //     activeTab = $target.dataset.tab;
  //     duration =
  //       activeTab === ONGOING_TAB
  //         ? TASK_TIME
  //         : isLongBreak
  //         ? LONG_BREAK_TIME
  //         : SHORT_BREAK_TIME;
  //     changeActiveTab(activeTab);
  //     updateTimer(duration);
  //     updateCurrentTask(store.getTasks());
  //     resetTimer();
  //   }
  // }

  // function changeActiveTab(activeTab) {
  //   for (const $tab of $tabNav.children) {
  //     $tab.classList.toggle("active", $tab.dataset.tab === activeTab);
  //   }
  // }

  // function updateTimer(remainingTime) {
  //   if (remainingTime < 0) {
  //     clearInterval(intervalId);
  //     timerStartAudio.pause();
  //     timerStartAudio.currentTime = 0;
  //     timerFinishedAudio.play();
  //     finishSession(currentTaskId);
  //     if (activeTab === ONGOING_TAB) {
  //       pomodoroCount++;
  //       if (pomodoroCount % 4 === 0) {
  //         isLongBreak = true;
  //       } else {
  //         isLongBreak = false;
  //       }
  //     }
  //     const inActiveEl = getInactiveTab();
  //     onTabChange({ target: inActiveEl });
  //     return;
  //   }

  //   const $timerValue = document.querySelector(".timer__value");
  //   const $timerProgressBar = document.querySelector(".timer__progress-bar");

  //   const formattedTime = getFormattedTime(remainingTime);
  //   $timerValue.textContent = formattedTime;
  //   $timerProgressBar.style.setProperty(
  //     "--progress",
  //     getProgressPercentage(remainingTime)
  //   );
  //   document.title = `ZenTen | ${
  //     activeTab === ONGOING_TAB ? "🍅" : "💤"
  //   } : ${formattedTime}`;
  // }

  // function getProgressPercentage(remainingTime) {
  //   return ((duration - remainingTime) / duration) * 100;
  // }

  // export function updateCurrentTask(tasks) {
  //   const currentTask = tasks.find((task) => !task.completed);
  //   const $currentTask = document.querySelector(".current-task");
  //   currentTaskId = currentTask?.id;
  //   let textContent = "";
  //   let category = "";
  //   let currentSession = "";

  //   $currentTask.querySelector(".current-task__name").textContent = textContent;
  //   $currentTask.querySelector(".current-task__current-session").textContent =
  //     currentSession;
  //   $currentTask.querySelector(".current-task__category").textContent =
  //     taskCategoryIcons[category];
  // }

  const getFormattedTime = (seconds) => {
    const minutes = String(Math.floor(seconds / 60)).padStart(2, "0");
    const remainingSeconds = String(seconds % 60).padStart(2, "0");

    return `${minutes}:${remainingSeconds}`;
  };

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
            <div className={styles.timer__display}>
              <div className={styles.timer__value}>
                {getFormattedTime(remainingTime)}
              </div>
              <div className={styles.timer__progressBar}></div>
            </div>
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
            <div className={styles.timer__display}>
              <div className={styles.timer__value}>
                {getFormattedTime(remainingTime)}
              </div>
              <div className={styles.timer__progressBar}></div>
            </div>
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

export default Timer;
