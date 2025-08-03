import React from "react";
import styles from "../style.module.css";
import { FormItemWrapper } from "@/utils/components/FormItem";

const Personalization = () => {
  return (
    <div className={styles.personalization}>
      <form>
        <FormItemWrapper className={styles.formItem}>
          <label>Pomodoro Timer Duration</label>
          <input type="number" name="pomodoroDuration" value="25" />
        </FormItemWrapper>
        <FormItemWrapper className={styles.formItem}>
          <label>Short Break Duration</label>
          <input type="number" name="shortBreakDuration" value="5" />
        </FormItemWrapper>
        <FormItemWrapper className={styles.formItem}>
          <label>Long Break Duration</label>
          <input type="number" name="longBreakDuration" value="15" />
        </FormItemWrapper>
        <FormItemWrapper className={styles.formItem}>
          <label>Long Break Interval</label>
          <input type="number" name="longBreakInterval" value="4" />
        </FormItemWrapper>
      </form>
    </div>
  );
};

export default Personalization;
