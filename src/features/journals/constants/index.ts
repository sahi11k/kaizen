export const JOURNAL_DATE_FORMAT = "YYYY-MM-DD";
export const DATEPICKER_DATE_FORMAT = "dddd, MMMM D, YYYY";

/** Date row + save status: matches PageHeader subtitle styling (body-base !text-sm). */
export const JOURNAL_META_ROW_TEXT_CLASS =
  "body-base !text-sm";

export const DEFAULT_JOURNAL_STATE = {
  content: "",
  date: new Date(),
  wordCount: 0,
  id: "",
  title: "",
};

export const AUTO_SAVE_DEBOUNCE_TIME = 1000;
export const AUTO_SAVE_STATUS = {
  PENDING: "pending",
  SAVING: "saving",
  SAVED: "saved",
  ERROR: "error",
};

export const JOURNAL_CONTENT_TRUNCATION_LENGTH = 180;

export const JOURNAL_LIST_PAGE_SIZE = 10;

/** Server default when `title` is empty; treat as blank in the editor title field. */
export const JOURNAL_DEFAULT_BACKEND_TITLE = "Untitled Journal";

/** Sticky day title row above journal body (see JournalEditor). */
export const JOURNAL_DAY_TITLE_PLACEHOLDER = "Give your day a title?";

/** Empty journal body (first-block placeholder in shared TipTapEditor). */
export const JOURNAL_EDITOR_BODY_PLACEHOLDER = "Write about your day.";

export const JOURNAL_FIELD_MAPPING = {
  created_at: "createdAt",
  updated_at: "updatedAt",
  created_by: "createdBy",
  word_count: "wordCount",
};

/** Supabase Storage bucket for journal inline images. */
export const JOURNAL_IMAGES_STORAGE_BUCKET = "journals-images";

/** Signed URL TTL in seconds (~10 years). */
export const JOURNAL_IMAGE_SIGNED_URL_EXPIRY_SEC = 315360000;

/** Allowed image MIME types for upload; maps to file extension in storage paths. */
export const JOURNAL_IMAGE_MIME_TO_EXT: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/gif": "gif",
  "image/webp": "webp",
};

/**
 * Matches pathname `/storage/v1/object/sign/<bucket>/<path>` on Supabase signed URLs.
 * Capture group 1 is the object path inside the bucket.
 */
export const JOURNAL_STORAGE_SIGNED_URL_PATH_REGEX =
  /\/storage\/v1\/object\/sign\/[^/]+\/(.+)/;
