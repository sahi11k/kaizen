import React from "react";
import styles from "./style.module.css";

const Header = ({ showInputHandler }) => {
  return (
    <div className={styles.journalHeader}>
      <button
        className={`btn ${styles.addJournalBtn}`}
        onClick={showInputHandler}
      >
        Add Journal
      </button>
    </div>
  );
};

export default Header;
