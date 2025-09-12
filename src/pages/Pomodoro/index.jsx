import React from "react";
import { TimerLaptop } from "@/components/Pomodoro/Timer";
import { TaskListLaptop } from "@/components/Pomodoro/Tasks";
import { TAB_TITLES } from "@/constants/routes";
import useTabTitle from "@/hooks/useTabTitle";

const Pomodoro = () => {
  useTabTitle(TAB_TITLES.POMODORO);

  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden">
      <TaskListLaptop />
      <TimerLaptop />
    </div>
  );
};

export default Pomodoro;
