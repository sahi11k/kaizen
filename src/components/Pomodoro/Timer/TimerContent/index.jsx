import React, { useState, useEffect, useRef } from "react";
import HourglassOutline from "@/assets/icons/hourglass-outline.svg?react";
import HourglassFilled from "@/assets/icons/hourglass-filled.svg?react";
import HourglassHalf from "@/assets/icons/hourglass-half.svg?react";

import { useGetTimerValue, getCurrentTime } from "@/hooks/useGetTimerValue";
import useTasksStore from "@/store/tasks";
import { useShallow } from "zustand/react/shallow";
import { addTaskSession, updateTask } from "@/db/apis/tasks";
import useAuthStore from "@/store/auth";

import { Button } from "@/components/ui/button";
import { TIMER_CONSTANTS } from "@/constants/pomodoro";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, Square, TimerResetIcon } from "lucide-react";
import { getLongBreakInterval, getTimerDurations } from "@/utils/timer";
import PomoSettings from "@/components/Pomodoro/PomoSettings";
import { Tooltip } from "@/components/ui/tooltip";

const { POMODORO_TAB, SHORT_BREAK_TAB, LONG_BREAK_TAB } = TIMER_CONSTANTS;

const TABS = [
  {
    key: POMODORO_TAB,
    label: "Pomodoro",
    icon: (
      <HourglassFilled className="size-5 mr-1 hidden sm:block fill-current" />
    ),
  },
  {
    key: SHORT_BREAK_TAB,
    label: "Short Break",
    icon: (
      <HourglassHalf className="size-5 mr-1 hidden sm:block fill-current" />
    ),
  },
  {
    key: LONG_BREAK_TAB,
    label: "Long Break",
    icon: (
      <HourglassOutline className="size-5 mr-1 hidden sm:block fill-current" />
    ),
  },
];

