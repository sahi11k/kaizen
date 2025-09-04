import React, { useState, useEffect, useRef } from "react";
import PlayIcon from "@/assets/icons/play.svg?react";
import NextIcon from "@/assets/icons/next.svg?react";
import ResetIcon from "@/assets/icons/reset.svg?react";
import StopIcon from "@/assets/icons/stop.svg?react";

import { useGetTimerValue, getCurrentTime } from "@/hooks/useGetTimerValue";
import useTasksStore from "@/store/tasks";
import { useShallow } from "zustand/react/shallow";
import { updateTask } from "@/db/apis/tasks";
import useAuthStore from "@/store/auth";
import {
  getTimerDurations,
  getLongBreakInterval,
} from "../../../utils/timerHelpers";
import { Button } from "@/components/ui/button";
import { TIMER_CONSTANTS } from "@/constants/pomodoro";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const { POMODORO_TAB, SHORT_BREAK_TAB, LONG_BREAK_TAB } = TIMER_CONSTANTS;

const TABS = [
  {
    key: POMODORO_TAB,
    label: "Pomodoro",
  },
  {
    key: SHORT_BREAK_TAB,
    label: "Short Break",
  },
  {
    key: LONG_BREAK_TAB,
    label: "Long Break",
  },
];

const Timer = () => {
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

  // No longer derive long break state here; handled when computing next tab

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

  const skipTimer = () => {
    goToNextPhase(true);
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
    <div className="flex-1 flex flex-col p-6 gap-8">
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
                className="cursor-pointer"
              >
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
      <div className="flex justify-center items-center gap-6">
        <Button
          onClick={resetTimer}
          title="Reset Timer"
          icon={<ResetIcon className="size-6" fill="currentColor" />}
          className="rounded-full w-12 !h-12"
          variant="icon"
        />
        <Button
          onClick={timerStarted ? stopTimer : startTimer}
          title={timerStarted ? "Stop Timer" : "Start Timer"}
          icon={
            timerStarted ? (
              <StopIcon className="size-6" fill="currentColor" />
            ) : (
              <PlayIcon className="size-6" fill="currentColor" />
            )
          }
          className="rounded-full !h-14 sm:!px-10 !text-lg"
        >
          <span className="hidden sm:block">
            {timerStarted ? "Stop" : "Start"}
          </span>
        </Button>
        <Button
          onClick={skipTimer}
          title="Skip Timer"
          icon={<NextIcon className="size-6" fill="currentColor" />}
          variant="icon"
          className="rounded-full w-12 !h-12"
        />
      </div>
    </div>
  );
};

const TabContent = ({ timerValue, duration, currentTab }) => {
  const percentage = ((duration - timerValue) / duration) * 100;
  const fillColor =
    currentTab === POMODORO_TAB ? "var(--primary)" : "var(--muted-foreground)";

  const { minutes, seconds } = getFormattedTime(timerValue);

  return (
    <div className="flex justify-center items-center h-full">
      <div className="w-80 h-80 relative lg:w-100 lg:h-100">
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: `conic-gradient(${fillColor} ${percentage}%, var(--accent) ${percentage}% 100%)`,
          }}
        />

        <div className="absolute inset-4 bg-white rounded-full flex justify-center items-center heading-1 font-mono">
          <span>{minutes}</span>
          <span className="mb-2">:</span>
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

export default Timer;
