import React from "react";

const AddForm = ({ visible, setVisible }) => {
  return (
    <div>
      <form id="add-task-form" class="form">
        <div class="form__item" data-field="task-name">
          <input
            type="text"
            name="task-name"
            id="task-name"
            placeholder="Write what you're going to do..."
            aria-label="task-name"
          />
        </div>
        <div class="form__item" data-field="task-category">
          <label for="task-category">Select Category</label>
          <div class="category-list"></div>
        </div>
        <div class="form__item" data-field="total-sessions">
          <label for="total-sessions">Total Sessions</label>
          <div class="session-controls">
            <button
              id="session-controls--decrement"
              class="btn btn--icon"
              type="button"
            >
              &#x2012;
            </button>
            <span class="session-count">1</span>
            <button
              id="session-controls--increment"
              class="btn btn--icon"
              type="button"
            >
              &#43;
            </button>
          </div>
        </div>
        <div class="form__item" data-field="task-description">
          <textarea
            aria-label="task-description"
            name="task-description"
            id="task-description"
            rows="3"
            placeholder="Write more details about the task..."
          ></textarea>
        </div>
      </form>
    </div>
  );
};

export default AddForm;
