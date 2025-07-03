import React from "react";
import styles from "./style.module.css";

export const ErrorText = ({ error }) => {
  return <div className={styles.errorText}>{error}</div>;
};
