import React, { useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";
import EmptyHabitIllustration from "@/assets/illustrations/empty-habit.svg?react";
import {
  ArrowLeft,
  BadgeCheck,
  CalendarCheck,
  Check,
  CheckCheck,
  ChevronDown,
  Edit3,
  Flame,
  Moon,
  Plus,
  Trophy,
  Trash2,
  Undo2,
} from "lucide-react";

import {
  HABIT_ENTRY_STATUS,
  useHabitEntriesForRangeQuery,
} from "@/features/habits";
import {
  getFrequencyLabel,
  getHabitColor,
  getTodayDateKey,
  isHabitEndedForDate,
  isHabitDueForDate,
} from "@/features/habits/utils";
import { useAuthStore } from "@/features/auth";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  EmptyState,
  Select,
  Skeleton,
  Tooltip,
} from "@/shared/ui";
import { cn } from "@/shared/lib/utils";

const DATE_KEY_FORMAT = "YYYY-MM-DD";
const WEEKDAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const ACTIVITY_CARD_CLASS_NAME =
  "w-full rounded-2xl border border-border bg-card p-5 shadow-xs xl:p-6";

const HabitDetailPlaceholder = ({
  habit,
  onComplete,
  onToggleDate,
  selectedDateKey,
  isCompletedOnSelectedDate = false,
  onEdit,
  onCreateHabit,
  onDelete,
  onMarkIncomplete,
  onBack,
}) => {
  const { user } = useAuthStore();
  const today = useMemo(() => dayjs().startOf("day"), []);
  const activeDateKey = selectedDateKey ?? getTodayDateKey();
  const selectedDate = useMemo(
    () => dayjs(activeDateKey).startOf("day"),
    [activeDateKey],
  );
  const isSelectedDateBeforeStart = habit
    ? dayjs(habit.startDate).startOf("day").isAfter(selectedDate, "day")
    : false;
  const isSelectedDateAfterEnd = habit
    ? isHabitEndedForDate(habit, activeDateKey)
    : false;
  const isSelectedDateFuture = selectedDate.isAfter(today, "day");
  const isScheduledOnSelectedDate = useMemo(
    () => (habit ? isHabitDueForDate(habit, activeDateKey) : false),
    [habit, activeDateKey],
  );
  const currentYear = today.year();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const firstYear = habit?.startDate
    ? Math.min(dayjs(habit.startDate).year(), currentYear)
    : currentYear;
  const yearOptions = useMemo(
    () =>
      Array.from({ length: currentYear - firstYear + 1 }).map((_, index) => {
        const year = currentYear - index;
        return {
          label: String(year),
          value: String(year),
        };
      }),
    [currentYear, firstYear],
  );
  useEffect(() => {
    setSelectedYear((year) => Math.min(Math.max(year, firstYear), currentYear));
  }, [currentYear, firstYear]);
  const yearStart = dayjs(`${selectedYear}-01-01`).startOf("day");
  const yearEnd = dayjs(`${selectedYear}-12-31`).startOf("day");
  const rangeStart = yearStart.format(DATE_KEY_FORMAT);
  const rangeEnd = yearEnd.format(DATE_KEY_FORMAT);
  const monthStart = today.startOf("month");
  const monthRangeStart = monthStart.format(DATE_KEY_FORMAT);
  const monthRangeEnd = today.format(DATE_KEY_FORMAT);
  const { data: yearEntries = [], isLoading } = useHabitEntriesForRangeQuery({
    userId: user?.id,
    habitId: habit?.id,
    startDate: rangeStart,
    endDate: rangeEnd,
  });
  const { data: monthEntries = [] } = useHabitEntriesForRangeQuery({
    userId: user?.id,
    habitId: habit?.id,
    startDate: monthRangeStart,
    endDate: monthRangeEnd,
  });

  const completedDates = useMemo(() => {
    return new Set(
      yearEntries
        .filter((entry) => entry.status === HABIT_ENTRY_STATUS.COMPLETED)
        .map((entry) => entry.entryDate),
    );
  }, [yearEntries]);

  const streakDays = useMemo(() => {
    if (!habit) return [];

    const dayCount = yearEnd.diff(yearStart, "day") + 1;

    return Array.from({ length: dayCount }).map((_, index) => {
      const date = yearStart.add(index, "day");
      const dateKey = date.format(DATE_KEY_FORMAT);
      const isFuture = date.isAfter(today, "day");
      const isDue = isHabitDueForDate(habit, dateKey);
      const isCompleted = !isFuture && completedDates.has(dateKey);

      return {
        date,
        dateKey,
        isFuture,
        isDue,
        isCompleted,
      };
    });
  }, [completedDates, habit, today, yearEnd, yearStart]);

  const monthStats = useMemo(() => {
    if (!habit) {
      return {
        rate: 0,
        completedCount: 0,
      };
    }

    const completedMonthDates = new Set(
      monthEntries
        .filter((entry) => entry.status === HABIT_ENTRY_STATUS.COMPLETED)
        .map((entry) => entry.entryDate),
    );

    const elapsedDays = Array.from({
      length: today.diff(monthStart, "day") + 1,
    }).map((_, index) => {
      const date = monthStart.add(index, "day");
      const dateKey = date.format(DATE_KEY_FORMAT);

      return {
        isDue: isHabitDueForDate(habit, dateKey),
        isCompleted: completedMonthDates.has(dateKey),
      };
    });
    const elapsedDueDays = elapsedDays.filter((day) => day.isDue);
    const completedDueDays = elapsedDueDays.filter((day) => day.isCompleted);
    const rate =
      elapsedDueDays.length === 0
        ? 0
        : Math.round((completedDueDays.length / elapsedDueDays.length) * 100);

    return {
      rate,
      completedCount: completedDueDays.length,
    };
  }, [habit, monthEntries, monthStart, today]);

  const metrics = useMemo(() => {
    const currentStreak = Number(habit?.currentStreak ?? 0);
    const longestStreak = Number(habit?.longestStreak ?? 0);
    const completionRate = Number(monthStats.rate ?? 0);

    return {
      currentStreak,
      longestStreak,
      completionRate,
    };
  }, [habit?.currentStreak, habit?.longestStreak, monthStats.rate]);

  if (!habit) {
    return (
      <div className="flex h-full items-center justify-center">
        <EmptyState
          icon={
            <div className="w-80 md:w-100">
              <EmptyHabitIllustration />
            </div>
          }
          title="No Habit Selected"
          description="Choose a habit from the list or create a new one."
          action={
            <Button
              onClick={onCreateHabit}
              className="mt-2"
              icon={<Plus className="size-4" />}
            >
              New Habit
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden">
      <HabitDetailHeader
        habit={habit}
        isSelectedDateBeforeStart={isSelectedDateBeforeStart}
        isSelectedDateAfterEnd={isSelectedDateAfterEnd}
        isSelectedDateFuture={isSelectedDateFuture}
        isScheduledOnSelectedDate={isScheduledOnSelectedDate}
        isCompletedOnSelectedDate={isCompletedOnSelectedDate}
        onComplete={onComplete}
        onEdit={onEdit}
        onDelete={onDelete}
        onMarkIncomplete={onMarkIncomplete}
        onBack={onBack}
      />

      <div className="flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto p-5 xl:gap-6 xl:p-6">
        {!habit.archivedAt && (
          <SelectedDateActivityCard
            selectedDateKey={activeDateKey}
            habitStartDate={habit.startDate}
            habitEndDate={habit.endDate}
            isSelectedDateBeforeStart={isSelectedDateBeforeStart}
            isSelectedDateAfterEnd={isSelectedDateAfterEnd}
            isSelectedDateFuture={isSelectedDateFuture}
            isScheduledOnSelectedDate={isScheduledOnSelectedDate}
            isCompletedOnSelectedDate={isCompletedOnSelectedDate}
            onCheckIn={() => onToggleDate?.(habit)}
            onUndo={() => onToggleDate?.(habit)}
          />
        )}

        <MetricsGrid
          currentStreak={metrics.currentStreak}
          longestStreak={metrics.longestStreak}
          completionRate={metrics.completionRate}
        />

        <YearlyActivityCard
          days={streakDays}
          habitColor={habit.color}
          selectedYear={selectedYear}
          yearOptions={yearOptions}
          isLoading={isLoading}
          onYearChange={(year) => setSelectedYear(Number(year))}
        />
      </div>
    </div>
  );
};

const HabitDetailHeader = ({
  habit,
  isSelectedDateBeforeStart,
  isSelectedDateAfterEnd,
  isSelectedDateFuture,
  isScheduledOnSelectedDate,
  isCompletedOnSelectedDate,
  onComplete,
  onEdit,
  onDelete,
  onMarkIncomplete,
  onBack,
}) => (
  <header className="flex flex-col gap-4 border-b border-border bg-background px-5 py-4 sm:flex-row sm:items-start sm:justify-between xl:px-6">
    <div className="flex min-w-0 items-start gap-3 sm:flex-1">
      {onBack && (
        <Button
          variant="icon"
          size="sm"
          className="-ml-2 mt-0.5 h-8 w-8 shrink-0"
          icon={<ArrowLeft className="size-4" />}
          aria-label="Back to habits"
          onClick={onBack}
        />
      )}
      <div className="min-w-0">
        <div className="flex min-w-0 items-center gap-3">
          <span
            className="size-2.5 shrink-0 rounded-full"
            style={{ backgroundColor: getHabitColor(habit.color) }}
            aria-hidden="true"
          />
          <h1 className="truncate text-xl font-semibold text-foreground xl:text-2xl">
            {habit.name}
          </h1>
        </div>
        <HabitHeaderStatusLine habit={habit} />
      </div>
    </div>

    <div className="flex shrink-0 flex-wrap items-center gap-2 sm:w-auto sm:justify-end">
      {!habit.archivedAt && (
        <SelectedDateStatusBadge
          isSelectedDateBeforeStart={isSelectedDateBeforeStart}
          isSelectedDateAfterEnd={isSelectedDateAfterEnd}
          isSelectedDateFuture={isSelectedDateFuture}
          isScheduledOnSelectedDate={isScheduledOnSelectedDate}
          isCompletedOnSelectedDate={isCompletedOnSelectedDate}
        />
      )}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="h-9 shrink-0 px-3"
            icon={<ChevronDown className="size-3.5" />}
          >
            Options
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-48 border-border">
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => onEdit?.(habit)}
          >
            <Edit3 className="size-4" />
            Edit
          </DropdownMenuItem>
          {!habit.archivedAt && (
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => onComplete?.(habit)}
            >
              <CheckCheck className="size-4" />
              Complete habit
            </DropdownMenuItem>
          )}
          {habit.archivedAt && (
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => onMarkIncomplete?.(habit)}
            >
              <Undo2 className="size-4" />
              Mark as incomplete
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            variant="destructive"
            className="cursor-pointer"
            onClick={() => onDelete?.(habit)}
          >
            <Trash2 className="size-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </header>
);

const SelectedDateStatusBadge = ({
  isSelectedDateBeforeStart,
  isSelectedDateAfterEnd,
  isSelectedDateFuture,
  isScheduledOnSelectedDate,
  isCompletedOnSelectedDate,
}) => {
  const isOutsideTrackingRange =
    isSelectedDateBeforeStart || isSelectedDateAfterEnd;
  const isRestDay = !isOutsideTrackingRange && !isScheduledOnSelectedDate;
  const isCompleted =
    !isSelectedDateFuture &&
    isScheduledOnSelectedDate &&
    isCompletedOnSelectedDate;
  const isScheduledFuture = isSelectedDateFuture && isScheduledOnSelectedDate;
  let label = "Not checked in";

  if (isSelectedDateBeforeStart) label = "Not started";
  else if (isSelectedDateAfterEnd) label = "Ended";
  else if (isRestDay) label = "Rest day";
  else if (isScheduledFuture) label = "Scheduled";
  else if (isCompleted) label = "Checked in";

  return (
    <span
      className={cn(
        "inline-flex h-9 flex-1 items-center justify-center gap-1.5 rounded-full border px-3 text-sm font-medium sm:flex-none",
        isCompleted
          ? "border-emerald-500/25 bg-emerald-500/10 text-emerald-800 dark:text-emerald-400"
          : isRestDay || isOutsideTrackingRange || isScheduledFuture
            ? "border-border bg-muted/40 text-muted-foreground"
            : "border-border bg-muted/40 text-foreground",
      )}
      aria-live="polite"
    >
      {isCompleted && <Check className="size-4 shrink-0" aria-hidden="true" />}
      {isRestDay && <Moon className="size-4 shrink-0" aria-hidden="true" />}
      {label}
    </span>
  );
};

const HabitStatusPill = ({ habit }) => {
  const label = getHabitLifecycleStatusLabel(habit);
  const variant = habit.archivedAt
    ? "completed"
    : habit.isPaused
      ? "paused"
      : "active";

  const pillClassName =
    variant === "active"
      ? "border border-emerald-500/25 bg-emerald-500/10 text-emerald-800 dark:text-emerald-400"
      : variant === "completed"
        ? "border border-secondary/25 bg-secondary/10 text-[var(--warm-900)] dark:text-[var(--warm-400)]"
        : "border border-border bg-muted/40 text-muted-foreground";

  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        pillClassName,
      )}
    >
      {label}
    </span>
  );
};

