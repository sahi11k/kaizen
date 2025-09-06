import React from "react";
import { getDayOfMonth, getDayOfWeek } from "@/utils/date";

const JournalListItem = ({ journal, onClick, isActive }) => {
  const { title, date, content } = journal;
  const activeClass = isActive
    ? "bg-primary/5 text-primary hover:bg-primary/5 hover:text-primary"
    : "text-muted-foreground";

  return (
    <li
      className={`flex gap-2 mb-1 px-3 py-2  hover:bg-accent rounded-lg cursor-pointer transition-colors ${activeClass}`}
      onClick={onClick}
    >
      <div className="flex flex-col items-center w-16">
        <span className="text-2xl">{getDayOfMonth(date)}</span>
        <span className="text-xs font-medium">{getDayOfWeek(date)}</span>
      </div>
      <div className="flex-1 flex flex-col">
        <div
          className={`body-base font-medium ${
            isActive ? "text-primary" : "text-foreground"
          }`}
        >
          {title || "Untitled"}
        </div>
        <div className="text-sm line-clamp-1">{content}</div>
      </div>
    </li>
  );
};

export default JournalListItem;
