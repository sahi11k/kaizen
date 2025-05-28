import React from "react";

const TaskList = () => {
  return (
    <div class="card card--task-list">
      <div class="card__header">Task List</div>
      <div class="card__body task-list-container">
        <ul id="task-list" class="task-list"></ul>
        <div class="task-list__empty">
          <div class="task-list__empty-content">
            <span class="task-list__empty-icon"> 🗂️ </span>
            <span class="task-list__empty-message">
              <strong>No Tasks</strong>
              <span>Add a task to get started.</span>
            </span>
          </div>
        </div>
      </div>
      <div class="card__footer">
        <button class="btn add-task-btn" id="add-task-modal-handler">
          <span class="btn__icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#e8eaed"
            >
              <path d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160Zm40 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z" />
            </svg>
          </span>
          <span class="btn__label">Add Task</span>
        </button>
      </div>
    </div>
  );
};

export default TaskList;
