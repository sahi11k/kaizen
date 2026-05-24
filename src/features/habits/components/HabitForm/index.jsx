import React, { useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";
import { ChevronDown } from "lucide-react";
import { HexColorInput, HexColorPicker } from "react-colorful";

import {
  Button,
  DatePicker,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  ResponsiveDialog,
  Select,
} from "@/shared/ui";
import { CREATE } from "@/shared/constants";
import {
  DEFAULT_HABIT_FORM_VALUES,
  HABIT_COLOR_PALETTE,
  HABIT_FREQUENCY_TYPES,
  HABIT_TARGET_TYPES,
  WEEK_DAYS,
} from "@/features/habits/constants";
import {
  buildHabitPayload,
  getHabitColor,
  validateHabitForm,
} from "@/features/habits/utils";

const DATE_KEY_FORMAT = "YYYY-MM-DD";
const REPEAT_OPTIONS = {
  DAILY: "daily",
  WEEKDAYS: "weekdays",
  CUSTOM_DAYS: "custom_days",
  WEEKLY_COUNT: "weekly_count",
};

const REPEAT_SELECT_OPTIONS = [
  { value: REPEAT_OPTIONS.DAILY, label: "Daily" },
  { value: REPEAT_OPTIONS.WEEKDAYS, label: "Weekdays" },
  { value: REPEAT_OPTIONS.CUSTOM_DAYS, label: "Custom days" },
  { value: REPEAT_OPTIONS.WEEKLY_COUNT, label: "Times per week" },
];

const GOAL_SELECT_OPTIONS = [
  { value: HABIT_TARGET_TYPES.BINARY, label: "Done / Not done" },
  { value: HABIT_TARGET_TYPES.NUMERIC, label: "Number goal" },
];

const WEEKLY_TARGET_OPTIONS = Array.from({ length: 7 }).map((_, index) => {
  const value = index + 1;
  return {
    value: String(value),
    label: String(value),
  };
});

const isDefaultWeekdays = (days = []) =>
  days.length === 5 && [1, 2, 3, 4, 5].every((day) => days.includes(day));

const getRandomHabitColor = () =>
  HABIT_COLOR_PALETTE[Math.floor(Math.random() * HABIT_COLOR_PALETTE.length)];

const getInitialRepeatMode = (habit) => {
  if (habit.repeatMode) return habit.repeatMode;

  if (habit.frequencyType === HABIT_FREQUENCY_TYPES.WEEKDAYS) {
    return isDefaultWeekdays(habit.frequencyDays ?? [])
      ? REPEAT_OPTIONS.WEEKDAYS
      : REPEAT_OPTIONS.CUSTOM_DAYS;
  }

  return habit.frequencyType ?? REPEAT_OPTIONS.DAILY;
};

const HabitForm = ({
  open,
  onOpenChange,
  mode = CREATE,
  habit,
  onSave,
  isSaving = false,
}) => {
  const initialValues = useMemo(() => {
    if (!habit) {
      return {
        ...DEFAULT_HABIT_FORM_VALUES,
        startDate: dayjs().format(DATE_KEY_FORMAT),
      };
    }

    return {
      name: habit.name ?? "",
      color: habit.color ?? "",
      repeatMode: getInitialRepeatMode(habit),
      frequencyType: habit.frequencyType ?? HABIT_FREQUENCY_TYPES.DAILY,
      frequencyDays: habit.frequencyDays ?? [1, 2, 3, 4, 5],
      weeklyTargetCount: habit.weeklyTargetCount ?? 3,
      targetType: habit.targetType ?? HABIT_TARGET_TYPES.BINARY,
      targetValue: habit.targetValue ?? "",
      targetUnit: habit.targetUnit ?? "",
      startDate: habit.startDate ?? dayjs().format(DATE_KEY_FORMAT),
    };
  }, [habit]);

  const [formValues, setFormValues] = useState(initialValues);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (open) {
      setFormValues(
        habit
          ? initialValues
          : {
              ...initialValues,
              color: getRandomHabitColor(),
            },
      );
      setSubmitted(false);
    }
  }, [habit, initialValues, open]);

  const errors = validateHabitForm(formValues);
  const showErrors = submitted && Object.keys(errors).length > 0;
  const repeatValue = formValues.repeatMode;

  const handleChange = (key, value) => {
    setFormValues((current) => ({ ...current, [key]: value }));
  };

  const handleFrequencyChange = (value) => {
    if (value === REPEAT_OPTIONS.WEEKDAYS) {
      setFormValues((current) => ({
        ...current,
        repeatMode: value,
        frequencyType: HABIT_FREQUENCY_TYPES.WEEKDAYS,
        frequencyDays: [1, 2, 3, 4, 5],
      }));
      return;
    }

    if (value === REPEAT_OPTIONS.CUSTOM_DAYS) {
      setFormValues((current) => ({
        ...current,
        repeatMode: value,
        frequencyType: HABIT_FREQUENCY_TYPES.WEEKDAYS,
        frequencyDays:
          current.repeatMode === REPEAT_OPTIONS.CUSTOM_DAYS
            ? current.frequencyDays
            : [],
      }));
      return;
    }

    setFormValues((current) => ({
      ...current,
      repeatMode: value,
      frequencyType: value,
      frequencyDays:
        value === HABIT_FREQUENCY_TYPES.DAILY
          ? [1, 2, 3, 4, 5, 6, 7]
          : current.frequencyDays,
      weeklyTargetCount:
        value === HABIT_FREQUENCY_TYPES.WEEKLY_COUNT
          ? current.weeklyTargetCount || 3
          : current.weeklyTargetCount,
    }));
  };

  const handleDayToggle = (day, checked) => {
    setFormValues((current) => {
      const daySet = new Set(current.frequencyDays);
      const shouldSelect = checked ?? !daySet.has(day);

      if (shouldSelect) daySet.add(day);
      else daySet.delete(day);

      return {
        ...current,
        frequencyDays: Array.from(daySet).sort((a, b) => a - b),
      };
    });
  };

  const handleSubmit = () => {
    setSubmitted(true);
    const nextErrors = validateHabitForm(formValues);
    if (Object.keys(nextErrors).length > 0) return;
    onSave(buildHabitPayload(formValues));
  };

  return (
    <ResponsiveDialog
      open={open}
      onOpenChange={onOpenChange}
      title={mode === CREATE ? "Add Habit" : "Edit Habit"}
      contentClassName="w-lg p-6 overflow-visible shadow-md"
      footer={
        <>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="submit" onClick={handleSubmit} loading={isSaving}>
            Save Changes
          </Button>
        </>
      }
    >
      <form
        className="flex flex-col gap-5"
        onSubmit={(e) => e.preventDefault()}
      >
        <Field error={showErrors ? errors.name : null}>
          <div className="flex items-center gap-3">
            <HabitColorPicker
              value={formValues.color}
              onChange={(color) => handleChange("color", color)}
            />
            <Input
              id="habit-name"
              name="habit-name"
              value={formValues.name}
              placeholder="What habit do you want to build?"
              aria-label="Habit name"
              autoFocus
              maxLength={50}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </div>
        </Field>

        <Field
          label="Repeat"
          error={
            showErrors ? errors.frequencyDays || errors.weeklyTargetCount : null
          }
        >
          <div className="grid min-w-0 grid-cols-2 gap-3">
            <Select
              value={repeatValue}
              onChange={handleFrequencyChange}
              options={REPEAT_SELECT_OPTIONS}
              aria-label="Repeat"
            />
            <RepeatDetailsDropdown
              repeatValue={repeatValue}
              frequencyDays={formValues.frequencyDays}
              weeklyTargetCount={formValues.weeklyTargetCount}
              onDayToggle={handleDayToggle}
              onWeeklyTargetChange={(value) =>
                handleChange("weeklyTargetCount", value)
              }
            />
          </div>
        </Field>

        <Field error={showErrors ? errors.targetValue : null}>
          <div className="flex items-center justify-between gap-4">
            <span className="text-sm font-medium text-muted-foreground">
              Goal
            </span>
            <Select
              value={formValues.targetType}
              onChange={(value) => handleChange("targetType", value)}
              options={GOAL_SELECT_OPTIONS}
              aria-label="Goal type"
              className="w-full max-w-[50%]"
            />
          </div>

          {formValues.targetType === HABIT_TARGET_TYPES.NUMERIC && (
            <div className="grid grid-cols-[1fr_1.2fr] gap-3">
              <Input
                type="number"
                min="0"
                step="1"
                value={formValues.targetValue}
                placeholder="No."
                aria-label="Goal value"
                onChange={(e) => handleChange("targetValue", e.target.value)}
              />
              <Input
                value={formValues.targetUnit}
                placeholder="Unit"
                aria-label="Goal unit"
                onChange={(e) => handleChange("targetUnit", e.target.value)}
              />
            </div>
          )}
        </Field>

        <Field error={showErrors ? errors.startDate : null}>
          <div className="flex items-center justify-between gap-4">
            <span className="text-sm font-medium text-muted-foreground">
              Start date
            </span>
            <DatePicker
              defaultDate={formValues.startDate || dayjs().format(DATE_KEY_FORMAT)}
              onDateChange={(date) =>
                handleChange("startDate", dayjs(date).format(DATE_KEY_FORMAT))
              }
              format="MMM D, YYYY"
              showIcon={false}
              tooltip="Click to edit"
              tooltipContentClassName="block"
              triggerClassName="h-auto min-h-0 border-0 bg-transparent p-0 text-sm font-medium text-foreground shadow-none hover:bg-transparent hover:text-foreground/80 focus-visible:ring-0 focus-visible:ring-offset-0 md:h-auto md:p-0 lg:h-auto lg:p-0"
              popoverClassName="z-[1000]"
              portalled={false}
              align="end"
            />
          </div>
        </Field>
      </form>
    </ResponsiveDialog>
  );
};

