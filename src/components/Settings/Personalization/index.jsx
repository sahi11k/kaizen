import React, { useState, useEffect, useCallback } from "react";
import styles from "../style.module.css";
import PomodoroSettings from "@/components/Settings/PomodoroSettings";
import SettingsFooter from "@/components/Settings/SettingsFooter";
import useAuthStore from "@/store/auth";
import { upsertUserSettings } from "@/db/apis/userSettings";
import { getLongBreakInterval, getTimerDurations } from "@/utils/timerHelpers";
import { Toast } from "@/utils/components/Toast";
import { TIMER_CONSTANTS } from "@/utils/constants";
const { toast } = Toast;
const { TASK_TIME, SHORT_BREAK_TIME, LONG_BREAK_TIME } = TIMER_CONSTANTS;

const DEFAULT_POMODORO_FORM_VALUES = {
  pomodoroDuration: TASK_TIME / 60,
  shortBreakDuration: SHORT_BREAK_TIME / 60,
  longBreakDuration: LONG_BREAK_TIME / 60,
  longBreakInterval: 4,
};

const Personalization = () => {
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

  return (
    <div className={styles.personalization}>
      <PomodoroSettings
        formValues={pomodoroFormValues}
        setFormValues={handleFormChange}
      />
      <SettingsFooter
        onCancel={handleFormCancel}
        onSave={handleFormSubmit}
        isLoading={isLoading}
      />
    </div>
  );
};

export default Personalization;
