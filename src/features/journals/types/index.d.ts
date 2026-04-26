import { DEFAULT_JOURNAL_STATE } from "@/features/journals/constants";

export type DefaultJournalState = typeof DEFAULT_JOURNAL_STATE;

export type DefaultJournalKeys = keyof DefaultJournalState;

export type Journal = DefaultJournalState & {
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  /** Legacy column; cleared on save after TipTap migration */
  title?: string;
};
