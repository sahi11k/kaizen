import { useEffect, useRef, useState, type ReactElement } from "react";
import dayjs from "dayjs";
import { DailyMoodPopover } from "@/features/mood/components/DailyMoodPopover";
import { useUpsertDailyMoodMutation } from "@/features/mood/mutations";
import { useTodayMoodQuery } from "@/features/mood/queries";
import type { MoodValue } from "@/features/mood/types";
import { useAuthStore } from "@/features/auth";
import { Toast } from "@/shared/ui";

const { toast } = Toast;

export function JournalDailyMoodPrompt(): ReactElement {
  const { user, isLoading: authLoading } = useAuthStore();
  const userId = user?.id;
  const dateKey = dayjs().format("YYYY-MM-DD");

  const todayQuery = useTodayMoodQuery(userId, dateKey, {
    enabled: Boolean(userId) && !authLoading,
  });

  const upsertMutation = useUpsertDailyMoodMutation();

  const [open, setOpen] = useState(false);
  const [selectedMood, setSelectedMood] = useState<MoodValue | null>(null);
  const hasAutoOpenedRef = useRef(false);

  useEffect(() => {
    if (hasAutoOpenedRef.current) return;
    if (authLoading || !userId) return;
    if (!todayQuery.isFetched) return;
    hasAutoOpenedRef.current = true;
    if (todayQuery.data != null) return;
    setOpen(true);
  }, [authLoading, userId, todayQuery.isFetched, todayQuery.data]);

  useEffect(() => {
    if (!open) return;
    setSelectedMood(todayQuery.data?.mood ?? null);
  }, [open, todayQuery.data?.mood, todayQuery.data?.id]);

  const hasExistingMood = Boolean(todayQuery.data);
  const submitLabel = hasExistingMood ? "Update mood" : "Log mood";

  const handleSubmit = async (): Promise<void> => {
    if (!userId || selectedMood == null) return;
    try {
      await upsertMutation.mutateAsync({
        mood: selectedMood,
        entryDate: dateKey,
        userId,
      });
      toast.success(
        hasExistingMood ? "Mood updated" : "Mood saved for today",
      );
      setOpen(false);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Could not save your mood";
      toast.error(message);
    }
  };

  return (
    <DailyMoodPopover
      open={open}
      onOpenChange={setOpen}
      value={selectedMood}
      onValueChange={setSelectedMood}
      submitLabel={submitLabel}
      isSubmitting={upsertMutation.isPending}
      onSubmit={() => void handleSubmit()}
    />
  );
}
