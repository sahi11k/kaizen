import React, { useState } from "react";
import dayjs from "dayjs";
import { CalendarCheck, Plus } from "lucide-react";

import HabitListItem from "@/features/habits/components/HabitListItem";
import {
  HABIT_TARGET_TYPES,
  useCompleteHabitMutation,
  useHabitEntriesForDateQuery,
  useHabitsQuery,
  useUncompleteHabitMutation,
} from "@/features/habits";
import {
  getTodayDateKey,
  getNextHabitDueDate,
  isHabitDueForDate,
  isHabitCompletedForDate,
} from "@/features/habits/utils";
import { useAuthStore } from "@/features/auth";
import {
  Button,
  DatePicker,
  EmptyState,
  FloatingButton,
  SectionedList,
  Skeleton,
  Tabs,
  TabsList,
  TabsTrigger,
  Tooltip,
  Toast,
} from "@/shared/ui";

const { toast } = Toast;
const HABIT_TABS = {
  ACTIVE: "active",
  COMPLETED: "completed",
};

const HabitList = ({
  showHeader = true,
  selectedHabitId,
  onHabitSelect,
  onCreateHabit,
  onEditHabit,
  onDeleteHabit,
}) => {
  const { user } = useAuthStore();
  const [selectedDateKey, setSelectedDateKey] = useState(getTodayDateKey());
  const [activeTab, setActiveTab] = useState(HABIT_TABS.ACTIVE);
  const isActiveTab = activeTab === HABIT_TABS.ACTIVE;
  const isCompletedTab = activeTab === HABIT_TABS.COMPLETED;
  const {
    data: activeHabits = [],
    isLoading: isActiveLoading,
    isError: isActiveError,
  } = useHabitsQuery(user?.id, HABIT_TABS.ACTIVE);
  const {
    data: completedHabits = [],
    isLoading: isCompletedLoading,
    isError: isCompletedError,
  } = useHabitsQuery(user?.id, HABIT_TABS.COMPLETED, isCompletedTab);
  const { data: selectedDateEntries = [] } = useHabitEntriesForDateQuery(
    user?.id,
    selectedDateKey,
  );
  const habits = isCompletedTab ? completedHabits : activeHabits;

  const { mutate: completeHabit } = useCompleteHabitMutation();
  const { mutate: uncompleteHabit } = useUncompleteHabitMutation();

  const isLoading = isCompletedTab ? isCompletedLoading : isActiveLoading;
  const isError = isCompletedTab ? isCompletedError : isActiveError;
  const isEmpty = habits.length === 0;
  const showTodayReset = selectedDateKey !== getTodayDateKey();
  const selectedDateLabel = showTodayReset
    ? dayjs(selectedDateKey).format("MMM D")
    : "today";
  const dueActiveHabits = habits.filter((habit) =>
    isHabitDueForDate(habit, selectedDateKey),
  );
  const pendingHabits = dueActiveHabits.filter(
    (habit) =>
      !isHabitCompletedForDate(habit.id, selectedDateEntries, selectedDateKey),
  );
  const doneHabits = dueActiveHabits.filter((habit) =>
    isHabitCompletedForDate(habit.id, selectedDateEntries, selectedDateKey),
  );
  const pendingHabitIds = new Set(pendingHabits.map((habit) => habit.id));
  const doneHabitIds = new Set(doneHabits.map((habit) => habit.id));
  const upcomingHabits = [...habits]
    .filter(
      (habit) => !pendingHabitIds.has(habit.id) && !doneHabitIds.has(habit.id),
    )
    .sort((firstHabit, secondHabit) => {
      const firstCompleted = isHabitCompletedForDate(
        firstHabit.id,
        selectedDateEntries,
        selectedDateKey,
      );
      const secondCompleted = isHabitCompletedForDate(
        secondHabit.id,
        selectedDateEntries,
        selectedDateKey,
      );
      const firstDueDate =
        getNextHabitDueDate(firstHabit, selectedDateKey, firstCompleted) ??
        "9999-12-31";
      const secondDueDate =
        getNextHabitDueDate(secondHabit, selectedDateKey, secondCompleted) ??
        "9999-12-31";

      return firstDueDate.localeCompare(secondDueDate);
    });

  const handleCompleteToggle = (habit) => {
    if (!user?.id) {
      toast.error("User authentication required");
      return;
    }

    const entryDate = selectedDateKey;
    const completed = isHabitCompletedForDate(
      habit.id,
      selectedDateEntries,
      selectedDateKey,
    );

    if (completed) {
      uncompleteHabit(
        { payload: { habitId: habit.id, entryDate }, userId: user.id },
        { onError: () => toast.error("Could not update habit") },
      );
      return;
    }

    const progressValue =
      habit.targetType === HABIT_TARGET_TYPES.NUMERIC
        ? Number(habit.targetValue ?? 1)
        : 1;

    completeHabit(
      {
        payload: { habitId: habit.id, entryDate, progressValue },
        userId: user.id,
      },
      { onError: () => toast.error("Could not update habit") },
    );
  };

  const renderHabitItem = (habit) => (
    <HabitListItem
      key={habit.id}
      habit={habit}
      entries={selectedDateEntries}
      dateKey={selectedDateKey}
      streakCount={habit.currentStreak ?? 0}
      isActive={selectedHabitId === habit.id}
      isLifecycleCompleted={!!habit.archivedAt}
      onClick={() => onHabitSelect?.(habit)}
      onEdit={() => onEditHabit?.(habit)}
      onDelete={() => onDeleteHabit?.(habit)}
      onCompleteToggle={() => handleCompleteToggle(habit)}
    />
  );

  const renderUpcomingHabitItem = (habit) => (
    <HabitListItem
      key={habit.id}
      habit={habit}
      entries={selectedDateEntries}
      dateKey={selectedDateKey}
      streakCount={habit.currentStreak ?? 0}
      isActive={selectedHabitId === habit.id}
      isLifecycleCompleted={!!habit.archivedAt}
      isMuted
      canCompleteOverride={false}
      disabledCompleteTooltip="Only today's habits can be checked off"
      onClick={() => onHabitSelect?.(habit)}
      onEdit={() => onEditHabit?.(habit)}
      onDelete={() => onDeleteHabit?.(habit)}
    />
  );

  const sections = [
    ...(isActiveTab
      ? [
          {
            key: "pending",
            label: `Pending ${selectedDateLabel} (${pendingHabits.length})`,
            content:
              pendingHabits.length === 0 ? (
                <li className="list-none px-2 py-2 text-sm text-muted-foreground">
                  No pending habits for this date.
                </li>
              ) : (
                pendingHabits.map(renderHabitItem)
              ),
          },
        ]
      : []),
    ...(isActiveTab
      ? [
          {
            key: "done",
            label: `Done ${selectedDateLabel} (${doneHabits.length})`,
            content:
              doneHabits.length === 0 ? (
                <li className="list-none px-2 py-2 text-sm text-muted-foreground">
                  No completed habits for this date.
                </li>
              ) : (
                doneHabits.map(renderHabitItem)
              ),
          },
        ]
      : []),
    ...(isActiveTab
      ? [
          {
            key: "upcoming",
            label: `Upcoming (${upcomingHabits.length})`,
            content:
              upcomingHabits.length === 0 ? (
                <li className="list-none px-2 py-2 text-sm text-muted-foreground">
                  No upcoming habits.
                </li>
              ) : (
                upcomingHabits.map(renderUpcomingHabitItem)
              ),
          },
        ]
      : []),
  ];

  const habitTabs = (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="gap-0">
      <TabsList className="h-auto w-full justify-start gap-6 rounded-none border-b border-border bg-transparent px-4 pt-0 pb-1 xl:px-6">
        <TabsTrigger
          value={HABIT_TABS.ACTIVE}
          className="relative h-10 flex-none rounded-none border-0 px-0 py-0 shadow-none data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:absolute data-[state=active]:after:bottom-[-1px] data-[state=active]:after:left-0 data-[state=active]:after:h-0.5 data-[state=active]:after:w-full data-[state=active]:after:bg-primary"
        >
          Active
        </TabsTrigger>
        <TabsTrigger
          value={HABIT_TABS.COMPLETED}
          className="relative h-10 flex-none rounded-none border-0 px-0 py-0 shadow-none data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:absolute data-[state=active]:after:bottom-[-1px] data-[state=active]:after:left-0 data-[state=active]:after:h-0.5 data-[state=active]:after:w-full data-[state=active]:after:bg-primary"
        >
          Completed
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );

  const activeDatePicker = (
    <div className="flex items-center justify-between gap-3 px-4 py-3 xl:px-6">
      <div className="w-16 shrink-0">
        {showTodayReset && (
          <Button
            variant="link"
            className="!h-auto !px-0 !py-0 text-sm leading-none"
            onClick={() => setSelectedDateKey(getTodayDateKey())}
          >
            Reset
          </Button>
        )}
      </div>
      <DatePicker
        defaultDate={selectedDateKey}
        onDateChange={(date) =>
          setSelectedDateKey(dayjs(date).format("YYYY-MM-DD"))
        }
        format="dddd, MMM D"
        showIcon
        triggerClassName="!h-auto !w-40 shrink-0 !justify-end !gap-1 !border-0 !bg-transparent !px-0 !py-0 text-right !text-[14px] font-medium whitespace-nowrap text-muted-foreground shadow-none hover:!bg-transparent hover:text-primary lg:!text-[14px] [&_svg]:size-3.5"
        align="start"
        tooltip="Select habit date"
        tooltipAlign="center"
        tooltipSide="top"
      />
    </div>
  );

  return (
    <div className="flex h-full min-h-0 flex-col">
      {showHeader && (
        <div className="mt-4 hidden items-center justify-between px-4 pb-2 md:flex xl:mt-6 xl:px-6 xl:pb-4">
          <span className="heading-3">Habits</span>
          <div className="flex items-center gap-2">
            <Tooltip content="Add habit">
              <Button
                icon={<Plus className="size-4" />}
                size="sm"
                onClick={onCreateHabit}
              >
                Habit
              </Button>
            </Tooltip>
          </div>
        </div>
      )}

      {!showHeader && (
        <div className="flex h-16 items-center justify-between border-b border-border px-4 md:hidden">
          <h1 className="heading-3">Habits</h1>
        </div>
      )}

      {habitTabs}
      {isActiveTab && activeDatePicker}

      <div
        className={
          showHeader
            ? "min-h-0 flex-1 overflow-y-auto"
            : "min-h-0 flex-1 overflow-y-auto"
        }
      >
        {isLoading && isEmpty && (
          <div className="m-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton key={index} className="mb-2 h-20 w-full rounded-lg" />
            ))}
          </div>
        )}

        {isError && !isLoading && (
          <EmptyState
            icon={<CalendarCheck className="size-8" />}
            title="Could not load habits"
            description="Try refreshing the page."
          />
        )}

        {isEmpty && !isLoading && !isError && (
          <EmptyState
            icon={<CalendarCheck className="size-8" />}
            title={isCompletedTab ? "No completed habits yet" : "No Habits"}
            description={
              isActiveTab
                ? "Add a habit to start tracking consistency."
                : undefined
            }
          />
        )}

        {!isEmpty && !isError && isActiveTab && (
          <SectionedList sections={sections} />
        )}

        {!isEmpty && !isError && isCompletedTab && (
          <ul className="m-2 flex flex-col gap-2" role="listbox">
            {habits.map(renderHabitItem)}
          </ul>
        )}
      </div>

      <FloatingButton
        onClick={onCreateHabit}
        className="md:hidden"
        icon={<Plus className="size-4" />}
        label="Habit"
      />
    </div>
  );
};

export default HabitList;
