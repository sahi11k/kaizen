import { usePomodoroTimer } from "@/features/pomodoro/hooks";
import SessionBadge from "@/features/pomodoro/components/SessionBadge";
import {
  PlayPauseButton,
  ResetTimerButton,
  TimerActionGroup,
} from "@/features/pomodoro/components/TimerActions";

const PipTimerContent = () => {
  const {
    timerStarted,
    duration,
    startTimer,
    stopTimer,
    resetTimer,
    timerTask,
    minutes,
    seconds,
    isPomodoro,
  } = usePomodoroTimer();

  return (
    <div className="flex justify-center items-center h-full w-full bg-background text-foreground select-none">
      <div className="flex flex-col items-center gap-4 min-w-0 flex-1 px-6 max-w-120">
        <SessionBadge
          isPomodoro={isPomodoro}
          currentTask={timerTask}
          className="text-sm w-full"
        />

        <div className="flex-1 flex items-center gap-6 justify-between w-full">
          <div className="font-number text-5xl tracking-tight leading-none">
            {minutes}
            <span className="mx-0.5">:</span>
            {seconds}
          </div>
          <TimerActionGroup>
            <PlayPauseButton
              timerStarted={timerStarted}
              onStart={() => startTimer(timerTask?.id)}
              onStop={stopTimer}
              showLabel={false}
              className="h-12 p-4"
            />
            <ResetTimerButton
              onClick={() => resetTimer(duration)}
              showTooltip={false}
            />
          </TimerActionGroup>
        </div>
      </div>
    </div>
  );
};

export default PipTimerContent;
