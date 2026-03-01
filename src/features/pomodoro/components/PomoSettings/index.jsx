import Button from "@/shared/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/shared/ui/popover";
import { Slider } from "@/shared/ui/slider";
import { TIMER_CONSTANTS } from "@/features/pomodoro/constants";
import useAuthStore from "@/features/auth/store/auth";
import { useUserSettingsQuery } from "@/features/settings/services/queries";
import { useUpsertUserSettingsMutation } from "@/features/settings/services/mutations";
import {
  getLongBreakInterval,
  getTimerDurations,
} from "@/features/pomodoro/utils/timer";
import { Settings } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import { Toast } from "@/shared/ui/toast";
import { Tooltip } from "@/shared/ui/tooltip";

const { toast } = Toast;

const { TASK_TIME, SHORT_BREAK_TIME, LONG_BREAK_TIME } = TIMER_CONSTANTS;

const DEFAULT_POMODORO_FORM_VALUES = {
  pomodoroDuration: TASK_TIME / 60,
  shortBreakDuration: SHORT_BREAK_TIME / 60,
  longBreakDuration: LONG_BREAK_TIME / 60,
  longBreakInterval: 4,
};

const PomoSettings = () => {
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

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <Tooltip content="Pomodoro Settings">
        <PopoverTrigger asChild>
          <Button
            icon={<Settings />}
            className="rounded-full w-12 !h-12"
            variant="icon"
            aria-label="Pomodoro Settings"
          />
        </PopoverTrigger>
      </Tooltip>
      <PopoverContent className="min-w-80 sm:w-md mx-8 px-6 border-border shadow-lg bg-background">
        <h4 className="heading-3 mb-6 text-foreground">Pomodoro Settings</h4>
        <form onSubmit={handleFormSubmit} className="flex flex-col gap-6">
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
              onValueChange={(value) => {
                handleFormChange("pomodoroDuration", value[0]);
              }}
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
              onValueChange={(value) => {
                handleFormChange("shortBreakDuration", value[0]);
              }}
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
              onValueChange={(value) => {
                handleFormChange("longBreakDuration", value[0]);
              }}
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
              onValueChange={(value) => {
                handleFormChange("longBreakInterval", value[0]);
              }}
            />
          </FormItem>
          <div className="flex justify-end gap-4 mt-6">
            <Button type="button" variant="outline" onClick={handleFormCancel}>
              Cancel
            </Button>
            <Button type="submit" loading={isPending} disabled={isPending}>
              Save Settings
            </Button>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
};

const FormItem = ({ label, children, value = 0, timeUnit = "min" }) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <label
          htmlFor={label}
          className="text-sm font-medium text-muted-foreground"
        >
          {label}
        </label>
        <strong className="text-sm text-muted-foreground">
          ({value} {timeUnit})
        </strong>
      </div>

      {children}
    </div>
  );
};

export default PomoSettings;
