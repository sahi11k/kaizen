import type { ReactElement } from "react";
import { MOOD_OPTIONS } from "@/features/mood/constants";
import type { MoodValue } from "@/features/mood/types";
import { cn } from "@/shared/lib/utils";
import { ResponsiveDialog } from "@/shared/ui";

export interface DailyMoodPopoverProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  value?: MoodValue | null;
  onMoodSelect: (value: MoodValue) => void;
}

export function DailyMoodPopover({
  open,
  onOpenChange,
  value,
  onMoodSelect,
}: DailyMoodPopoverProps): ReactElement {
  return (
    <ResponsiveDialog
      open={open}
      onOpenChange={onOpenChange}
      title="How are you feeling today?"
      contentClassName="w-100 max-w-[calc(100vw-2rem)] p-5 overflow-y-auto scrollbar-thin shadow-md"
    >
      <div
        className="my-4 flex flex-row"
        role="radiogroup"
        aria-label="Mood for today"
      >
        {MOOD_OPTIONS.map((opt) => {
          const selected = value === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              role="radio"
              aria-checked={selected}
              aria-label={`${opt.label} mood`}
              className={cn(
                "flex flex-1 flex-col items-center gap-2 rounded-lg py-2 hover:bg-muted focus:outline-none",
                selected && "text-primary",
              )}
              onClick={() => onMoodSelect(opt.value)}
            >
              <span className="text-3xl leading-none" aria-hidden>
                {opt.emoji}
              </span>
              <span className="max-w-full truncate text-[0.65rem] font-medium leading-tight sm:text-xs">
                {opt.label}
              </span>
            </button>
          );
        })}
      </div>
    </ResponsiveDialog>
  );
}
