import React from "react";
import styles from "./style.module.css";

const OrDivider = () => {
  return (
    <div className={styles.divider}>
      <hr />
      <span>or</span>
      <hr />
    </div>
  );
};

export default OrDivider;
