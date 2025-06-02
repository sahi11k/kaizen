import React from "react";
import styles from "./style.module.css";

const AddForm = ({ visible, setVisible }) => {
  return (
    <div className={styles.formContainer}>
      <form className={styles.form}>
        <div className={styles.formItem}>
          <select name="task-category" id="task-category">
            <option value="study">Study</option>
            <option value="work">Work</option>
            <option value="health">Health</option>
            <option value="other">Other</option>
          </select>
          <input
            type="text"
            name="task-name"
            id="task-name"
            placeholder="Write what you're going to do..."
            aria-label="task-name"
            autoFocus
          />
        </div>
        <div className={styles.formItem} data-field="total-sessions">
          <label htmlFor="total-sessions">Total Sessions (Max 15)</label>
          <div className={styles.sessionControls}>
            <button className="btn" type="button">
              &#x2012;
            </button>
            <input
              type="text"
              name="total-sessions"
              id="total-sessions"
              defaultValue={0}
            />
            <button className="btn" type="button">
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
          ></textarea>
        </div>
      </form>
    </div>
  );
};

export default AddForm;
