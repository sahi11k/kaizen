import TaskList from "@/features/pomodoro/components/TaskList";
import TimerContainer from "@/features/pomodoro/components/TimerContainer";

// Mobile + tablet (below lg): timer on top, task list below grows with its tasks up to 500px, then scrolls inside its card. No tabs.
const PomodoroMobile = () => {
  return (
    <div className="flex flex-1 flex-col gap-6 pb-6 lg:hidden">
      <div className="flex shrink-0">
        <TimerContainer />
      </div>
      <aside className="surface-card flex max-h-[500px] min-h-64 flex-col overflow-hidden rounded-lg">
        <TaskList showHeader headerTitle="Focus Queue" />
      </aside>
    </div>
  );
};

export default PomodoroMobile;
