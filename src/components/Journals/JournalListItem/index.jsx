import React from "react";
import { getDayOfMonth, getDayOfWeek } from "@/utils/date";
import { MoreOptions } from "@/components/ui/more-options";

const JournalListItem = ({ journal, onClick, isActive, onRemove, onEdit }) => {
  const { title, date, content } = journal;
  const activeClass = isActive
    ? "bg-primary/5 text-primary hover:bg-primary/5 hover:text-primary"
    : "text-muted-foreground";

  const onKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " " || e.code === "Space") {
      e.preventDefault();
      onClick?.(e);
    }
  };

  return (
    <li
      className={`group flex gap-4 mb-1 px-3 py-2  hover:bg-muted rounded-lg cursor-pointer transition-colors ${activeClass}`}
      onClick={onClick}
      onKeyDown={onKeyDown}
      role="option"
      aria-selected={isActive}
      tabIndex={0}
    >
      <div className="flex flex-col gap-1 xl:gap-0.5 items-center ">
        <span className="text-lg xl:text-xl leading-tight">
          {getDayOfMonth(date)}
        </span>
        <span className="text-xs font-medium uppercase tracking-wide">
          {getDayOfWeek(date)}
        </span>
      </div>
      <div className="flex-1 flex flex-col min-w-0">
        <div
          className={`text-base font-semibold truncate ${
            isActive ? "text-primary" : "text-foreground"
          }`}
        >
          {title || "Untitled"}
        </div>
        <div className="text-[13px] tracking-wide truncate">{content}</div>
      </div>

      <MoreOptions
        triggerClassName="!p-0 w-0 overflow-hidden group-hover:w-auto data-[state=open]:w-auto hover:bg-transparent"
        contentClassName="border-border"
        align="end"
        items={[
          { label: "Edit", onClick: onEdit },
          {
            label: "Delete",
            onClick: onRemove,
            className: "hover:!bg-destructive/10 !text-destructive",
          },
        ]}
      />
    </li>
  );
};

export default JournalListItem;
