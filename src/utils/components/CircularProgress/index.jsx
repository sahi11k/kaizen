import React from "react";
import styles from "./style.module.css";

const CircularProgress = ({
  percentage = 50,
  size = 50,
  strokeWidth = 5,
  color = "black",
  trackColor = "grey",
  children,
}) => {
  return (
    <div
      className={styles.circularProgress}
      style={{
        "--progress": percentage,
        "--progress-color": color,
        "--progress-color-light": trackColor,
        "--size": `${size}px`,
        "--stroke-width": `${strokeWidth}px`,
      }}
    >
      {children}
    </div>
  );
};

export default CircularProgress;
