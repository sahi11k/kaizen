import { ICON_STOP, ICON_PLAY, taskCategoryIcons } from "./constants.js";
import store from "./store.js";
import { finishSession } from "./tasks.js";

// TIMER
let TASK_TIME = 25 * 60;
let SHORT_BREAK_TIME = 5 * 60;
let LONG_BREAK_TIME = 15 * 60;

// AUDIO
const timerFinishedAudio = new Audio("./assets/timerEnd.mp3");
const timerStartAudio = new Audio("./assets/timerStart.mp3");

let ONGOING_TAB = "ongoing";
let BREAK_TAB = "break";

let activeTab = ONGOING_TAB;
let duration = TASK_TIME;
let remainingTime = null;
let intervalId;
let timerStarted = false;
let currentTaskId = null;
let pomodoroCount = 0;
let isLongBreak = false;

const $tabNav = document.querySelector(".tab-nav");
const $timerStartBtn = document.querySelector('[data-action="start"]');

export function initTimer(store) {
  const $timerControls = document.querySelector(".timer-controls");

  updateCurrentTask(store.getTasks());
  $tabNav.addEventListener("click", onTabChange);
  $timerControls.addEventListener("click", onTimerControlsClick);
}

function onTimerControlsClick(e) {
  const $target = e.target.closest(".timer-controls__item");
  if (!$target) return;
  const action = $target.dataset.action;

  switch (action) {
    case "reset":
      resetTimer();
      break;
    case "start":
      startTimer();
      break;
    case "stop":
      stopTimer();
      break;
    case "next":
      skipTimer();
      break;
    default:
      break;
  }
}

function startTimer() {
  if (!timerStarted) {
    remainingTime = duration;
  }

  intervalId = setInterval(() => {
    remainingTime--;
    updateTimer(remainingTime);
  }, 1000);

  timerStarted = true;
  timerStartAudio.play();
  $timerStartBtn.querySelector(".btn__icon").innerHTML = ICON_STOP;
  $timerStartBtn.querySelector(".btn__label").textContent = "Stop";
  $timerStartBtn.dataset.action = "stop";
}

function stopTimer() {
  clearInterval(intervalId);
  $timerStartBtn.querySelector(".btn__icon").innerHTML = ICON_PLAY;
  $timerStartBtn.querySelector(".btn__label").textContent = "Start";
  $timerStartBtn.dataset.action = "start";
  timerStartAudio.pause();
  timerStartAudio.currentTime = 0;
}

export function resetTimer() {
  if (!timerStarted) return;
  stopTimer();
  updateTimer(duration);
  timerStarted = false;
}

function skipTimer() {
  const inActiveEl = getInactiveTab();
  onTabChange({ target: inActiveEl });
}

function getInactiveTab() {
  const inactiveTab = activeTab === ONGOING_TAB ? BREAK_TAB : ONGOING_TAB;
  return document.querySelector(`[data-tab="${inactiveTab}"]`);
}

function onTabChange(e) {
  const $target = e.target.closest(".tab-nav__item");
  if ($target) {
    clearInterval(intervalId);
    activeTab = $target.dataset.tab;
    duration =
      activeTab === ONGOING_TAB
        ? TASK_TIME
        : isLongBreak
        ? LONG_BREAK_TIME
        : SHORT_BREAK_TIME;
    changeActiveTab(activeTab);
    updateTimer(duration);
    updateCurrentTask(store.getTasks());
    resetTimer();
  }
}

function changeActiveTab(activeTab) {
  for (const $tab of $tabNav.children) {
    $tab.classList.toggle("active", $tab.dataset.tab === activeTab);
  }
}

function updateTimer(remainingTime) {
  if (remainingTime < 0) {
    clearInterval(intervalId);
    timerStartAudio.pause();
    timerStartAudio.currentTime = 0;
    timerFinishedAudio.play();
    finishSession(currentTaskId);
    if (activeTab === ONGOING_TAB) {
      pomodoroCount++;
      if (pomodoroCount % 4 === 0) {
        isLongBreak = true;
      } else {
        isLongBreak = false;
      }
    }
    const inActiveEl = getInactiveTab();
    onTabChange({ target: inActiveEl });
    return;
  }

  const $timerValue = document.querySelector(".timer__value");
  const $timerProgressBar = document.querySelector(".timer__progress-bar");

  const formattedTime = getFormattedTime(remainingTime);
  $timerValue.textContent = formattedTime;
  $timerProgressBar.style.setProperty(
    "--progress",
    getProgressPercentage(remainingTime)
  );
  document.title = `ZenTen | ${
    activeTab === ONGOING_TAB ? "🍅" : "💤"
  } : ${formattedTime}`;
}

function getProgressPercentage(remainingTime) {
  return ((duration - remainingTime) / duration) * 100;
}

function getFormattedTime(seconds) {
  const minutes = String(Math.floor(seconds / 60)).padStart(2, "0");
  const remainingSeconds = String(seconds % 60).padStart(2, "0");

  return `${minutes}:${remainingSeconds}`;
}

export function updateCurrentTask(tasks) {
  const currentTask = tasks.find((task) => !task.completed);
  const $currentTask = document.querySelector(".current-task");
  currentTaskId = currentTask?.id;
  let textContent = "";
  let category = "";
  let currentSession = "";

  if (activeTab === BREAK_TAB) {
    textContent = "Yay! Break Time";
    category = "";
    currentSession = "";
  } else if (!currentTask || tasks.length === 0) {
    textContent = "Time to Focus";
    category = "";
    currentSession = "";
  } else {
    textContent = currentTask.name;
    category = currentTask.category;
    currentSession = `#${currentTask.completedSessions + 1} -`;
  }

  $currentTask.querySelector(".current-task__name").textContent = textContent;
  $currentTask.querySelector(".current-task__current-session").textContent =
    currentSession;
  $currentTask.querySelector(".current-task__category").textContent =
    taskCategoryIcons[category];
}
