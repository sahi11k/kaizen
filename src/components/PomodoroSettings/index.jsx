import React from "react";
import styles from "./style.module.css";

const PomodoroSettings = () => {
  return (
    <section className={`card ${styles.pomodoroSettings}`}>
      <div className={`card__header ${styles.pomodoroSettings__header}`}>
        <div className={styles.pomodoroSettings__header__title}>
          Pomodoro Settings
        </div>
      </div>
    </section>
  );
};

export default PomodoroSettings;
