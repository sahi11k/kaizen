import { MOOD_FIELD_MAPPING } from "@/features/mood/constants";
import type { DailyMood, MoodValue } from "@/features/mood/types";
import { transformKeys, reverseMapping } from "@/shared/lib/transformers";

export function transformDailyMoodFromDb(
  row: Record<string, unknown>,
): DailyMood {
  const mapped = transformKeys(row, MOOD_FIELD_MAPPING) as Record<
    string,
    unknown
  >;
  return {
    id: String(mapped.id),
    mood: mapped.mood as MoodValue,
    entryDate: String(mapped.entryDate),
    createdBy: String(mapped.createdBy),
    createdAt: String(mapped.createdAt),
    updatedAt: String(mapped.updatedAt),
  };
}

export function transformDailyMoodToDb(
  mood: Partial<DailyMood>,
): Record<string, unknown> {
  const mapping = MOOD_FIELD_MAPPING as unknown as Record<string, string>;
  return transformKeys({ ...mood } as Record<string, unknown>, reverseMapping(mapping));
}
