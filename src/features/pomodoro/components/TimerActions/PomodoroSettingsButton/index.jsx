import {
  Button,
  ResponsiveDialog,
  Slider,
  Switch,
  Toast,
  Tooltip,
} from "@/shared/ui";
import { TIMER_CONSTANTS } from "@/features/pomodoro/constants";
import { useAuthStore } from "@/features/auth";
import {
  useUserSettingsQuery,
  useUpsertUserSettingsMutation,
} from "@/features/settings";
import {
  getLongBreakInterval,
  getTimerDurations,
} from "@/features/pomodoro/utils";
import { useTimerStore } from "@/features/pomodoro/store";
import { Settings } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";

const { toast } = Toast;

const { TASK_TIME, SHORT_BREAK_TIME, LONG_BREAK_TIME } = TIMER_CONSTANTS;

const DEFAULT_POMODORO_FORM_VALUES = {
  pomodoroDuration: TASK_TIME / 60,
  shortBreakDuration: SHORT_BREAK_TIME / 60,
  longBreakDuration: LONG_BREAK_TIME / 60,
  longBreakInterval: 4,
  soundEnabled: false,
};

const PomodoroSettingsButton = () => {
  const timerStarted = useTimerStore((s) => s.timerStarted);
  const user = useAuthStore((s) => s.user);
  const { data: userSettings } = useUserSettingsQuery(user?.id);
  const { mutate: upsertSettings, isPending } = useUpsertUserSettingsMutation();

  const [pomodoroFormValues, setPomodoroFormValues] = useState(
    DEFAULT_POMODORO_FORM_VALUES,
  );

  const [open, setOpen] = useState(false);

  const getDefaultPomodoroFormValues = useCallback(() => {
    const { taskTime, shortBreakTime, longBreakTime } =
      getTimerDurations(userSettings);
    return {
      pomodoroDuration: taskTime / 60,
      shortBreakDuration: shortBreakTime / 60,
      longBreakDuration: longBreakTime / 60,
      longBreakInterval: getLongBreakInterval(userSettings),
      soundEnabled: userSettings?.soundEnabled ?? false,
    };
  }, [userSettings]);

  useEffect(() => {
    if (userSettings) {
      setPomodoroFormValues(getDefaultPomodoroFormValues());
    }
  }, [userSettings, getDefaultPomodoroFormValues]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!user?.id) {
      toast.error("User authentication required");
      return;
    }
    upsertSettings(
      { payload: pomodoroFormValues, userId: user.id },
      {
        onSuccess: () => {
          setOpen(false);
          toast.success("Settings saved successfully!");
        },
        onError: () => {
          toast.error("Failed to save settings");
        },
      },
    );
  };

  const handleFormCancel = () => {
    setPomodoroFormValues(getDefaultPomodoroFormValues());
    setOpen(false);
  };

  const handleFormChange = (key, value) => {
    setPomodoroFormValues((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const settingsForm = (
    <form
      id="pomodoro-settings-form"
      onSubmit={handleFormSubmit}
      className="flex flex-col gap-6"
    >
      <FormItem
        label="Pomodoro Timer Duration"
        value={pomodoroFormValues.pomodoroDuration}
        timeUnit="min"
      >
        <Slider
          value={[pomodoroFormValues.pomodoroDuration]}
          min={3}
          max={60}
          step={1}
          onValueChange={(value) =>
            handleFormChange("pomodoroDuration", value[0])
          }
        />
      </FormItem>
      <FormItem
        label="Short Break Duration"
        value={pomodoroFormValues.shortBreakDuration}
        timeUnit="min"
      >
        <Slider
          value={[pomodoroFormValues.shortBreakDuration]}
          min={3}
          max={15}
          step={1}
          onValueChange={(value) =>
            handleFormChange("shortBreakDuration", value[0])
          }
        />
      </FormItem>
      <FormItem
        label="Long Break Duration"
        value={pomodoroFormValues.longBreakDuration}
        timeUnit="min"
      >
        <Slider
          value={[pomodoroFormValues.longBreakDuration]}
          min={5}
          max={30}
          step={1}
          onValueChange={(value) =>
            handleFormChange("longBreakDuration", value[0])
          }
        />
      </FormItem>
      <FormItem
        label="Long Break Interval"
        value={pomodoroFormValues.longBreakInterval}
        timeUnit=""
      >
        <Slider
          value={[pomodoroFormValues.longBreakInterval]}
          min={2}
          max={10}
          step={1}
          onValueChange={(value) =>
            handleFormChange("longBreakInterval", value[0])
          }
        />
      </FormItem>
      <div className="flex items-center justify-between">
        <label htmlFor="sound-toggle" className="form-label">
          Timer Sound Effects
        </label>
        <Switch
          id="sound-toggle"
          checked={pomodoroFormValues.soundEnabled}
          onCheckedChange={(checked) =>
            handleFormChange("soundEnabled", checked)
          }
        />
      </div>
    </form>
  );

  const footer = (
    <>
      <Button type="button" variant="outline" onClick={handleFormCancel}>
        Cancel
      </Button>
      <Button
        type="submit"
        form="pomodoro-settings-form"
        loading={isPending}
        disabled={isPending}
      >
        Update
      </Button>
    </>
  );

  return (
    <>
      <Tooltip
        content={
          timerStarted
            ? "Pause or reset the timer to edit settings"
            : "Pomodoro Settings"
        }
      >
        <span className="inline-flex">
          <Button
            icon={<Settings />}
            className="pomodoro-control-button"
            variant="icon"
            aria-label="Pomodoro Settings"
            disabled={timerStarted}
            onClick={() => !timerStarted && setOpen(true)}
          />
        </span>
      </Tooltip>
      <ResponsiveDialog
        open={open}
        onOpenChange={(v) => !timerStarted && setOpen(v)}
        title="Pomodoro Settings"
        footer={footer}
      >
        {settingsForm}
      </ResponsiveDialog>
    </>
  );
};

const FormItem = ({ label, children, value = 0, timeUnit = "min" }) => {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2">
        <label htmlFor={label} className="form-label">
          {label}
        </label>
        <strong className="body-description">
          ({value}
          {timeUnit && ` ${timeUnit}`})
        </strong>
      </div>

      {children}
    </div>
  );
};

export default PomodoroSettingsButton;
