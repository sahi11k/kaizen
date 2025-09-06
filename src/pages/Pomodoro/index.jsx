import React from "react";
import Timer from "@/components/Pomodoro/Timer";
import { TaskListLaptop, TaskListMobile } from "@/components/Pomodoro/Tasks";
import { Button } from "@/components/ui/button";

const Pomodoro = () => {
  return (
    <div className="flex h-[calc(100vh-64px)]">
      <div className="flex-1 h-full flex flex-col">
        <Timer />
        <div className="lg:hidden bg-accent flex items-center justify-between px-6 h-16">
          {/* Settings */}
          <TaskListMobile />
        </div>
      </div>
      <TaskListLaptop />
    </div>
  );
};

export default Pomodoro;
