import {
  taskCategories,
  MIN_SESSIONS,
  MAX_SESSIONS,
  CREATE,
  EDIT,
} from "./constants.js";
import store from "./store.js";
import { getTemplate } from "./utils.js";
import { renderTaskList } from "./tasks.js";

const taskTemplate = `<div class="category-list__item">
                        <div class="category-list__item-icon"></div>
                        <div class="category-list__item-label"></div>
                      </div>`;

const $modal = document.querySelector(".modal");
const $dialog = document.querySelector("#add-task-modal");

const $taskCategoryList = document.querySelector(".category-list");
const $taskCategoryTemplate = getTemplate(taskTemplate);
const $form = document.querySelector("#add-task-form");
const $sessionCount = document.querySelector(".session-count");
const $submitBtn = document.querySelector(".modal__button--primary");

let listenersAttached = false;
let mode = CREATE;
let taskId = null;

export function initTaskModal() {
  attachEventListeners();
}

export function showModal(newMode, newTaskId) {
  mode = newMode;
  taskId = newTaskId;

  $modal.classList.add("show-modal");
  $dialog.showModal();
  renderTaskModal();
  document.body.style.overflow = "hidden";
}

function closeModal() {
  resetForm();
  $dialog.close();
  $modal.classList.remove("show-modal");
  document.body.style.overflow = "auto";
}

function renderTaskModal() {
  if (mode === CREATE) {
    renderCreateTaskModal();
  } else if (mode === EDIT && taskId !== null) {
    renderEditTaskModal();
  }
}

function renderCreateTaskModal() {
  removeErrors();
  renderTaskCategoryList();
  $submitBtn.textContent = "Add Task";
}

function renderEditTaskModal() {
  const task = store.getTaskById(taskId);
  $form.querySelector("[name='task-name']").value = task.name;
  $form.querySelector("[name='task-description']").value = task.description;
  $form.dataset.category = task.category;
  $form.dataset.sessions = task.sessions;
  $sessionCount.textContent = task.sessions;
  renderTaskCategoryList(task.category);
  $submitBtn.textContent = "Update Task";
}

function attachEventListeners() {
  document.querySelector("input").focus();

  if (!listenersAttached) {
    const $cancelBtn = document.querySelector(".modal__button--cancel");
    const $sessionControls = document.querySelector(".session-controls");

    $taskCategoryList.addEventListener("click", onCategoryChange);
    $cancelBtn.addEventListener("click", closeModal);
    $sessionControls.addEventListener("click", onSessionChange);
    $submitBtn.addEventListener("click", (e) => {
      e.preventDefault();
      onSubmit(mode, taskId);
    });
    $form.addEventListener("submit", (e) => {
      e.preventDefault();
      // onSubmit(mode, taskId);
    });
    listenersAttached = true;
  }
}

/**Category Functions */

function renderTaskCategoryList(activeCategory = null) {
  const $taskCategoryFragment = document.createDocumentFragment();

  Object.entries(taskCategories).forEach(([_, taskCategory]) => {
    const $taskCategoryItem = createTaskCategoryItem(
      taskCategory,
      activeCategory
    );
    $taskCategoryFragment.appendChild($taskCategoryItem);
  });
  $taskCategoryList.innerHTML = "";
  $taskCategoryList.appendChild($taskCategoryFragment);
}

function createTaskCategoryItem(taskCategory, activeCategory) {
  const $taskCategoryItem = $taskCategoryTemplate.content.cloneNode(true);

  const $taskCategoryItemElement = $taskCategoryItem.querySelector(
    ".category-list__item"
  );
  $taskCategoryItemElement.dataset.id = taskCategory.id;

  $taskCategoryItemElement.classList.toggle(
    "active",
    taskCategory.id === activeCategory
  );

  $taskCategoryItem.querySelector(".category-list__item-icon").textContent =
    taskCategory.icon;
  $taskCategoryItem.querySelector(".category-list__item-label").textContent =
    taskCategory.name;

  return $taskCategoryItem;
}

function onCategoryChange(e) {
  const $target = e.target.closest(".category-list__item");
  if ($target) {
    const categoryId = $target.dataset.id;
    $form.dataset.category = categoryId;
    renderTaskCategoryList(categoryId);
  }
}

/**Session Functions */
function onSessionChange(e) {
  const $target = e.target;
  if ($target.nodeName === "BUTTON") {
    let totalSessions = Number.parseInt(
      $form.getAttribute("data-sessions") || MIN_SESSIONS
    );
    totalSessions =
      $target.id === "session-controls--decrement"
        ? Math.max(MIN_SESSIONS, totalSessions - 1)
        : Math.min(MAX_SESSIONS, totalSessions + 1);

    $form.dataset.sessions = totalSessions;
    $sessionCount.textContent = totalSessions;
  }
}

/**Form Functions */

function onSubmit(mode, taskId) {
  const task = createTaskItem(mode, taskId);

  if (!task) return;
  if (mode === CREATE) {
    store.addTask(task);
  } else if (mode === EDIT) {
    store.updateTask(task);
  }
  renderTaskList(store.getTasks());
  closeModal();
}

function resetForm() {
  $form.reset();
  $form.dataset.category = "";
  $form.dataset.sessions = MIN_SESSIONS;
  $sessionCount.textContent = MIN_SESSIONS;
}

function createTaskItem(mode, taskId = null) {
  removeErrors();
  let formData = new FormData($form);
  formData = Object.fromEntries(formData);

  let defaultProps =
    mode === CREATE
      ? {
          id: crypto.randomUUID(),
          completed: false,
          completedSessions: 0,
        }
      : store.getTaskById(taskId);

  const sessions = Number.parseInt($form.dataset.sessions || MIN_SESSIONS);

  const task = {
    ...defaultProps,
    name: formData["task-name"],
    description: formData["task-description"],
    category: $form.dataset.category,
    sessions: sessions,
    completed: defaultProps?.completedSessions >= sessions,
  };

  const isValid = validateTask(task);
  return isValid ? task : null;
}

function validateTask(task) {
  if (!task.name || task.name.trim() === "") {
    addError("Please enter valid task name", "task-name");
    return false;
  }
  if (!task.category) {
    addError("Please select a category", "task-category");
    return false;
  }
  return true;
}

function addError(errorMessage, field) {
  const $target = document
    .querySelector(`[data-field="${field}"]`)
    .closest(".form__item");

  if ($target.querySelector(".error")) {
    return;
  }

  const $error = document.createElement("div");
  $error.classList.add("error");
  $error.textContent = errorMessage;
  $target.appendChild($error);
}

function removeErrors() {
  const $errors = document.querySelectorAll(".error");
  $errors.forEach((error) => {
    error.remove();
  });
}
