import React from "react";
import styles from "./style.module.css";
import PlayIcon from "@/assets/icons/play.svg?react";
import NextIcon from "@/assets/icons/next.svg?react";
import ResetIcon from "@/assets/icons/reset.svg?react";
import Tabs from "@/components/Tabs";
import ClockIcon from "@/assets/icons/clock.svg?react";
import CupIcon from "@/assets/icons/cup.svg?react";

const Timer = () => {
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

  // function getFormattedTime(seconds) {
  //   const minutes = String(Math.floor(seconds / 60)).padStart(2, "0");
  //   const remainingSeconds = String(seconds % 60).padStart(2, "0");

  //   return `${minutes}:${remainingSeconds}`;
  // }

  // export function updateCurrentTask(tasks) {
  //   const currentTask = tasks.find((task) => !task.completed);
  //   const $currentTask = document.querySelector(".current-task");
  //   currentTaskId = currentTask?.id;
  //   let textContent = "";
  //   let category = "";
  //   let currentSession = "";

  //   if (activeTab === BREAK_TAB) {
  //     textContent = "Yay! Break Time";
  //     category = "";
  //     currentSession = "";
  //   } else if (!currentTask || tasks.length === 0) {
  //     textContent = "Time to Focus";
  //     category = "";
  //     currentSession = "";
  //   } else {
  //     textContent = currentTask.name;
  //     category = currentTask.category;
  //     currentSession = `#${currentTask.completedSessions + 1} -`;
  //   }

  //   $currentTask.querySelector(".current-task__name").textContent = textContent;
  //   $currentTask.querySelector(".current-task__current-session").textContent =
  //     currentSession;
  //   $currentTask.querySelector(".current-task__category").textContent =
  //     taskCategoryIcons[category];
  // }

  return (
    <div className={`card`}>
      <div className="card__body">
        <Tabs defaultTab="ongoing">
          <Tabs.Tab
            label={
              <>
                <span className="btn__icon">
                  <ClockIcon />
                </span>
                <span>Ongoing</span>
              </>
            }
            tabKey="ongoing"
            key="ongoing"
          >
            <div className={styles.timer__display}>
              <div className={styles.timer__value}>25:00</div>
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
            tabKey="break"
            key="break"
          >
            <div className={styles.timer__display}>
              <div className={styles.timer__value}>05:00</div>
              <div className={styles.timer__progressBar}></div>
            </div>
          </Tabs.Tab>
        </Tabs>
        <div className={styles.currentTask}>
          <span className={styles.currentTask__category}>Reading</span>
          <span className={styles.currentTask__currentSession}>Session 1</span>
          <span className={styles.currentTask__name}>
            Implementing a new feature
          </span>
        </div>
        <div className="card__footer">
          <div className={styles.timerControls}>
            <button className={`btn ${styles.timerControls__item}`}>
              <ResetIcon />
            </button>
            <button className={`btn  ${styles["timerControls__item--play"]}`}>
              <span className="btn__icon">
                <PlayIcon />
              </span>
              <span className="btn__label">Start</span>
            </button>
            <button className={`btn ${styles.timerControls__item}`}>
              <NextIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timer;
