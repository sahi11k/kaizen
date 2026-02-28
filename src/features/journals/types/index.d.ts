import { DEFAULT_JOURNAL_STATE } from "@/features/journals/constants/journals";

export type DefaultJournalState = typeof DEFAULT_JOURNAL_STATE;

export type DefaultJournalKeys = keyof DefaultJournalState;

export type Journal = DefaultJournalState & {
  createdAt: string;
  createdBy: string;
  updatedAt: string;
};
