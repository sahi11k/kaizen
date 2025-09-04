import React, { useState, useEffect, useCallback } from "react";
import styles from "../style.module.css";

import useAuthStore from "@/store/auth";
import { upsertUserSettings } from "@/db/apis/userSettings";
import { getLongBreakInterval, getTimerDurations } from "@/utils/timerHelpers";
import { Toast } from "@/utils/components/Toast";
import FormItem, { FormItemWrapper } from "@/utils/components/FormItem";
import Slider from "@/utils/components/Slider";
import { TIMER_CONSTANTS } from "@/constants/pomodoro";
const { toast } = Toast;
const { TASK_TIME, SHORT_BREAK_TIME, LONG_BREAK_TIME } = TIMER_CONSTANTS;

const DEFAULT_POMODORO_FORM_VALUES = {
  pomodoroDuration: TASK_TIME / 60,
  shortBreakDuration: SHORT_BREAK_TIME / 60,
  longBreakDuration: LONG_BREAK_TIME / 60,
  longBreakInterval: 4,
};

const Pomodoro = () => {
  const { user, userSettings, setUserSettings } = useAuthStore();
  const [pomodoroFormValues, setPomodoroFormValues] = useState(
    DEFAULT_POMODORO_FORM_VALUES
  );
  const [isLoading, setIsLoading] = useState(false);

  const getDefaultPomodoroFormValues = useCallback(() => {
    const { taskTime, shortBreakTime, longBreakTime } =
      getTimerDurations(userSettings);
    return {
      pomodoroDuration: taskTime / 60,
      shortBreakDuration: shortBreakTime / 60,
      longBreakDuration: longBreakTime / 60,
      longBreakInterval: getLongBreakInterval(userSettings),
    };
  }, [userSettings]);

  // Initialize form with user settings when available
  useEffect(() => {
    if (userSettings) {
      setPomodoroFormValues(getDefaultPomodoroFormValues());
    }
  }, [userSettings, getDefaultPomodoroFormValues]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!user?.id) {
      toast.error("User authentication required");
      return;
    }
    setIsLoading(true);
    try {
      const res = await upsertUserSettings(pomodoroFormValues, user.id);
      if (res.error) {
        toast.error(res.error);
      } else {
        setUserSettings(res.data);
        toast.success("Settings saved successfully!");
      }
    } catch (error) {
      toast.error("Failed to save settings:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormCancel = () => {
    setPomodoroFormValues(getDefaultPomodoroFormValues());
  };

  const handleFormChange = (newValues) => {
    setPomodoroFormValues(newValues);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPomodoroFormValues({
      ...pomodoroFormValues,
      [name]: parseInt(value, 10),
    });
  };

  return (
    <div className={styles.personalization}>
      <form>
        <FormItemWrapper className={`${styles.formItem} ${styles.inline}`}>
          <label htmlFor="pomodoroDuration">Pomodoro Timer Duration</label>
          <Slider
            defaultValue={[pomodoroFormValues.pomodoroDuration]}
            min={10}
            max={60}
            step={1}
            onValueChange={(value) => {
              console.log(value);
            }}
          />
        </FormItemWrapper>
        <FormItemWrapper className={`${styles.formItem} ${styles.inline}`}>
          <label htmlFor="shortBreakDuration">Short Break Duration</label>
          <Slider
            defaultValue={[pomodoroFormValues.pomodoroDuration]}
            min={10}
            max={60}
            step={1}
            onValueChange={(value) => {
              console.log(value);
            }}
          />
        </FormItemWrapper>

        <FormItemWrapper className={`${styles.formItem} ${styles.inline}`}>
          <label htmlFor="longBreakDuration">Long Break Duration</label>
          <Slider
            defaultValue={[pomodoroFormValues.pomodoroDuration]}
            min={10}
            max={60}
            step={1}
            onValueChange={(value) => {
              console.log(value);
            }}
          />
        </FormItemWrapper>

        <FormItemWrapper className={`${styles.formItem} ${styles.inline}`}>
          <label htmlFor="longBreakInterval">Long Break Interval</label>
          <Slider
            defaultValue={[pomodoroFormValues.pomodoroDuration]}
            min={10}
            max={60}
            step={1}
            onValueChange={(value) => {
              console.log(value);
            }}
          />
        </FormItemWrapper>
      </form>
    </div>
  );
};

export default Pomodoro;
