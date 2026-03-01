import { JOURNAL_FIELD_MAPPING } from "@/features/journals/constants";
import { transformKeys, reverseMapping } from "@/shared/lib/transformers";

export const transformJournalFromDb = (journal) => {
  return transformKeys(journal, JOURNAL_FIELD_MAPPING);
};

export const transformJournalsFromDb = (journals) => {
  if (!journals || !Array.isArray(journals)) {
    return [];
  }
  return journals.map(transformJournalFromDb);
};

export const transformJournalToDb = (journal) => {
  return transformKeys(journal, reverseMapping(JOURNAL_FIELD_MAPPING));
};
