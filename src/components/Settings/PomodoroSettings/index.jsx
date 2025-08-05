import React from "react";
import styles from "../style.module.css";
import { FormItemWrapper } from "@/utils/components/FormItem";

const PomodoroSettings = ({ formValues, setFormValues }) => {
  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form>
      <FormItemWrapper className={styles.formItem}>
        <label>Pomodoro Timer Duration</label>
        <input
          type="number"
          name="pomodoroDuration"
          value={formValues.pomodoroDuration}
          onChange={handleChange}
        />
      </FormItemWrapper>
      <FormItemWrapper className={styles.formItem}>
        <label>Short Break Duration</label>
        <input
          type="number"
          name="shortBreakDuration"
          value={formValues.shortBreakDuration}
          onChange={handleChange}
        />
      </FormItemWrapper>
      <FormItemWrapper className={styles.formItem}>
        <label>Long Break Duration</label>
        <input
          type="number"
          name="longBreakDuration"
          value={formValues.longBreakDuration}
          onChange={handleChange}
        />
      </FormItemWrapper>
      <FormItemWrapper className={styles.formItem}>
        <label>Long Break Interval</label>
        <input
          type="number"
          name="longBreakInterval"
          value={formValues.longBreakInterval}
          onChange={handleChange}
        />
      </FormItemWrapper>
    </form>
  );
};

export default PomodoroSettings;
