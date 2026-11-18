import TaskList from "@/features/pomodoro/components/TaskList";
import TimerContainer from "@/features/pomodoro/components/TimerContainer";

const layoutClass =
  "hidden min-h-0 flex-1 grid-cols-[minmax(0,1fr)_22rem] gap-6 overflow-hidden pb-6 lg:grid xl:grid-cols-[minmax(0,1fr)_26rem]";

const PomodoroDesktop = () => {
  return (
    <div className={layoutClass}>
      <main className="grid h-full min-h-0 grid-rows-[minmax(0,1fr)]">
        <TimerContainer />
      </main>
      <aside className="surface-card flex h-full min-h-0 flex-col overflow-hidden rounded-lg">
        <TaskList showHeader headerTitle="Focus Queue" />
      </aside>
    </div>
  );
};

export default PomodoroDesktop;