const TimerContent = () => {
  const { user, userSettings } = useAuthStore();
  const {
    currentTask,
    updateTaskInStore,
    setCurrentTask,
    taskSessions,
    setTaskSessions,
  } = useTasksStore(
    useShallow((state) => ({
      currentTask: state.currentTask,
      updateTaskInStore: state.updateTask,
      setCurrentTask: state.setCurrentTask,
      taskSessions: state.taskSessions,
      setTaskSessions: state.setTaskSessions,
    }))
  );

  const [currentTab, setCurrentTab] = useState(POMODORO_TAB);
  const [timerStarted, setTimerStarted] = useState(false);
  const [pomodoroCount, setPomodoroCount] = useState(0);
  const intervalRef = useRef(null);
  const completingRef = useRef(false);

  const [timerValue, setTimerValue] = useGetTimerValue({
    activeTab: currentTab,
    userSettings,
  });

  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const { taskTime, shortBreakTime, longBreakTime } =
      getTimerDurations(userSettings);

    setDuration(
      currentTab === POMODORO_TAB
        ? taskTime
        : currentTab === SHORT_BREAK_TAB
        ? shortBreakTime
        : longBreakTime
    );
  }, [currentTab, userSettings]);

  useEffect(() => {
    const { minutes, seconds } = getFormattedTime(timerValue);
    const titlePrefix =
      currentTab === POMODORO_TAB
        ? "Pomodoro"
        : currentTab === SHORT_BREAK_TAB
        ? "Short Break"
        : "Long Break";
    document.title = `${titlePrefix} : ${minutes}:${seconds}`;
  }, [currentTab, timerValue]);

  const startTimer = () => {
    if (timerStarted) return;
    intervalRef.current = setInterval(() => {
      setTimerValue((prev) => {
        if (prev <= 0) {
          handleTimerComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    setTimerStarted(true);
  };

  const stopTimer = () => {
    clearTimerInterval();
  };

  const clearTimerInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setTimerStarted(false);
  };

  const resetTimer = () => {
    clearTimerInterval();
    setTimerValue(getCurrentTime(currentTab, userSettings));
  };

  useEffect(() => {
    if (!currentTask) return;
    resetTimer();
  }, [currentTask?.id]);

  const handleTabChange = (key) => {
    setCurrentTab(key);
    clearTimerInterval();
  };

  const handleTimerComplete = async () => {
    if (completingRef.current) return;
    completingRef.current = true;
    clearTimerInterval();
    await goToNextPhase(true);
    completingRef.current = false;
  };

  const getNextTab = (tabKey) => {
    if (tabKey === POMODORO_TAB) {
      const nextCount = pomodoroCount + 1;
      const longBreakInterval = getLongBreakInterval(userSettings);
      return nextCount > 0 && nextCount % longBreakInterval === 0
        ? LONG_BREAK_TAB
        : SHORT_BREAK_TAB;
    }
    // From any break, go back to Pomodoro
    return POMODORO_TAB;
  };

  const goToNextPhase = async (shouldFinishSession) => {
    if (shouldFinishSession && currentTab === POMODORO_TAB) {
      await finishSession();
    }
    const next = getNextTab(currentTab);
    handleTabChange(next);
  };

  const finishSession = async () => {
    if (currentTab !== POMODORO_TAB) return;

    setPomodoroCount((prev) => prev + 1);

    if (currentTask && user?.id) {
      const completedSessions = currentTask.completedSessions + 1;
      const completed = completedSessions === currentTask.totalSessions;

      const res = await updateTask(
        {
          id: currentTask.id,
          completedSessions,
          completed,
          timeSpent: currentTask.timeSpent + duration / 60,
        },
        user.id
      );
      const sessionRes = await addTaskSession(
        {
          task_id: currentTask.id,
          duration: duration / 60,
          status: completed,
        },
        user.id
      );

      if (!sessionRes.error) {
        setTaskSessions([...taskSessions, ...sessionRes.data]);
      }

      if (res.error) {
        console.error("Failed to update task:", res.error);
      } else {
        updateTaskInStore(res.data[0]);
        setCurrentTask(res.data[0]);
      }
    }
  };

  return (
    <>
      <div className="flex-1">
        <Tabs
          defaultValue={POMODORO_TAB}
          value={currentTab}
          onValueChange={handleTabChange}
          className="h-full"
        >
          <TabsList className="w-full h-12">
            {TABS.map((tab) => (
              <TabsTrigger
                key={tab.key}
                value={tab.key}
                className="cursor-pointer text-sm xl:text-base"
              >
                {tab.icon}
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          <>
            {TABS.map((tab) => (
              <TabsContent key={tab.key} value={tab.key}>
                <TabContent
                  timerValue={timerValue}
                  duration={duration}
                  currentTab={currentTab}
                  currentTask={currentTask}
                />
              </TabsContent>
            ))}
          </>
        </Tabs>
      </div>
      <div className="flex justify-center items-center gap-6 relative rounded-full w-fit mx-auto px-6 py-2 pb-6 md:pb-2">
        <Tooltip content="Reset Timer">
          <Button
            onClick={resetTimer}
            icon={<TimerResetIcon />}
            className="rounded-full w-12 !h-12"
            variant="icon"
            aria-label="Reset Timer"
          />
        </Tooltip>
        <Tooltip content={timerStarted ? "Pause Timer" : "Start Timer"}>
          <Button
            onClick={timerStarted ? stopTimer : startTimer}
            icon={
              timerStarted ? (
                <Square className="size-4 text-secondary" fill="currentColor" />
              ) : (
                <Play className="size-4 text-secondary" fill="currentColor" />
              )
            }
            className="rounded-full !h-16 !min-w-16 sm:!px-8 text-base"
          >
            <span className="hidden sm:block">
              {timerStarted ? "Pause" : "Start"}
            </span>
          </Button>
        </Tooltip>
        <PomoSettings />
      </div>
    </>
  );
};

const TabContent = ({ timerValue, duration, currentTab, currentTask }) => {
  const percentage = ((duration - timerValue) / duration) * 100;
  const fillColor =
    currentTab === POMODORO_TAB
      ? "var(--color-pomodoro-filled)"
      : "var(--color-break-filled)";
  const unfilledColor =
    currentTab === POMODORO_TAB
      ? "var(--color-pomodoro-unfilled)"
      : "var(--color-break-unfilled)";

  const { minutes, seconds } = getFormattedTime(timerValue);

  return (
    <div className="flex justify-center items-center h-full flex-col gap-16">
      <div className="mx-auto bg-muted py-2 px-6 rounded-full max-w-100">
        <div className="flex items-center justify-center gap-2 font-semibold">
          {currentTab === POMODORO_TAB ? (
            <>
              <span className="text-muted-foreground shrink-0">
                {currentTask
                  ? `Session #${currentTask?.completedSessions + 1} : `
                  : ""}
              </span>
              <span className="whitespace-nowrap overflow-hidden text-ellipsis">
                {currentTask?.title || "Focus Time!"}
              </span>
            </>
          ) : (
            <span>Yay! Break Time</span>
          )}
        </div>
      </div>

      <div className="w-80 h-80 md:h-88 md:w-88 xl:h-96 xl:w-96 relative">
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: `conic-gradient(${fillColor} ${percentage}%, ${unfilledColor} ${percentage}% 100%)`,
          }}
        />

        <div className="absolute inset-4 bg-background rounded-full flex justify-center items-center font-bold text-5xl xl:text-6xl">
          <span>{minutes}</span>
          <span className="vertical-line">:</span>
          <span>{seconds}</span>
        </div>
      </div>
    </div>
  );
};

const getFormattedTime = (seconds) => {
  const minutes = String(Math.floor(seconds / 60)).padStart(2, "0");
  const remainingSeconds = String(seconds % 60).padStart(2, "0");
  return {
    minutes,
    seconds: remainingSeconds,
  };
};

export default TimerContent;
