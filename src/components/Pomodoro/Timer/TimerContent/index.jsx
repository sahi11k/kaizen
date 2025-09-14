import React, { useState, useEffect, useRef } from "react";
import HourglassOutline from "@/assets/icons/hourglass-outline.svg?react";
import HourglassFilled from "@/assets/icons/hourglass-filled.svg?react";
import HourglassHalf from "@/assets/icons/hourglass-half.svg?react";

import { useGetTimerValue, getCurrentTime } from "@/hooks/useGetTimerValue";
import useTasksStore from "@/store/tasks";
import { useShallow } from "zustand/react/shallow";
import { updateTask } from "@/db/apis/tasks";
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
  const { currentTask, updateTaskInStore, setCurrentTask } = useTasksStore(
    useShallow((state) => ({
      currentTask: state.currentTask,
      updateTaskInStore: state.updateTask,
      setCurrentTask: state.setCurrentTask,
    }))
  );

  const [currentTab, setCurrentTab] = useState(POMODORO_TAB);
  const [timerStarted, setTimerStarted] = useState(false);
  const [pomodoroCount, setPomodoroCount] = useState(0);
  const intervalRef = useRef(null);

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

  const handleTabChange = (key) => {
    setCurrentTab(key);
    clearTimerInterval();
  };

  const handleTimerComplete = () => {
    goToNextPhase(true);
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

      const res = await updateTask(
        {
          id: currentTask.id,
          completedSessions,
          completed: completedSessions === currentTask.totalSessions,
          timeSpent: currentTask.timeSpent + duration / 60,
        },
        user.id
      );
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
          <TabsList className="w-full h-12 cursor-pointer">
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
                />
              </TabsContent>
            ))}
          </>
        </Tabs>
      </div>
      {currentTask && (
        <div className="mx-auto bg-muted py-4 px-6 rounded-lg !max-w-[100%] md:!max-w-[50%]">
          <div className="flex items-center justify-center gap-2 font-semibold">
            {currentTab === POMODORO_TAB ? (
              <>
                <span className="text-muted-foreground shrink-0">
                  Session #{currentTask.completedSessions + 1} :
                </span>
                <span className="whitespace-nowrap overflow-hidden text-ellipsis">
                  {currentTask.title}
                </span>
              </>
            ) : (
              <span className="text-muted-foreground">Yay! Break Time</span>
            )}
          </div>
        </div>
      )}
      <div className="flex justify-center items-center gap-6 relative py-2 lg:py-4">
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
              {timerStarted ? "Pause" : "Focus"}
            </span>
          </Button>
        </Tooltip>
        <PomoSettings />
      </div>
    </>
  );
};

const TabContent = ({ timerValue, duration, currentTab }) => {
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
    <div className="flex justify-center items-center h-full">
      <div className="w-80 h-80 md:w-[min(40vw,400px)] md:h-[min(40vw,400px)] relative">
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: `conic-gradient(${fillColor} ${percentage}%, ${unfilledColor} ${percentage}% 100%)`,
          }}
        />

        <div className="absolute inset-4 bg-background rounded-full flex justify-center items-center font-mono heading-1">
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
