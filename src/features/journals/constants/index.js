export const JOURNAL_DATE_FORMAT = "YYYY-MM-DD";
export const DEFAULT_JOURNAL_ID = "default-journal-id";
export const DATEPICKER_DATE_FORMAT = "dddd, MMMM D, YYYY";

export const DEFAULT_JOURNAL_STATE = {
  title: "",
  content: "",
  date: new Date(),
  wordCount: 0,
  id: "",
};

export const AUTO_SAVE_DEBOUNCE_TIME = 1000;
export const AUTO_SAVE_STATUS = {
  PENDING: "pending",
  SAVING: "saving",
  SAVED: "saved",
  ERROR: "error",
};

export const JOURNAL_CONTENT_TRUNCATION_LENGTH = 180;

export const JOURNAL_FIELD_MAPPING = {
  created_at: "createdAt",
  updated_at: "updatedAt",
  created_by: "createdBy",
  word_count: "wordCount",
};
