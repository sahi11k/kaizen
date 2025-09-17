export const JOURNAL_DATE_FORMAT = "YYYY-MM-DD";
export const DEFAULT_JOURNAL_ID = "default-journal-id";
export const DATEPICKER_DATE_FORMAT = "dddd, MMMM D, YYYY";

export const DEFAULT_JOURNAL_STATE = {
  title: "",
  content: "",
  date: new Date(),
};

export const AUTO_SAVE_DEBOUNCE_TIME = 1000;
export const AUTO_SAVE_STATUS = {
  PENDING: "pending",
  SAVING: "saving",
  SAVED: "saved",
  ERROR: "error",
};

export const JOURNAL_CONTENT_TRUNCATION_LENGTH = 180;
