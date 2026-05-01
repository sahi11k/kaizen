import type { MoodOption, MoodValue } from "@/features/mood/types";

/** Display order: most negative → most positive (sad → happy). */
export const MOOD_OPTIONS: readonly MoodOption[] = [
  { value: "very_bad", emoji: "😣", label: "Very Sad" },
  { value: "bad", emoji: "🙁", label: "Sad" },
  { value: "okay", emoji: "😐", label: "Neutral" },
  { value: "good", emoji: "🙂", label: "Happy" },
  { value: "great", emoji: "😄", label: "Very Happy" },
];

export const MOOD_VALUES: readonly MoodValue[] = MOOD_OPTIONS.map(
  (o) => o.value,
);

export const MOOD_FIELD_MAPPING = {
  created_at: "createdAt",
  updated_at: "updatedAt",
  created_by: "createdBy",
  entry_date: "entryDate",
} as const;

export const MOOD_LABELS: Record<MoodValue, string> = MOOD_OPTIONS.reduce(
  (acc, o) => {
    acc[o.value] = `${o.emoji} ${o.label}`;
    return acc;
  },
  {} as Record<MoodValue, string>,
);
