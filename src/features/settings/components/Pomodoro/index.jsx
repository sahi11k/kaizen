import React, { useCallback, useEffect, useState } from "react";
import { Save, Undo2 } from "lucide-react";

import { useAuthStore } from "@/features/auth";
import {
  useUpsertUserSettingsMutation,
  useUserSettingsQuery,
} from "@/features/settings";
import { TIMER_CONSTANTS } from "@/features/pomodoro/constants";
import {
  getLongBreakInterval,
  getTimerDurations,
} from "@/features/pomodoro/utils";
import { Button, Input, Switch, Toast } from "@/shared/ui";

const { toast } = Toast;
const { TASK_TIME, SHORT_BREAK_TIME, LONG_BREAK_TIME } = TIMER_CONSTANTS;

const DEFAULT_PREFERENCES = {
  pomodoroDuration: TASK_TIME / 60,
  shortBreakDuration: SHORT_BREAK_TIME / 60,
  longBreakDuration: LONG_BREAK_TIME / 60,
  longBreakInterval: 4,
  soundEnabled: false,
};

const POMODORO_FIELDS = [
  {
    key: "pomodoroDuration",
    label: "Pomodoro duration",
    min: 3,
    max: 60,
    unit: "min",
  },
  {
    key: "shortBreakDuration",
    label: "Short break duration",
    min: 3,
    max: 15,
    unit: "min",
  },
  {
    key: "longBreakDuration",
    label: "Long break duration",
    min: 5,
    max: 30,
    unit: "min",
  },
  {
    key: "longBreakInterval",
    label: "Long break interval",
    min: 2,
    max: 10,
    unit: "sessions",
  },
];

const PomodoroSettings = () => {
  const user = useAuthStore((s) => s.user);
  const { data: userSettings } = useUserSettingsQuery(user?.id);
  const { mutate: upsertSettings, isPending } = useUpsertUserSettingsMutation();

  const [formValues, setFormValues] = useState(DEFAULT_PREFERENCES);

  const getDefaultPreferenceValues = useCallback(() => {
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
      setFormValues(getDefaultPreferenceValues());
    }
  }, [userSettings, getDefaultPreferenceValues]);

  const defaultValues = getDefaultPreferenceValues();
  const isDirty = Object.keys(defaultValues).some(
    (key) => formValues[key] !== defaultValues[key],
  );
  const fieldErrors = POMODORO_FIELDS.reduce((errors, field) => {
    const value = formValues[field.key];

    if (!Number.isFinite(value)) {
      return {
        ...errors,
        [field.key]: "Enter a valid number",
      };
    }

    if (value < field.min) {
      return {
        ...errors,
        [field.key]: `Minimum is ${field.min} ${field.unit}`,
      };
    }

    if (value > field.max) {
      return {
        ...errors,
        [field.key]: `Maximum is ${field.max} ${field.unit}`,
      };
    }

    return errors;
  }, {});
  const hasErrors = Object.keys(fieldErrors).length > 0;

  const handlePreferenceChange = (key, value) => {
    setFormValues((currentValues) => ({
      ...currentValues,
      [key]: value,
    }));
  };

  const handleFormCancel = () => {
    setFormValues(defaultValues);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (hasErrors) return;

    if (!user?.id) {
      toast.error("User authentication required");
      return;
    }

    upsertSettings(
      { payload: formValues, userId: user.id },
      {
        onSuccess: () => {
          toast.success("Preferences saved successfully");
        },
        onError: () => {
          toast.error("Failed to save preferences");
        },
      },
    );
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={handleFormSubmit}>
      <section className="rounded-lg border border-border p-4 sm:p-6">
        <div className="grid gap-5">
          {POMODORO_FIELDS.map((field) => (
            <NumberField
              key={field.key}
              {...field}
              value={formValues[field.key]}
              error={fieldErrors[field.key]}
              onChange={(value) => handlePreferenceChange(field.key, value)}
            />
          ))}
        </div>
      </section>

      <section className="rounded-lg border border-border p-4 sm:p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <label
              htmlFor="settings-sound-toggle"
              className="text-sm font-medium text-foreground"
            >
              Timer sound effects
            </label>
            <p className="text-sm text-muted-foreground">
              Play a sound when sessions start and end.
            </p>
          </div>
          <Switch
            id="settings-sound-toggle"
            thumbClassName="bg-card"
            checked={formValues.soundEnabled}
            onCheckedChange={(checked) =>
              handlePreferenceChange("soundEnabled", checked)
            }
          />
        </div>
      </section>

      <div className="flex gap-3 sm:justify-end">
        <Button
          type="button"
          variant="outline"
          icon={<Undo2 className="size-4" />}
          onClick={handleFormCancel}
          disabled={isPending || !isDirty}
          size="sm"
          className="flex-1 sm:flex-none"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          icon={<Save className="size-4" />}
          loading={isPending}
          disabled={!isDirty || hasErrors}
          size="sm"
          className="flex-1 sm:flex-none"
        >
          Save
        </Button>
      </div>
    </form>
  );
};

const NumberField = ({ label, value, min, max, unit, error, onChange }) => {
  return (
    <label className="flex flex-col gap-2 text-sm font-medium text-muted-foreground">
      <span className="flex items-center justify-between gap-3">
        <span>{label}</span>
        <span className="text-xs font-medium text-muted-foreground">
          Max {max} {unit}
        </span>
      </span>
      <Input
        type="number"
        value={Number.isFinite(value) ? value : ""}
        min={min}
        max={max}
        step={1}
        aria-invalid={!!error}
        onChange={(e) => onChange(e.target.valueAsNumber)}
      />
      {error && <span className="form-error">{error}</span>}
    </label>
  );
};

export default PomodoroSettings;
