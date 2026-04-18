import type { ReactElement } from "react";
import { MOOD_OPTIONS } from "@/features/mood/constants";
import type { MoodValue } from "@/features/mood/types";
import { cn } from "@/shared/lib/utils";
import { Button, ResponsiveDialog } from "@/shared/ui";

export interface DailyMoodPopoverProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  value: MoodValue | null;
  onValueChange: (value: MoodValue | null) => void;
  submitLabel: string;
  isSubmitting: boolean;
  onSubmit: () => void;
}

export function DailyMoodPopover({
  open,
  onOpenChange,
  value,
  onValueChange,
  submitLabel,
  isSubmitting,
  onSubmit,
}: DailyMoodPopoverProps): ReactElement {
  const handleCancel = (): void => {
    onOpenChange(false);
  };

  return (
    <ResponsiveDialog
      open={open}
      onOpenChange={onOpenChange}
      title="How are you feeling today?"
      contentClassName="w-lg p-6 overflow-y-auto scrollbar-thin shadow-md"
      footer={
        <>
          <Button variant="outline" type="button" onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            type="button"
            disabled={value == null || isSubmitting}
            loading={isSubmitting}
            onClick={onSubmit}
          >
            {submitLabel}
          </Button>
        </>
      }
    >
      <div
        className="my-6 flex flex-row gap-2 sm:gap-3"
        role="radiogroup"
        aria-label="Mood for today"
      >
        {MOOD_OPTIONS.map((opt) => {
          const selected = value === opt.value;
          return (
            <Button
              key={opt.value}
              type="button"
              role="radio"
              aria-checked={selected}
              aria-label={`${opt.label} mood`}
              variant="outline"
              size="sm"
              className={cn(
                "flex h-auto min-h-[4.25rem] min-w-0 flex-1 basis-0 flex-col items-center justify-center whitespace-normal border border-border !px-0 py-2 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 sm:min-h-[4.75rem] sm:!px-0.5 sm:py-2.5",
                selected && "bg-primary/25 hover:bg-primary/30",
              )}
              onClick={() => onValueChange(opt.value)}
            >
              <span className="grid w-full min-w-0 justify-items-center gap-2">
                <span
                  className="flex justify-center whitespace-normal text-xl leading-none sm:text-2xl"
                  aria-hidden
                >
                  {opt.emoji}
                </span>
                <span className="w-full min-w-0 max-w-full whitespace-nowrap text-center text-[0.58rem] leading-tight tracking-tight font-normal sm:text-[0.7rem] md:text-xs">
                  {opt.label}
                </span>
              </span>
            </Button>
          );
        })}
      </div>
    </ResponsiveDialog>
  );
}
