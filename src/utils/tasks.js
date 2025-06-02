import { showModal } from "./addTaskModal.js";
import { CREATE, EDIT, taskCategoryIcons } from "./constants.js";
import { renderDailyProgress } from "./dailyProgress.js";
import store from "./store.js";
import { resetTimer, updateCurrentTask } from "./timer.js";
import { getTemplate } from "./utils.js";

const $taskItemTemplate = getTemplate(TASK_ITEM_TEMPLATE);
const $taskListEl = document.querySelector("#task-list");
const $addTaskModalHandler = document.querySelector("#add-task-modal-handler");

export function initTasks(store) {
  const taskItems = store.getTasks();
  renderTaskList(taskItems);
  attachEventListeners();
}

function attachEventListeners() {
  $taskListEl.addEventListener("mouseover", onHover);
  $taskListEl.addEventListener("mouseout", onHoverOut);
  $taskListEl.addEventListener("click", onTaskClick);
  $taskListEl.addEventListener("dragstart", onDragStart);
  $taskListEl.addEventListener("dragover", onDragOver);
  $taskListEl.addEventListener("drop", onDrop);

  $addTaskModalHandler.addEventListener("click", (e) => {
    e.preventDefault();
    showModal(CREATE);
  });
}

function onHover(e) {
  const $taskItem = e.target.closest(".task-item");
  if (!$taskItem) return;
  $taskItem.classList.add("hovered");
}

function onHoverOut(e) {
  const $taskItem = e.target.closest(".task-item");
  if (!$taskItem) return;
  $taskItem.classList.remove("hovered");
}

function onTaskClick(e) {
  const $target = e.target;
  const $taskItem = $target.closest(".task-item");
  const $actionButton = $target.closest("button");

  if (!$taskItem || !$actionButton) return;

  const action = $actionButton.dataset.action;

  switch (action) {
    case "edit":
      onTaskEdit($taskItem);
      break;
    case "delete":
      onTaskDelete($taskItem);
      break;
    case "complete":
      onTaskComplete($taskItem);
      break;
    default:
      return;
  }
}

const onTaskEdit = ($taskItem) => {
  const taskId = $taskItem.dataset.id;
  showModal(EDIT, taskId);
};

const onTaskDelete = ($taskItem) => {
  const taskId = $taskItem.dataset.id;
  store.removeTask(taskId);
  const tasks = store.getTasks();
  renderTaskList(tasks);
  // Todo : set current task , update timer and update progress
};

function onDragStart(e) {
  const $dragHandle = e.target.closest('[data-action="drag"]');
  if (!$dragHandle) return;
  const $taskItem = $dragHandle.closest(".task-item");
  e.dataTransfer.setData("text/plain", $taskItem.dataset.id);
  e.dataTransfer.setDragImage($taskItem, $taskItem.clientWidth, 0);
}

function onDragOver(e) {
  e.preventDefault();
}

function onDrop(e) {
  e.preventDefault();
  const draggedTaskId = e.dataTransfer.getData("text/plain");
  const $dropTarget = e.target.closest(".task-item");

  if (!$dropTarget || draggedTaskId === $dropTarget.dataset.id) return;

  const tasks = store.getTasks();
  const draggedTaskIndex = tasks.findIndex((task) => task.id === draggedTaskId);
  const dropTargetIndex = tasks.findIndex(
    (task) => task.id === $dropTarget.dataset.id
  );

  const [draggedTask] = tasks.splice(draggedTaskIndex, 1);
  tasks.splice(dropTargetIndex, 0, draggedTask);

  store.updateTasks(tasks);
  renderTaskList(tasks);
}

const onTaskComplete = ($taskItem) => {
  const taskId = $taskItem.dataset.id;
  const task = store.getTaskById(taskId);
  task.completed = !task.completed;
  task.completedSessions = task.completed ? task.sessions : 0;
  store.updateTask(task);
  const tasks = store.getTasks();
  renderTaskList(tasks);
};

export function renderTaskList(tasks) {
  const $emptyEl = document.querySelector(".task-list__empty");

  const taskListFragment = document.createDocumentFragment();
  tasks.forEach((task) => {
    const taskItem = createTaskItem(task);
    taskListFragment.appendChild(taskItem);
  });
  $taskListEl.innerHTML = "";
  $emptyEl.classList.toggle("show", tasks.length === 0);
  $taskListEl.appendChild(taskListFragment);
  updateCurrentTask(tasks);
  renderDailyProgress(tasks);
  resetTimer();
}

function createTaskItem(task) {
  const $taskClone = $taskItemTemplate.content.cloneNode(true);
  const $taskItem = $taskClone.querySelector(".task-item");

  $taskItem.dataset.id = task.id;
  $taskItem.classList.toggle("active", task.completed);

  $taskClone.querySelector(".task-item__details--name").textContent = task.name;

  $taskClone.querySelector(".task-item__category--icon").textContent =
    taskCategoryIcons[task.category];

  $taskClone.querySelector(".task-item__details--sessions").textContent =
    task.completed
      ? "Done"
      : `Sessions:  ${task.completedSessions}/${task.sessions}`;

  $taskClone.querySelector('[data-action="drag"]').draggable = true;

  return $taskClone;
}

export function finishSession(taskId) {
  const task = store.getTaskById(taskId);
  task.completedSessions++;
  if (task.completedSessions === task.sessions) {
    task.completed = true;
  }
  store.updateTask(task);
  const tasks = store.getTasks();
  renderTaskList(tasks);
}
