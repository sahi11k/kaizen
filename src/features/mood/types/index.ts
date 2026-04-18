export type MoodValue = "very_bad" | "bad" | "okay" | "good" | "great";

export interface MoodOption {
  value: MoodValue;
  emoji: string;
  label: string;
}

export interface DailyMood {
  id: string;
  mood: MoodValue;
  entryDate: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}
