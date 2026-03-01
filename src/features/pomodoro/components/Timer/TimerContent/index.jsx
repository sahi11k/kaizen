import React, { useEffect, useRef } from "react";
import HourglassOutline from "@/assets/icons/hourglass-outline.svg?react";
import HourglassFilled from "@/assets/icons/hourglass-filled.svg?react";
import HourglassHalf from "@/assets/icons/hourglass-half.svg?react";

import {
  getCurrentTime,
  getFormattedTime,
  openPipWindow,
  isPipSupported,
} from "@/features/pomodoro/helpers";
import { useSound } from "@/features/pomodoro/hooks";
import { useTimerStore, useTasksStore } from "@/features/pomodoro/store";
import { useAuthStore } from "@/features/auth";
import { useTasksQuery } from "@/features/pomodoro/services/queries";
import { useUserSettingsQuery } from "@/features/settings";

import { Button } from "@/shared/ui/button";
import { TIMER_CONSTANTS } from "@/features/pomodoro/constants";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { Play, Square, TimerResetIcon, PictureInPicture2 } from "lucide-react";
import PomoSettings from "@/features/pomodoro/components/PomoSettings";
import { Tooltip } from "@/shared/ui/tooltip";

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
  const user = useAuthStore((s) => s.user);
  const { data: userSettings } = useUserSettingsQuery(user?.id);
  const currentTask = useTasksStore((s) => s.currentTask);

  const timerValue = useTimerStore((s) => s.timerValue);
  const timerStarted = useTimerStore((s) => s.timerStarted);
  const currentTab = useTimerStore((s) => s.currentTab);
  const duration = useTimerStore((s) => s.duration);
  const timerTaskId = useTimerStore((s) => s.timerTaskId);
  const startTimer = useTimerStore((s) => s.startTimer);
  const stopTimer = useTimerStore((s) => s.stopTimer);
  const resetTimer = useTimerStore((s) => s.resetTimer);
  const setTab = useTimerStore((s) => s.setTab);
  const setTimerValue = useTimerStore((s) => s.setTimerValue);

  const { data: tasks = [] } = useTasksQuery(user?.id);
  const timerTask = timerTaskId
    ? (tasks.find((t) => t.id === timerTaskId) ?? currentTask)
    : currentTask;

  // Play "timerStart" sound only on false → true transition (not on mount/navigation)
  const { play } = useSound();
  const prevStartedRef = useRef(timerStarted);

  useEffect(() => {
    if (timerStarted && !prevStartedRef.current) {
      play("timerStart");
    }
    prevStartedRef.current = timerStarted;
  }, [timerStarted, play]);

  // Initialize / sync timer value from user settings (only when not running)
  useEffect(() => {
    const { timerStarted, currentTab } = useTimerStore.getState();
    if (!timerStarted) {
      const value = getCurrentTime(currentTab, userSettings);
      setTimerValue(value);
    }
  }, [userSettings, setTimerValue]);

  // Reset timer when selected task changes (skip on initial mount/remount)
  const prevTaskIdRef = useRef(currentTask?.id);
  useEffect(() => {
    if (prevTaskIdRef.current === currentTask?.id) return;
    prevTaskIdRef.current = currentTask?.id;
    const { currentTab } = useTimerStore.getState();
    const value = getCurrentTime(currentTab, userSettings);
    resetTimer(value);
  }, [currentTask?.id]);

  const handleTabChange = (key) => {
    const value = getCurrentTime(key, userSettings);
    setTab(key, value);
  };

  const handleResetTimer = () => {
    const value = getCurrentTime(currentTab, userSettings);
    resetTimer(value);
  };

  return (
    <>
      <Tabs
        defaultValue={POMODORO_TAB}
        value={currentTab}
        onValueChange={handleTabChange}
        className="flex-1"
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
            <TabsContent
              key={tab.key}
              value={tab.key}
              className="flex justify-center items-center flex-col gap-6 xl:gap-12"
            >
              <TabContent
                timerValue={timerValue}
                duration={duration}
                currentTab={currentTab}
                currentTask={timerTask}
              />
            </TabsContent>
          ))}
        </>
      </Tabs>
      <div className="flex justify-center items-center gap-6 relative rounded-full w-fit mx-auto px-6">
        <Tooltip content="Reset Timer">
          <Button
            onClick={handleResetTimer}
            icon={<TimerResetIcon />}
            className="rounded-full w-12 !h-12"
            variant="icon"
            aria-label="Reset Timer"
          />
        </Tooltip>
        <Tooltip content={timerStarted ? "Pause Timer" : "Start Timer"}>
          <Button
            onClick={
              timerStarted ? stopTimer : () => startTimer(currentTask?.id)
            }
            icon={
              timerStarted ? (
                <Square className="size-4" fill="currentColor" />
              ) : (
                <Play className="size-4" fill="currentColor" />
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
        {isPipSupported() && (
          <div className="hidden md:block absolute right-0 translate-x-full pl-6">
            <Tooltip content="Floating Timer">
              <Button
                onClick={openPipWindow}
                icon={<PictureInPicture2 />}
                className="rounded-full w-12 !h-12"
                variant="icon"
                aria-label="Floating Timer"
              />
            </Tooltip>
          </div>
        )}
      </div>
    </>
  );
};

const TabContent = ({ timerValue, duration, currentTab, currentTask }) => {
  const percentage = ((duration - timerValue) / duration) * 100;
  const fillColor =
    currentTab === POMODORO_TAB
      ? "var(--pomodoro-filled)"
      : "var(--break-filled)";
  const unfilledColor =
    currentTab === POMODORO_TAB
      ? "var(--pomodoro-unfilled)"
      : "var(--break-unfilled)";

  const { minutes, seconds } = getFormattedTime(timerValue);

  return (
    <>
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

      <div className="w-64 h-64 md:h-72 md:w-72 lg:h-80 lg:w-80 xl:h-96 xl:w-96 relative">
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: `conic-gradient(${fillColor} ${percentage}%, ${unfilledColor} ${percentage}% 100%)`,
          }}
        />

        <div className="absolute inset-4 bg-background rounded-full flex justify-center items-center heading-1">
          <span>{minutes}</span>
          <span className="vertical-line">:</span>
          <span>{seconds}</span>
        </div>
      </div>
    </>
  );
};

export default TimerContent;
