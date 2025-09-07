import React from "react";
import { TimerLaptop } from "@/components/Pomodoro/Timer";
import { TaskListLaptop } from "@/components/Pomodoro/Tasks";

const Pomodoro = () => {
  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden">
      <TaskListLaptop />
      <TimerLaptop />
    </div>
  );
};

export default Pomodoro;
