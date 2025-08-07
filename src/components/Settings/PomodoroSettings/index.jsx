import React from "react";
import FormItem, { FormItemWrapper } from "@/utils/components/FormItem";
import styles from "../style.module.css";

const PomodoroSettings = ({ formValues, setFormValues }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: parseInt(value, 10),
    });
  };

  return (
    <form>
      <FormItemWrapper className={`${styles.formItem} ${styles.inline}`}>
        <label htmlFor="pomodoroDuration">Pomodoro Timer Duration</label>
        <FormItem.InputNumber
          id="pomodoroDuration"
          name="pomodoroDuration"
          value={formValues.pomodoroDuration}
          onChange={handleChange}
          min={10}
          max={60}
        />
      </FormItemWrapper>
      <FormItemWrapper className={`${styles.formItem} ${styles.inline}`}>
        <label htmlFor="shortBreakDuration">Short Break Duration</label>
        <FormItem.InputNumber
          id="shortBreakDuration"
          name="shortBreakDuration"
          value={formValues.shortBreakDuration}
          onChange={handleChange}
          min={5}
          max={15}
        />
      </FormItemWrapper>

      <FormItemWrapper className={`${styles.formItem} ${styles.inline}`}>
        <label htmlFor="longBreakDuration">Long Break Duration</label>
        <FormItem.InputNumber
          id="longBreakDuration"
          name="longBreakDuration"
          value={formValues.longBreakDuration}
          onChange={handleChange}
          min={15}
          max={30}
        />
      </FormItemWrapper>

      <FormItemWrapper className={`${styles.formItem} ${styles.inline}`}>
        <label htmlFor="longBreakInterval">Long Break Interval</label>
        <FormItem.InputNumber
          id="longBreakInterval"
          name="longBreakInterval"
          value={formValues.longBreakInterval}
          onChange={handleChange}
          min={2}
          max={10}
        />
      </FormItemWrapper>
    </form>
  );
};

export default PomodoroSettings;
