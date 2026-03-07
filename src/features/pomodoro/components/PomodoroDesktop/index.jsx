import TaskList from "@/features/pomodoro/components/TaskList";
import TimerContainer from "@/features/pomodoro/components/TimerContainer";

const PomodoroDesktop = () => {
  return (
    <div className="hidden md:flex h-[calc(100vh-64px)] overflow-hidden">
      <div className="flex md:flex-none md:w-72 xl:w-92 flex-col border-r border-border">
        <TaskList showHeader />
      </div>
      <div className="hidden md:flex flex-1 flex-col p-4 xl:p-6 h-full">
        <TimerContainer />
      </div>
    </div>
  );
};

export default PomodoroDesktop;
