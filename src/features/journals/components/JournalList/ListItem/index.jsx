import React from "react";
import { getDayOfMonth, getDayOfWeek } from "@/shared/lib/date";
import { MoreOptions } from "@/shared/ui";
import { cn } from "@/shared/lib/utils";

const base =
  "group flex items-center gap-4 cursor-pointer px-3 py-2 rounded-lg transition-colors bg-background";
const hover = "hover:bg-muted";
const activeClass =
  "bg-primary-container text-primary-container-foreground hover:bg-primary-container hover:text-primary-container-foreground";

const JournalListItem = ({ journal, onClick, isActive, onRemove, onEdit }) => {
  const { title, date, content } = journal;

  const getItemClass = () => {
    return cn(base, hover, {
      [activeClass]: isActive,
    });
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " " || e.code === "Space") {
      e.preventDefault();
      onClick?.(e);
    }
  };

  return (
    <li
      className={getItemClass()}
      onClick={onClick}
      onKeyDown={onKeyDown}
      role="option"
      aria-selected={isActive}
      tabIndex={0}
    >
      <div className="flex flex-col gap-1 xl:gap-0.5 items-center shrink-0">
        <span className="text-lg xl:text-xl leading-tight">
          {getDayOfMonth(date)}
        </span>
        <span className="text-xs font-medium uppercase tracking-wide">
          {getDayOfWeek(date)}
        </span>
      </div>
      <div className="flex-1 w-0 flex flex-col">
        <div className="text-base font-semibold truncate">
          {title || "Untitled"}
        </div>
        <div
          className={`text-[13px] tracking-wide line-clamp-1 ${
            !isActive && "text-muted-foreground"
          }`}
        >
          {content}
        </div>
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
