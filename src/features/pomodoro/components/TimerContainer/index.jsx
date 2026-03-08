import React, { useEffect, useRef, useState } from "react";
import HourglassOutline from "@/assets/icons/hourglass-outline.svg?react";
import HourglassFilled from "@/assets/icons/hourglass-filled.svg?react";
import HourglassHalf from "@/assets/icons/hourglass-half.svg?react";

import { getCurrentTime } from "@/features/pomodoro/utils";
import {
  FocusModeButton,
  ResetTimerButton,
  PlayPauseButton,
  PipButton,
} from "@/features/pomodoro/components/TimerControls";
import PomoSettings from "@/features/pomodoro/components/PomodoroSettings";
import TimerWarningDialog from "@/features/pomodoro/components/TimerWarningDialog";
import FocusMode from "@/features/pomodoro/components/FocusMode";
import { useTimerSound, usePomodoroTimer } from "@/features/pomodoro/hooks";
import { useTimerStore } from "@/features/pomodoro/store";
import { useAuthStore } from "@/features/auth";
import { useUserSettingsQuery } from "@/features/settings";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui";
import { TIMER_CONSTANTS, POMODORO_TABS } from "@/features/pomodoro/constants";
import TimerDisplay from "@/features/pomodoro/components/TimerDisplay";

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
  const {
    timerValue,
    timerStarted,
    currentTab,
    duration,
    startTimer,
    stopTimer,
    resetTimer,
    currentTask,
    timerTask,
  } = usePomodoroTimer();

  const setTab = useTimerStore((s) => s.setTab);
  const setTimerValue = useTimerStore((s) => s.setTimerValue);

  const user = useAuthStore((s) => s.user);
  const { data: userSettings } = useUserSettingsQuery(user?.id);

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

  const [focusModeOpen, setFocusModeOpen] = useState(false);
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
      <div className="flex justify-center items-center gap-4 rounded-full w-fit mx-auto px-6">
        <FocusModeButton onClick={() => setFocusModeOpen(true)} />
        <PomoSettings />
        <PlayPauseButton
          timerStarted={timerStarted}
          onStart={() => startTimer(currentTask?.id)}
          onStop={stopTimer}
        />
        <ResetTimerButton onClick={handleResetTimer} />
        <PipButton />
      </div>
      {focusModeOpen && <FocusMode onExit={() => setFocusModeOpen(false)} />}
      <TimerWarningDialog
        open={!!pendingTab}
        onConfirm={confirmTabSwitch}
        onCancel={cancelTabSwitch}
      />
    </>
  );
};

export default TimerContainer;
