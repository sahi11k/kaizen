import React, { useState } from "react";

import HabitDetailPlaceholder from "@/features/habits/components/HabitDetailPlaceholder";
import HabitList from "@/features/habits/components/HabitList";
import { BROWSER_TAB_TITLES } from "@/shared/constants";
import useDocumentTitle from "@/shared/hooks/useDocumentTitle";

const Habits = () => {
  const [selectedHabit, setSelectedHabit] = useState(null);

  useDocumentTitle(BROWSER_TAB_TITLES.HABITS);

  return (
    <>
      <div className="hidden h-[calc(100vh-64px)] overflow-hidden md:flex">
        <div className="flex flex-col border-r border-border md:w-72 md:flex-none xl:w-92">
          <HabitList
            showHeader
            selectedHabitId={selectedHabit?.id}
            onHabitSelect={setSelectedHabit}
          />
        </div>
        <div className="hidden h-full flex-1 flex-col p-4 md:flex xl:p-6">
          <HabitDetailPlaceholder habit={selectedHabit} />
        </div>
      </div>

      <div className="h-[calc(100vh-64px)] overflow-hidden md:hidden">
        <HabitList
          showHeader={false}
          selectedHabitId={selectedHabit?.id}
          onHabitSelect={setSelectedHabit}
        />
      </div>
    </>
  );
};

export default Habits;