const Field = ({ label, error, children }) => (
  <div className="flex flex-col gap-2 text-sm font-medium text-muted-foreground">
    {label && <span>{label}</span>}
    {children}
    {error && <span className="text-xs text-destructive">{error}</span>}
  </div>
);

const HabitColorPicker = ({ value, onChange }) => {
  const selectedColor = getHabitColor(value);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-full outline-none transition-opacity hover:opacity-90 focus-visible:ring-[3px] focus-visible:ring-ring/50 xl:size-9"
          aria-label="Choose habit color"
        >
          <span
            className="size-full rounded-full"
            style={{ backgroundColor: selectedColor }}
            aria-hidden="true"
          />
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        portalled={false}
        className="z-[1000] w-auto border-border p-3"
      >
        <div className="flex flex-col gap-3">
          <HexColorPicker
            color={selectedColor}
            onChange={onChange}
            className="!h-40 !w-56"
          />
          <div className="flex items-center gap-2 rounded-md border border-border bg-background px-3 py-2">
            <span
              className="size-4 shrink-0 rounded-full"
              style={{ backgroundColor: selectedColor }}
              aria-hidden="true"
            />
            <span className="text-sm text-muted-foreground">#</span>
            <HexColorInput
              color={selectedColor}
              onChange={onChange}
              prefixed={false}
              aria-label="Habit color hex value"
              className="min-w-0 flex-1 bg-transparent text-sm font-medium text-foreground outline-none"
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

const RepeatDetailsDropdown = ({
  repeatValue,
  frequencyDays,
  weeklyTargetCount,
  onDayToggle,
  onWeeklyTargetChange,
}) => {
  if (repeatValue === REPEAT_OPTIONS.WEEKLY_COUNT) {
    return (
      <div className="flex min-w-0 items-center gap-2">
        <Select
          value={String(weeklyTargetCount)}
          onChange={(value) => onWeeklyTargetChange(Number(value))}
          options={WEEKLY_TARGET_OPTIONS}
          className="min-w-0 flex-1"
          contentClassName="min-w-[var(--radix-select-trigger-width)]"
          aria-label="Times per week"
        />
        <span className="shrink-0 text-sm text-muted-foreground">time(s)</span>
      </div>
    );
  }

  const checkedDays =
    repeatValue === REPEAT_OPTIONS.DAILY
      ? [1, 2, 3, 4, 5, 6, 7]
      : repeatValue === REPEAT_OPTIONS.WEEKDAYS
        ? [1, 2, 3, 4, 5]
        : frequencyDays;
  const disabled = repeatValue !== REPEAT_OPTIONS.CUSTOM_DAYS;
  const label = getRepeatDetailsLabel(repeatValue, checkedDays);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="h-10 min-w-0 w-full justify-between px-3 text-left font-normal xl:h-11 xl:px-4"
          aria-label="Repeat days"
        >
          <span className="truncate">{label}</span>
          <ChevronDown className="size-4 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="z-[1000] w-[var(--radix-dropdown-menu-trigger-width)] border-border"
        align="end"
      >
        {WEEK_DAYS.map((day) => (
          <DropdownMenuCheckboxItem
            key={`${day.label}-${day.value}`}
            checked={checkedDays.includes(day.value)}
            disabled={disabled}
            onSelect={(event) => {
              if (!disabled) event.preventDefault();
            }}
            onCheckedChange={(checked) => onDayToggle(day.value, checked)}
          >
            {getDayShortName(day.value)}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const getRepeatDetailsLabel = (repeatValue, days = []) => {
  if (repeatValue === REPEAT_OPTIONS.DAILY) return "Every day";
  if (repeatValue === REPEAT_OPTIONS.WEEKDAYS) return "Mon - Fri";
  if (!days.length) return "Select days";
  return days.map(getDayShortName).join(", ");
};

const getDayShortName = (day) =>
  ["", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][day];

export default HabitForm;
