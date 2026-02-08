import React from "react";

import useTasksStore from "@/features/pomodoro/store/tasks";
import { CheckCircle, Clock, Coffee, Play } from "lucide-react";

const PomodoroWidget = () => {
  const { currentTask } = useTasksStore();

  return (
    <div className={`card`}>
      <div className={`card__header flex items-center justify-between`}>
        <span> Pomodoro Activity</span>
        <span className="bg-accent text-sm rounded-2xl px-4 py-1">Today</span>
      </div>
      <div className={`card__body flex flex-col justify-around`}>
        <div className="flex">
          <SessionInsightItem icon={<Clock />} value="10 hrs" />
          <SessionInsightItem icon={<Coffee />} value="10 hrs" />
          <SessionInsightItem icon={<CheckCircle />} value="10" />
        </div>

        <div className="rounded-md">
          <div className="text-[0.9rem] font-medium text-muted-foreground">
            Current Session
          </div>
          <div className="flex rounded-md p-4 mt-2 border-2 border-dashed border-accent items-center">
            <div className="text-[1.1rem] font-medium text-foreground flex-1">
              #1001 - Task Name
            </div>
            <div className="text-2xl font-semibold text-foreground px-4">
              25:00
            </div>
            <div>
              <button className={`btn btn--primary w-12 h-12 rounded-full p-2`}>
                <Play />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SessionInsightItem = ({ icon, title, value }) => {
  return (
    <div className="flex flex-1 gap-4">
      <div className="w-[60px] h-[60px] rounded-full bg-accent flex items-center justify-center [&>svg]:w-7 [&>svg]:h-7">
        {icon}
      </div>
      <div className="flex flex-col justify-center flex-2">
        <div className="text-sm text-muted-foreground">{title}</div>
        <div className="text-xl font-semibold text-foreground">{value}</div>
      </div>
    </div>
  );
};

export default PomodoroWidget;
