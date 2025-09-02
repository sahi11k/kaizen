import React from "react";
import Timer from "@/components/Pomodoro/Timer";
import Tasks from "@/components/Pomodoro/Tasks";

const Pomodoro = () => {
  return (
    <div className="flex h-[calc(100vh-64px)]">
      <Tasks />
      <Timer />
    </div>
  );
};

export default Pomodoro;
