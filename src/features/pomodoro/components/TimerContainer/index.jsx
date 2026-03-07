import React, { useEffect, useRef, useState } from "react";
import HourglassOutline from "@/assets/icons/hourglass-outline.svg?react";
import HourglassFilled from "@/assets/icons/hourglass-filled.svg?react";
import HourglassHalf from "@/assets/icons/hourglass-half.svg?react";

import { getCurrentTime } from "@/features/pomodoro/utils";
import TimerControls from "@/features/pomodoro/components/TimerContainer/TimerControls";
import TimerWarningDialog from "@/features/pomodoro/components/TimerWarningDialog";
import { useTimerSound } from "@/features/pomodoro/hooks";
import { useTimerStore, useTasksStore } from "@/features/pomodoro/store";
import { useAuthStore } from "@/features/auth";
import { useTasksQuery } from "@/features/pomodoro/queries";
import { useUserSettingsQuery } from "@/features/settings";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui";
import { TIMER_CONSTANTS, POMODORO_TABS } from "@/features/pomodoro/constants";
import TimerDisplay from "@/features/pomodoro/components/TimerContainer/TimerDisplay";

const { POMODORO_TAB } = TIMER_CONSTANTS;

const ICON_COMPONENTS = {
  "hourglass-filled": HourglassFilled,
  "hourglass-half": HourglassHalf,
  "hourglass-outline": HourglassOutline,
};

const TabIcon = ({ name }) => {
  const Icon = ICON_COMPONENTS[name];
  if (!Icon) return null;
  return <Icon className="size-5 mr-1 hidden sm:block fill-current" />;
};

const TimerContainer = () => {
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
  const { play } = useTimerSound();
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

  const [pendingTab, setPendingTab] = useState(null);

  const handleTabChange = (key) => {
    if (timerStarted) {
      setPendingTab(key);
      return;
    }
    const value = getCurrentTime(key, userSettings);
    setTab(key, value);
  };

  const confirmTabSwitch = () => {
    if (!pendingTab) return;
    const value = getCurrentTime(pendingTab, userSettings);
    setTab(pendingTab, value);
    setPendingTab(null);
  };

  const cancelTabSwitch = () => {
    setPendingTab(null);
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
          {POMODORO_TABS.map((tab) => (
            <TabsTrigger
              key={tab.key}
              value={tab.key}
              className="cursor-pointer text-sm xl:text-base"
            >
              <TabIcon name={tab.icon} />
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        <>
          {POMODORO_TABS.map((tab) => (
            <TabsContent
              key={tab.key}
              value={tab.key}
              className="flex justify-center items-center flex-col gap-6 xl:gap-12"
            >
              <TimerDisplay
                timerValue={timerValue}
                duration={duration}
                currentTab={currentTab}
                currentTask={timerTask}
              />
            </TabsContent>
          ))}
        </>
      </Tabs>
      <TimerControls
        timerStarted={timerStarted}
        onReset={handleResetTimer}
        onStart={() => startTimer(currentTask?.id)}
        onStop={stopTimer}
      />
      <TimerWarningDialog
        open={!!pendingTab}
        onConfirm={confirmTabSwitch}
        onCancel={cancelTabSwitch}
      />
    </>
  );
};

export default TimerContainer;
