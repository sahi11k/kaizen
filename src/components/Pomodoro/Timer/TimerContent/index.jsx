import React, { useState, useEffect, useRef } from "react";
// import PlayIcon from "@/assets/icons/play.svg?react";
// import NextIcon from "@/assets/icons/next.svg?react";
// import ResetIcon from "@/assets/icons/reset.svg?react";
// import StopIcon from "@/assets/icons/stop.svg?react";

import { useGetTimerValue, getCurrentTime } from "@/hooks/useGetTimerValue";
import useTasksStore from "@/store/tasks";
import { useShallow } from "zustand/react/shallow";
import { updateTask } from "@/db/apis/tasks";
import useAuthStore from "@/store/auth";

import { Button } from "@/components/ui/button";
import { TIMER_CONSTANTS } from "@/constants/pomodoro";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Coffee,
  Leaf,
  Play,
  SkipForward,
  Square,
  TimerIcon,
  TimerResetIcon,
} from "lucide-react";
import { getLongBreakInterval, getTimerDurations } from "@/utils/timer";
import PomoSettings from "@/components/Pomodoro/PomoSettings";
import { Tooltip } from "@/components/ui/tooltip";

const { POMODORO_TAB, SHORT_BREAK_TAB, LONG_BREAK_TAB } = TIMER_CONSTANTS;

const TABS = [
  {
    key: POMODORO_TAB,
    label: "Pomodoro",
    icon: <TimerIcon className="size-5 mr-1 hidden sm:block" />,
  },
  {
    key: SHORT_BREAK_TAB,
    label: "Short Break",
    icon: <Coffee className="size-5 mr-1 hidden sm:block" />,
  },
  {
    key: LONG_BREAK_TAB,
    label: "Long Break",
    icon: <Leaf className="size-5 mr-1 hidden sm:block" />,
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
          <div className="flex items-center gap-2 justify-center font-semibold">
            #{currentTask?.completedSessions + 1}
            <span className="whitespace-nowrap overflow-hidden text-ellipsis">
              {currentTask.title}
            </span>
          </div>
        </div>
      )}
      <div className="flex justify-center items-center gap-6 relative">
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
        <Tooltip content="Skip Timer">
          <Button
            onClick={skipTimer}
            icon={<SkipForward />}
            variant="icon"
            className="rounded-full w-12 !h-12"
            aria-label="Skip Timer"
          />
        </Tooltip>
        <div className="absolute right-4 xl:right-8">
          <PomoSettings />
        </div>
      </div>
    </>
  );
};

const TabContent = ({ timerValue, duration, currentTab }) => {
  const percentage = ((duration - timerValue) / duration) * 100;
  const fillColor =
    currentTab === POMODORO_TAB ? "var(--primary)" : "var(--secondary)";

  const { minutes, seconds } = getFormattedTime(timerValue);

  return (
    <div className="flex justify-center items-center h-full">
      <div className="w-80 h-80 md:w-[min(40vw,400px)] md:h-[min(40vw,400px)] relative">
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: `conic-gradient(${fillColor} ${percentage}%, var(--accent) ${percentage}% 100%)`,
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
