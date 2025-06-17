import React from "react";
import styles from "./style.module.css";
import {
  MAX_SESSIONS,
  MIN_SESSIONS,
  TASK_CATEGORIES,
  TASK_CATEGORY_ICONS,
} from "@/utils/constants";
import Dropdown from "@/utils/components/Dropdown";

const AddForm = ({ formValues, setFormValues }) => {
  const handleChange = (key, value) => {
    setFormValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleSelectCategory = (option) => {
    handleChange("category", option.value);
  };

  return (
    <div className={styles.formContainer}>
      <form className={styles.form}>
        <div className={styles.formItem}>
          <Dropdown
            trigger={
              <span>
                {TASK_CATEGORY_ICONS[formValues.category || "others"]}
              </span>
            }
            options={TASK_CATEGORIES}
            onSelect={handleSelectCategory}
            className={styles.iconDropdown}
            customStyles={{
              dropdown: {
                width: "max-content",
                padding: 0,
                height: 40,
                fontSize: "1rem",
              },
              trigger: {
                height: "100%",
                minHeight: 40,
                border: "2px solid var(--surface)",
                backgroundColor: "transparent",
              },
              menu: {
                width: 200,
              },
            }}
          />
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
