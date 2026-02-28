import { transformKeys, reverseMapping } from "@/shared/transformers/common";

const JOURNAL_FIELD_MAPPING = {
  created_at: "createdAt",
  updated_at: "updatedAt",
  created_by: "createdBy",
  word_count: "wordCount",
};

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
