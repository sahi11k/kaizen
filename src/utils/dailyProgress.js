export function initDailyProgress(store) {
  setCurrentDay();
  renderDailyProgress(store.getTasks());
}

export function renderDailyProgress(tasks) {
  const totalCount = tasks.length;
  const completedCount = getCompletedTasksCount(tasks);

  updateTaskCompletionLabel({ completedCount, totalCount });
  updateProgress({ completedCount, totalCount });
}

function updateTaskCompletionLabel({ completedCount, totalCount }) {
  const $taskCompletionLabel = document.querySelector(
    ".progress-stats__completion-label"
  );
  $taskCompletionLabel.textContent = `${completedCount}/${totalCount}`;
}

function setCurrentDay() {
  const $currentDayEl = document.querySelector(".progress-stats__timestamp");
  const updateCurrentDay = () => {
    $currentDayEl.textContent = getFormattedTime();
  };
  window.setInterval(updateCurrentDay, 1000);
  updateCurrentDay();
}

function updateProgress({ completedCount, totalCount }) {
  const $progressWidget = document.querySelector(".progress-meter");
  const $progressValue = document.querySelector(".progress-meter__value");

  const completedTasksPercentage =
    totalCount === 0 ? 0 : (completedCount / totalCount) * 100;

  $progressValue.textContent = `${Math.round(completedTasksPercentage)}%`;

  const angle = (completedTasksPercentage / 100) * 360;
  $progressWidget.style.setProperty("--progress", `${angle}deg`);
}

function getCompletedTasksCount(tasks = []) {
  return tasks.filter((task) => task.completed).length;
}

function getFormattedTime() {
  return new Date().toLocaleString("en-US", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}
