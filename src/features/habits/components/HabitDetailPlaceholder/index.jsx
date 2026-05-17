import React from "react";
import { CalendarCheck } from "lucide-react";

import { EmptyState } from "@/shared/ui";

const HabitDetailPlaceholder = ({ habit }) => {
  if (!habit) {
    return (
      <div className="flex h-full items-center justify-center rounded-lg border border-dashed border-border">
        <EmptyState
          icon={<CalendarCheck className="size-8" />}
          title="Select a habit"
          description="Habit details will appear here."
        />
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col rounded-lg border border-border bg-card p-6">
      <div>
        <h1 className="heading-2 text-foreground">{habit.name}</h1>
        <p className="body-description mt-2 text-muted-foreground">
          Habit details will appear here.
        </p>
      </div>
    </div>
  );
};

export default HabitDetailPlaceholder;
