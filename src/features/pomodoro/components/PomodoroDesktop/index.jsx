import TaskList from "@/features/pomodoro/components/TaskList";
import TimerContainer from "@/features/pomodoro/components/TimerContainer";

const layoutClass =
  "hidden h-full min-h-0 w-full max-w-[1800px] grid-cols-[minmax(0,1fr)_22rem] gap-5 overflow-hidden p-5 md:mx-auto md:grid xl:grid-cols-[minmax(0,1fr)_26rem] xl:gap-6 xl:p-6";

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
