import PomodoroMobile from "@/features/pomodoro/components/PomodoroMobile";
import { TaskListLaptop } from "@/features/pomodoro/components/Tasks";
import { TimerLaptop } from "@/features/pomodoro/components/Timer";
import { BROWSER_TAB_TITLES } from "@/shared/constants";
import useTabTitle from "@/shared/hooks/useTabTitle";

const Pomodoro = () => {
  useTabTitle(BROWSER_TAB_TITLES.POMODORO);

  return (
    <>
      <div className="hidden md:flex h-[calc(100vh-64px)] overflow-hidden">
        <TaskListLaptop />
        <TimerLaptop />
      </div>
      <PomodoroMobile />
    </>
  );
};

export default Pomodoro;
