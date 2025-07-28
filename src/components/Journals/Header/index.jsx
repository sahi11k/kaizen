import React from "react";
import styles from "./style.module.css";

const Header = ({ setIsInputBoxOpen }) => {
  return (
    <div className={styles.journalHeader}>
      <button
        className={`btn ${styles.addJournalBtn}`}
        onClick={() => setIsInputBoxOpen(true)}
      >
        Add Journal
      </button>
    </div>
  );
};

export default Header;
