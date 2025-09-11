export const JOURNAL_DATE_FORMAT = "YYYY-MM-DD";
export const DEFAULT_JOURNAL_ID = "default-journal-id";

export const DEFAULT_JOURNAL_STATE = {
  title: "",
  content: "",
  date: new Date(),
  id: DEFAULT_JOURNAL_ID,
};

export const AUTO_SAVE_DEBOUNCE_TIME = 1500;
export const AUTO_SAVE_STATUS = {
  PENDING: "pending",
  SAVING: "saving",
  SAVED: "saved",
  ERROR: "error",
};
