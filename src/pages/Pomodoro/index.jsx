import React from "react";
import Timer from "@/components/Pomodoro/Timer";
import { TaskListLaptop, TaskListMobile } from "@/components/Pomodoro/Tasks";

const Pomodoro = () => {
  return (
    <div className="flex h-[calc(100vh-64px)]">
      <Timer />
      <TaskListLaptop />
      <TaskListMobile />
    </div>
  );
};

export default Pomodoro;