const HabitHeaderStatusLine = ({ habit }) => (
  <p className="mt-2 flex min-w-0 flex-wrap items-center gap-x-1.5 gap-y-1.5 text-sm text-muted-foreground">
    <HabitStatusPill habit={habit} />
    <span aria-hidden="true">·</span>
    <span className="truncate">{getScheduleDescriptionLabel(habit)}</span>
  </p>
);

const SelectedDateActivityCard = ({
  selectedDateKey,
  habitStartDate,
  habitEndDate,
  isSelectedDateBeforeStart,
  isSelectedDateAfterEnd,
  isSelectedDateFuture,
  isScheduledOnSelectedDate,
  isCompletedOnSelectedDate,
  onCheckIn,
  onUndo,
}) => {
  const isOutsideTrackingRange =
    isSelectedDateBeforeStart || isSelectedDateAfterEnd;
  const isRestDay = !isOutsideTrackingRange && !isScheduledOnSelectedDate;
  const isCompleted =
    !isSelectedDateFuture &&
    isScheduledOnSelectedDate &&
    isCompletedOnSelectedDate;
  const isPending =
    !isSelectedDateFuture &&
    isScheduledOnSelectedDate &&
    !isCompletedOnSelectedDate;
  const isScheduledFuture = isSelectedDateFuture && isScheduledOnSelectedDate;
  const dateLabel = getSelectedDateActivityLabel(selectedDateKey);
  const dateReference = dateLabel.toLowerCase();
  const startDateReference = getDateSentenceReference(habitStartDate);
  const endDateReference = habitEndDate
    ? getDateSentenceReference(habitEndDate)
    : "";
  const statusTitle = isSelectedDateBeforeStart
    ? "Not started"
    : isSelectedDateAfterEnd
      ? "Tracking ended"
      : isRestDay
        ? "Rest day"
        : isScheduledFuture
          ? "Scheduled"
          : isCompleted
            ? "Checked in"
            : "Not checked in";
  const statusDescription = isSelectedDateBeforeStart
    ? `This habit starts ${startDateReference}, so ${dateReference} is outside its tracking range.`
    : isSelectedDateAfterEnd
      ? `This habit ended ${endDateReference}, so ${dateReference} is outside its tracking range.`
      : isRestDay
        ? `This habit isn’t scheduled for ${dateReference}, so your streak won’t be affected.`
        : isScheduledFuture
          ? `Future check-ins are disabled. Come back on ${dateReference} to check in.`
          : isCompleted
            ? `This habit was checked in for ${dateReference}.`
            : `This habit has not been checked in for ${dateReference}.`;

  return (
    <section
      className={cn(
        "w-full rounded-2xl border border-border p-5 shadow-xs xl:p-6",
        (isRestDay || isOutsideTrackingRange) && "border-dashed bg-muted/20",
        isCompleted && "bg-muted/25",
        (isPending || isScheduledFuture) && "bg-accent/30",
      )}
    >
      <div
        className={cn(
          "flex flex-col gap-4",
          (isCompleted || isPending) &&
            "sm:flex-row sm:items-center sm:justify-between",
        )}
      >
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-muted-foreground">
            {dateLabel}
          </p>
          <div className="mt-2 flex items-start gap-3">
            {isRestDay && (
              <span
                className="mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground"
                aria-hidden="true"
              >
                <Moon className="size-4" />
              </span>
            )}
            {isOutsideTrackingRange && (
              <span
                className="mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground"
                aria-hidden="true"
              >
                <CalendarCheck className="size-4" />
              </span>
            )}
            {isCompleted && (
              <span
                className="mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-400"
                aria-hidden="true"
              >
                <Check className="size-4" />
              </span>
            )}
            <div className="min-w-0">
              <p
                className={cn(
                  "text-base font-semibold",
                  isRestDay || isOutsideTrackingRange || isScheduledFuture
                    ? "text-muted-foreground"
                    : "text-foreground",
                )}
              >
                {statusTitle}
              </p>
              <p className="mt-1 text-sm leading-5 text-muted-foreground">
                {statusDescription}
              </p>
            </div>
          </div>
        </div>

        {isCompleted && (
          <div className="shrink-0 sm:pl-4">
            <Button
              variant="outline"
              size="sm"
              className="h-9 w-full border-border text-muted-foreground hover:bg-muted/60 hover:text-foreground sm:w-auto"
              icon={<Undo2 className="size-4" />}
              onClick={onUndo}
            >
              Undo
            </Button>
          </div>
        )}

        {isPending && (
          <div className="shrink-0 sm:pl-4">
            <Button
              size="sm"
              className="h-9 w-full px-4 sm:w-auto"
              icon={<Check className="size-4" />}
              onClick={onCheckIn}
            >
              Check in
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

const MetricsGrid = ({
  currentStreak,
  longestStreak,
  completionRate,
}) => (
  <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
    <MetricCard
      title="Current Streak"
      value={`${currentStreak} days`}
      description={
        currentStreak > 0
          ? "You’re building consistency"
          : "Start today to build momentum"
      }
      icon={<Flame className="size-5" />}
    />
    <MetricCard
      title="Longest Streak"
      value={`${longestStreak} days`}
      description={
        longestStreak > 0
          ? "Your personal best"
          : "Your first streak starts with one check-in"
      }
      icon={<Trophy className="size-5" />}
    />
    <MetricCard
      title="Completion Rate"
      value={`${completionRate}%`}
      description={
        completionRate > 0
          ? "Completed this month"
          : "No completions this month yet"
      }
      icon={<BadgeCheck className="size-5" />}
    />
  </section>
);

const MetricCard = ({
  title,
  value,
  description,
  icon,
}) => (
  <div
    className={cn(
      "relative flex min-h-40 flex-col rounded-2xl border border-border bg-card p-5 shadow-xs xl:p-6",
    )}
  >
    <div className="absolute right-5 top-5 inline-flex size-10 items-center justify-center rounded-xl bg-accent text-muted-foreground">
      {icon}
    </div>
    <div className="pr-10 text-sm font-medium text-muted-foreground">
      {title}
    </div>
    <div className="mt-auto">
      <div className="text-3xl font-semibold leading-none text-foreground">
        {value}
      </div>
      <div className="mt-2 text-sm leading-5 text-muted-foreground">
        {description}
      </div>
    </div>
  </div>
);

const YearlyActivityCard = ({
  days,
  habitColor,
  selectedYear,
  yearOptions,
  isLoading,
  onYearChange,
}) => {
  const { weeks, monthLabels } = useMemo(() => buildYearGrid(days), [days]);
  const weekCount = weeks.length || 53;
  const gridTemplateColumns = `repeat(${weekCount}, minmax(0.8rem, 1fr))`;
  const calendarMinWidth = `calc(2.25rem + (${weekCount} * 0.8rem) + ((${weekCount} - 1) * 0.25rem))`;

  return (
    <section className={ACTIVITY_CARD_CLASS_NAME}>
      <div className="mb-5 flex items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-foreground">
            Yearly Activity
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Your consistency across the year
          </p>
        </div>
        <Select
          value={String(selectedYear)}
          options={yearOptions}
          onChange={onYearChange}
          aria-label="Select activity year"
          className="h-9 w-28 bg-background px-3 py-1 xl:h-9 xl:px-3 xl:py-1"
          contentClassName="max-h-72"
        />
      </div>

      <div className="max-w-full overflow-x-auto pb-2">
        <div
          className="grid grid-cols-[2.25rem_minmax(0,1fr)] gap-x-2"
          style={{
            minWidth: calendarMinWidth,
          }}
          aria-label={`Habit streak for ${selectedYear}`}
        >
          <div aria-hidden="true" />
          <div
            className="grid h-5 gap-x-1"
            style={{
              gridTemplateColumns,
            }}
            aria-hidden="true"
          >
            {monthLabels.map((label, index) => (
              <div
                key={`${label}-${index}`}
                className="min-w-0 whitespace-nowrap text-xs font-medium leading-none text-muted-foreground"
              >
                {label}
              </div>
            ))}
          </div>

          <div className="grid gap-y-1 py-px text-xs font-medium text-muted-foreground">
            {WEEKDAY_LABELS.map((label, index) => (
              <div key={label} className="flex h-3.5 items-center">
                {index % 2 === 1 ? label.slice(0, 3) : ""}
              </div>
            ))}
          </div>

          <div
            className="grid gap-x-1"
            style={{
              gridTemplateColumns,
            }}
          >
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="grid gap-y-1">
                {week.map((day, dayIndex) => {
                  if (!day) {
                    return (
                      <span
                        key={`empty-${weekIndex}-${dayIndex}`}
                        className="aspect-square w-full min-w-3.5"
                        aria-hidden="true"
                      />
                    );
                  }

                  return isLoading ? (
                    <Skeleton
                      key={day.dateKey}
                      className="aspect-square w-full min-w-3.5 rounded-[3px]"
                    />
                  ) : (
                    <StreakDayCell
                      key={day.dateKey}
                      day={day}
                      habitColor={habitColor}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
      <HeatmapLegend habitColor={habitColor} />
    </section>
  );
};

const HeatmapLegend = ({ habitColor }) => (
  <div className="mt-4 flex flex-wrap items-center justify-end gap-x-4 gap-y-2 text-xs text-muted-foreground">
    <LegendItem className="bg-accent" label="Not scheduled" />
    <LegendItem
      className="bg-primary/10"
      label="Scheduled"
      style={{ backgroundColor: getScheduledHabitColor(habitColor) }}
    />
    <LegendItem
      className="bg-primary/25"
      label="Missed"
      style={{ backgroundColor: getMissedHabitColor(habitColor) }}
    />
    <LegendItem
      className="bg-primary"
      label="Completed"
      style={{ backgroundColor: getHabitColor(habitColor) }}
    />
  </div>
);

const LegendItem = ({ className, label, style }) => (
  <span className="inline-flex items-center gap-1.5">
    <span
      className={cn("size-3 rounded-[3px]", className)}
      style={style}
      aria-hidden="true"
    />
    <span>{label}</span>
  </span>
);

const StreakDayCell = ({ day, habitColor }) => {
  const label = getStreakDayAriaLabel(day);
  const customColorStyle = getCustomStreakColorStyle(day, habitColor);
  const cell = (
    <span
      role="img"
      aria-label={label}
      className={cn(
        "block aspect-square w-full min-w-3.5 rounded-[3px] transition-colors",
        day.isCompleted
          ? "bg-primary"
          : day.isDue
              ? day.isFuture
                ? "bg-primary/10"
                : "bg-primary/25"
            : "bg-accent",
      )}
      style={customColorStyle}
    />
  );

  if (!day.isDue && !day.isCompleted) return cell;

  return <Tooltip content={label} contentClassName="hidden lg:block">{cell}</Tooltip>;
};

const getCustomStreakColorStyle = (day, habitColor) => {
  if (day.isCompleted) {
    return {
      backgroundColor: getHabitColor(habitColor),
    };
  }

  if (day.isDue) {
    return {
      backgroundColor: day.isFuture
        ? getScheduledHabitColor(habitColor)
        : getMissedHabitColor(habitColor),
    };
  }

  return undefined;
};

const getScheduledHabitColor = (habitColor) =>
  `color-mix(in srgb, ${getHabitColor(habitColor)} 10%, transparent)`;

const getMissedHabitColor = (habitColor) =>
  `color-mix(in srgb, ${getHabitColor(habitColor)} 25%, transparent)`;

const buildYearGrid = (days) => {
  if (days.length === 0) {
    return {
      weeks: [],
      monthLabels: [],
    };
  }

  const gridStart = days[0].date.startOf("week");
  const leadingEmptyDays = days[0].date.diff(gridStart, "day");
  const cells = [
    ...Array.from({ length: leadingEmptyDays }, () => null),
    ...days,
  ];
  const weeks = [];

  for (let index = 0; index < cells.length; index += 7) {
    const week = cells.slice(index, index + 7);
    weeks.push(
      week.length === 7
        ? week
        : [...week, ...Array.from({ length: 7 - week.length }, () => null)],
    );
  }

  return {
    weeks,
    monthLabels: weeks.map((week, index) => {
      const firstOfMonth = week.find((day) => day?.date.date() === 1);
      if (firstOfMonth) return firstOfMonth.date.format("MMM");
      if (index === 0) return days[0].date.format("MMM");
      return "";
    }),
  };
};

const getStreakDayAriaLabel = (day) => {
  const dateLabel = dayjs(day.date).format("MMM D, YYYY");
  if (day.isCompleted) return `${dateLabel}: completed`;
  if (day.isDue && day.date.isSame(dayjs(), "day")) {
    return `${dateLabel}: due today`;
  }
  if (day.isFuture && day.isDue) return `${dateLabel}: scheduled`;
  if (day.isDue) return `${dateLabel}: missed`;
  return `${dateLabel}: Not scheduled`;
};

const getScheduleDescriptionLabel = (habit) => {
  const endLabel = habit.endDate
    ? ` · Ends ${dayjs(habit.endDate).format("MMM D")}`
    : "";

  if (habit.repeatMode === "custom_days") return `Custom schedule${endLabel}`;

  if (habit.repeatMode === "daily") return `Scheduled daily${endLabel}`;
  if (habit.repeatMode === "weekdays") {
    return `Scheduled on weekdays${endLabel}`;
  }
  if (habit.repeatMode === "weekly_count" && habit.weeklyTargetCount) {
    return `Scheduled ${habit.weeklyTargetCount}x per week${endLabel}`;
  }

  const frequency = getFrequencyLabel(habit).toLowerCase();
  return `Scheduled ${frequency}${endLabel}`;
};

const getSelectedDateActivityLabel = (dateKey) => {
  const date = dayjs(dateKey).startOf("day");
  const today = dayjs().startOf("day");

  if (date.isSame(today, "day")) return "Today";
  if (date.isSame(today.subtract(1, "day"), "day")) return "Yesterday";
  if (date.isSame(today.add(1, "day"), "day")) return "Tomorrow";

  return date.year() === today.year()
    ? date.format("MMM D")
    : date.format("MMM D, YYYY");
};

const getDateSentenceReference = (dateKey) => {
  const label = getSelectedDateActivityLabel(dateKey);

  if (["Today", "Yesterday", "Tomorrow"].includes(label)) {
    return label.toLowerCase();
  }

  return `on ${label}`;
};

const getHabitLifecycleStatusLabel = (habit) => {
  if (habit.archivedAt) return "Completed";
  if (habit.isPaused) return "Paused";
  return "Active";
};

export default HabitDetailPlaceholder;
