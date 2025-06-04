import React, { useEffect } from "react";
import styles from "./style.module.css";
import { MAX_SESSIONS, MIN_SESSIONS, TASK_CATEGORIES } from "@/utils/constants";

const AddForm = ({ formValues, setFormValues }) => {
  const handleChange = (key, value) => {
    setFormValues((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className={styles.formContainer}>
      <form className={styles.form}>
        <div className={styles.formItem}>
          <select
            name="task-category"
            id="task-category"
            value={formValues.category}
            onChange={(e) => handleChange("category", e.target.value)}
          >
            {TASK_CATEGORIES.map((category) => (
              <option key={category.key} value={category.key}>
                {category.icon} {category.name}
              </option>
            ))}
          </select>
          <input
            type="text"
            name="task-title"
            id="task-title"
            placeholder="Write what you're going to do..."
            aria-label="task-title"
            autoFocus
            value={formValues.title}
            onChange={(e) => handleChange("title", e.target.value)}
          />
        </div>

        <div className={styles.formItem} data-field="total-sessions">
          <label htmlFor="total-sessions">
            Total Sessions (Max {MAX_SESSIONS})
          </label>
          <div className={styles.sessionControls}>
            <button
              className="btn"
              type="button"
              onClick={() =>
                handleChange(
                  "totalSessions",
                  Math.max(MIN_SESSIONS, formValues.totalSessions - 1)
                )
              }
            >
              &#x2012;
            </button>
            <input
              type="text"
              name="total-sessions"
              id="total-sessions"
              value={formValues.totalSessions}
              disabled
            />
            <button
              className="btn"
              type="button"
              onClick={() =>
                handleChange(
                  "totalSessions",
                  Math.min(MAX_SESSIONS, formValues.totalSessions + 1)
                )
              }
            >
              &#43;
            </button>
          </div>
        </div>
        <div className={styles.formItem} data-field="task-description">
          <textarea
            aria-label="task-description"
            name="task-description"
            id="task-description"
            rows="3"
            placeholder="Write more details about the task..."
            value={formValues.description}
            onChange={(e) => handleChange("description", e.target.value)}
          ></textarea>
        </div>
      </form>
    </div>
  );
};

export default AddForm;
