import React, { useState } from "react";
import styles from "../style.module.css";
import PomodoroSettings from "@/components/Settings/PomodoroSettings";
import SettingsFooter from "@/components/Settings/SettingsFooter";

const DEFAULT_POMODORO_FORM_VALUES = {
  pomodoroDuration: 25,
  shortBreakDuration: 5,
  longBreakDuration: 15,
  longBreakInterval: 4,
};

const Personalization = () => {
  const [pomodoroFormValues, setPomodoroFormValues] = useState(
    DEFAULT_POMODORO_FORM_VALUES
  );

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.info("pomodoroFormValues", pomodoroFormValues);
  };

  const handleFormCancel = () => {
    setPomodoroFormValues(DEFAULT_POMODORO_FORM_VALUES);
  };

  return (
    <div className={styles.personalization}>
      <PomodoroSettings
        formValues={pomodoroFormValues}
        setFormValues={setPomodoroFormValues}
      />
      <SettingsFooter onCancel={handleFormCancel} onSave={handleFormSubmit} />
    </div>
  );
};

export default Personalization;
