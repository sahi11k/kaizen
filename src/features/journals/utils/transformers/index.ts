import { JOURNAL_FIELD_MAPPING } from "@/features/journals/constants";
import { transformKeys, reverseMapping } from "@/shared/lib/transformers";

export const transformJournalFromDb = (journal: Record<string, unknown>): Record<string, unknown> => {
  return transformKeys(journal, JOURNAL_FIELD_MAPPING);
};

export const transformJournalsFromDb = (journals: Record<string, unknown>[] | null): Record<string, unknown>[] => {
  if (!journals || !Array.isArray(journals)) {
    return [];
  }
  return journals.map(transformJournalFromDb);
};

export const transformJournalToDb = (journal: Record<string, unknown>): Record<string, unknown> => {
  return transformKeys(journal, reverseMapping(JOURNAL_FIELD_MAPPING));
};
