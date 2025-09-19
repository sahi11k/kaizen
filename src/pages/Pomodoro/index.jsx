import PomodoroMobile from "@/components/Pomodoro/PomodoroMobile";
import { TaskListLaptop } from "@/components/Pomodoro/Tasks";
import { TimerLaptop } from "@/components/Pomodoro/Timer";
import { TAB_TITLES } from "@/constants/routes";
import useTabTitle from "@/hooks/useTabTitle";

const Pomodoro = () => {
  useTabTitle(TAB_TITLES.POMODORO);

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
