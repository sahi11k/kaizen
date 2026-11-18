import FocusMode from "@/features/pomodoro/components/FocusMode";
import TimerControls from "@/features/pomodoro/components/TimerActions/TimerControls";
import TimerTabs from "@/features/pomodoro/components/TimerTabs";
import TimerWarningDialog from "@/features/pomodoro/components/TimerWarningDialog";
import { useTimerContainer } from "@/features/pomodoro/hooks";

const TimerContainer = () => {
  const {
    cancelTabSwitch,
    closeFocusMode,
    confirmTabSwitch,
    currentTab,
    duration,
    focusModeOpen,
    handleResetTimer,
    handleTabChange,
    openFocusMode,
    pendingTab,
    startTimer,
    stopTimer,
    timerStarted,
    timerTask,
    timerValue,
    currentTask,
  } = useTimerContainer();

  return (
    <div className="surface-card flex flex-1 items-start justify-center rounded-lg p-3 md:p-4 xl:p-6">
      <div className="flex h-full flex-col gap-3 sm:gap-5 lg:gap-0">
        <TimerTabs
          currentTab={currentTab}
          currentTask={timerTask}
          duration={duration}
          onTabChange={handleTabChange}
          timerValue={timerValue}
        />
        <TimerControls
          timerStarted={timerStarted}
          onFocusMode={openFocusMode}
          onReset={handleResetTimer}
          onStart={() => startTimer(currentTask?.id)}
          onStop={stopTimer}
        />
      </div>
      {focusModeOpen && <FocusMode onExit={closeFocusMode} />}
      <TimerWarningDialog
        open={!!pendingTab}
        onConfirm={confirmTabSwitch}
        onCancel={cancelTabSwitch}
      />
    </div>
  );
};

export default TimerContainer;
