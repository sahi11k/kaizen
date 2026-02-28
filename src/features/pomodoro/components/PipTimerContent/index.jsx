import { Play, Square } from "lucide-react";
import useTimerStore from "@/features/pomodoro/store/timer";
import useTasksStore from "@/features/pomodoro/store/tasks";
import useAuthStore from "@/features/auth/store/auth";
import { useTasksQuery } from "@/features/pomodoro/services/queries";
import { getFormattedTime } from "@/features/pomodoro/helpers/timer";
import { TIMER_CONSTANTS } from "@/features/pomodoro/constants/pomodoro";

const { POMODORO_TAB } = TIMER_CONSTANTS;

/**
 * Compact timer UI rendered inside the Document PiP window.
 * Shows task info, timer countdown, play/pause icon button,
 * and a progress bar fixed at the bottom.
 */
const PipTimerContent = () => {
  const timerValue = useTimerStore((s) => s.timerValue);
  const timerStarted = useTimerStore((s) => s.timerStarted);
  const currentTab = useTimerStore((s) => s.currentTab);
  const duration = useTimerStore((s) => s.duration);
  const timerTaskId = useTimerStore((s) => s.timerTaskId);
  const startTimer = useTimerStore((s) => s.startTimer);
  const stopTimer = useTimerStore((s) => s.stopTimer);

  const { user } = useAuthStore();
  const { data: tasks = [] } = useTasksQuery(user?.id);
  const currentTask = useTasksStore((s) => s.currentTask);
  const timerTask = timerTaskId
    ? (tasks.find((t) => t.id === timerTaskId) ?? currentTask)
    : currentTask;

  const { minutes, seconds } = getFormattedTime(timerValue);
  const progress =
    duration > 0 ? ((duration - timerValue) / duration) * 100 : 0;

  const isPomodoro = currentTab === POMODORO_TAB;
  const barColor = isPomodoro
    ? "var(--pomodoro-filled)"
    : "var(--break-filled)";
  const barBg = isPomodoro
    ? "var(--pomodoro-unfilled)"
    : "var(--break-unfilled)";

  const handleToggle = () => {
    if (timerStarted) {
      stopTimer();
    } else {
      startTimer(timerTask?.id);
    }
  };

  return (
    <div className="relative flex flex-col justify-center items-center gap-6 h-full bg-background text-foreground p-5 pb-7 select-none">
      {/* Task info pill */}
      <div className="bg-muted py-1.5 px-4 rounded-full max-w-[90%]">
        <div className="flex items-center justify-center gap-1 text-sm font-semibold">
          {isPomodoro ? (
            <>
              <span className="text-muted-foreground shrink-0">
                {timerTask
                  ? `Session #${timerTask.completedSessions + 1} : `
                  : ""}
              </span>
              <span className="whitespace-nowrap overflow-hidden text-ellipsis">
                {timerTask?.title || "Focus Time!"}
              </span>
            </>
          ) : (
            <span>Yay! Break Time</span>
          )}
        </div>
      </div>

      {/* Timer display */}
      <span className="text-6xl font-semibold tabular-nums leading-none">
        {minutes}:{seconds}
      </span>

      {/* Play / Pause */}
      <button
        onClick={handleToggle}
        className="flex flex-shrink-0 items-center justify-center size-12 rounded-full bg-primary text-primary-foreground cursor-pointer hover:opacity-90 transition-opacity text-sm font-semibold"
      >
        {timerStarted ? (
          <Square className="size-4" fill="currentColor" />
        ) : (
          <Play className="size-4" fill="currentColor" />
        )}
      </button>

      {/* Progress bar — fixed at bottom */}
      <div
        className="absolute top-0 left-0 w-full h-2 overflow-hidden"
        style={{ backgroundColor: barBg }}
      >
        <div
          className="h-full transition-all duration-1000 ease-linear"
          style={{ width: `${progress}%`, backgroundColor: barColor }}
        />
      </div>
    </div>
  );
};

export default PipTimerContent;
