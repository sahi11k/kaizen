import React from "react";
import styles from "./style.module.css";
import AddIcon from "@/assets/icons/add.svg?react";

const AddJournal = ({ showInputHandler }) => {
  return (
    <button
      className={`btn ${styles.addJournalBtn}`}
      onClick={showInputHandler}
    >
      <span className={styles.addJournalIcon}>
        <AddIcon />
      </span>
      <span className={styles.addJournalText}>Add Journal</span>
    </button>
  );
};

export default AddJournal;
