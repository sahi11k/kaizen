import { useEffect, useMemo, useRef, useState, type ReactElement } from "react";
import dayjs from "dayjs";
import { SmilePlus } from "lucide-react";
import { MOOD_OPTIONS } from "@/features/mood/constants";
import { DailyMoodPopover } from "@/features/mood/components/DailyMoodPopover";
import { useUpsertDailyMoodMutation } from "@/features/mood/mutations";
import { useTodayMoodQuery } from "@/features/mood/queries";
import type { MoodValue } from "@/features/mood/types";
import { useAuthStore } from "@/features/auth";
import { Button, Toast, Tooltip } from "@/shared/ui";
import { cn } from "@/shared/lib/utils";

const { toast } = Toast;

interface DashboardDailyMoodPromptProps {
  className?: string;
}

export function DashboardDailyMoodPrompt({
  className,
}: DashboardDailyMoodPromptProps): ReactElement {
  const { user, isLoading: authLoading } = useAuthStore();
  const userId = user?.id;
  const dateKey = dayjs().format("YYYY-MM-DD");

  const todayQuery = useTodayMoodQuery(userId, dateKey, {
    enabled: Boolean(userId) && !authLoading,
  });

  const upsertMutation = useUpsertDailyMoodMutation();
  const [open, setOpen] = useState(false);
  const hasAutoOpenedRef = useRef(false);

  const currentMood = todayQuery.data?.mood ?? null;
  const currentMoodOption = useMemo(
    () => MOOD_OPTIONS.find((option) => option.value === currentMood),
    [currentMood],
  );

  useEffect(() => {
    if (hasAutoOpenedRef.current) return;
    if (authLoading || !userId) return;
    if (!todayQuery.isFetched) return;
    hasAutoOpenedRef.current = true;
    if (todayQuery.data != null) return;
    setOpen(true);
  }, [authLoading, userId, todayQuery.isFetched, todayQuery.data]);

  const handleMoodSelect = async (mood: MoodValue): Promise<void> => {
    if (!userId) return;

    const hadExistingMood = Boolean(todayQuery.data);

    try {
      await upsertMutation.mutateAsync({
        mood,
        entryDate: dateKey,
        userId,
      });
      toast.success(hadExistingMood ? "Mood updated" : "Mood saved for today");
      setOpen(false);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Could not save your mood";
      toast.error(message);
    }
  };

  return (
    <>
      <Tooltip
        content="Today's mood. Click to edit."
        side="bottom"
        sideOffset={8}
        level="header"
      >
        <Button
          type="button"
          variant="icon"
          size="sm"
          aria-label="Today's mood. Click to edit."
          className={cn("w-12 !h-12", className)}
          icon={
            currentMoodOption ? (
              <span className="text-2xl leading-none">
                {currentMoodOption.emoji}
              </span>
            ) : (
              <SmilePlus size={24} />
            )
          }
          onClick={() => setOpen(true)}
        />
      </Tooltip>
      <DailyMoodPopover
        open={open}
        onOpenChange={setOpen}
        value={currentMood}
        isSubmitting={upsertMutation.isPending}
        onMoodSelect={(mood) => void handleMoodSelect(mood)}
      />
    </>
  );
}
