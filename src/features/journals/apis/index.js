import { supabase, SUPABASE_TABLES } from "@/shared/supabase";
import { parseApiResponse, ApiError } from "@/shared/lib/api";
import dayjs from "dayjs";
import {
  transformJournalsFromDb,
  transformJournalToDb,
} from "@/features/journals/utils";
import {
  JOURNAL_DATE_FORMAT,
  JOURNAL_IMAGES_STORAGE_BUCKET,
  JOURNAL_IMAGE_MIME_TO_EXT,
  JOURNAL_IMAGE_SIGNED_URL_EXPIRY_SEC,
  JOURNAL_STORAGE_SIGNED_URL_PATH_REGEX,
} from "@/features/journals/constants";

/**
 * Uploads an image file to Supabase Storage under `{userId}/{journalId}/{uuid}.ext` in the journal images bucket.
 * and returns a long-lived signed URL.
 * @param {File|Blob} file - The (possibly compressed) image file
 * @param {string} userId
 * @param {string} journalId
 * @param {string} [mimeType] - Original MIME type; falls back to file.type
 */
export const uploadJournalImage = async (file, userId, journalId, mimeType) => {
  if (!userId) throw new ApiError("User authentication required");
  if (!journalId) throw new ApiError("Journal ID required");

  const type = mimeType || file.type;
  const ext = JOURNAL_IMAGE_MIME_TO_EXT[type];
  if (!ext) throw new Error(`Unsupported file type: ${type}`);

  const path = `${userId}/${journalId}/${crypto.randomUUID()}.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from(JOURNAL_IMAGES_STORAGE_BUCKET)
    .upload(path, file, { contentType: type });

  if (uploadError) throw new Error(`Upload failed: ${uploadError.message}`);

  const { data, error: urlError } = await supabase.storage
    .from(JOURNAL_IMAGES_STORAGE_BUCKET)
    .createSignedUrl(path, JOURNAL_IMAGE_SIGNED_URL_EXPIRY_SEC);

  if (urlError) throw new Error(`Failed to get image URL: ${urlError.message}`);

  return data.signedUrl;
};

/**
 * Extracts the storage object path from a Supabase signed URL.
 * Signed URL pattern: .../object/sign/<bucket>/<path>?token=...
 * @param {string} signedUrl
 * @returns {string|null} The path inside the bucket, or null if not parseable
 */
export const extractStoragePathFromSignedUrl = (signedUrl) => {
  try {
    const url = new URL(signedUrl);
    // pathname: /storage/v1/object/sign/<bucket>/<path...>
    const match = url.pathname.match(JOURNAL_STORAGE_SIGNED_URL_PATH_REGEX);
    return match ? match[1] : null;
  } catch {
    return null;
  }
};

/**
 * Deletes one or more images from the journal images storage bucket.
 * Paths should be in the format `{userId}/{journalId}/{filename}`.
 * @param {string[]} paths - Storage object paths to delete
 */
export const deleteJournalImages = async (paths) => {
  if (!paths || paths.length === 0) return;

  const { error } = await supabase.storage
    .from(JOURNAL_IMAGES_STORAGE_BUCKET)
    .remove(paths);

  if (error) throw new Error(`Failed to delete image(s): ${error.message}`);
};

export const fetchJournals = async (userId) => {
  const response = await supabase
    .from(SUPABASE_TABLES.JOURNALS)
    .select("*")
    .eq("created_by", userId);

  const res = parseApiResponse({ response });
  return transformJournalsFromDb(res.data ?? []);
};

export const deleteJournal = async (journalId, userId) => {
  if (!userId) throw new ApiError("User authentication required");

  const response = await supabase
    .from(SUPABASE_TABLES.JOURNALS)
    .delete()
    .eq("id", journalId)
    .eq("created_by", userId)
    .select();

  const status =
    response.status === 200 && response.data.length === 0
      ? 404
      : response.status;
  parseApiResponse({
    response: { ...response, status },
    errorMessage: "Journal not found or you don't have permission to delete it",
  });
};

/** Ensure `journals_master.content` is `text` or `jsonb` with enough size for TipTap JSON. */
export const saveJournal = async (payload = {}, userId) => {
  if (!userId) throw new ApiError("User authentication required");

  const dbPayload = transformJournalToDb(payload);
  const payloadToUpsert = {
    ...dbPayload,
    created_by: userId,
    date: dayjs(dbPayload.date).format(JOURNAL_DATE_FORMAT),
  };
  /* Omit so PostgREST does not pin a stale value; DB trigger sets `updated_at` on UPDATE. */
  delete payloadToUpsert.updated_at;

  const response = await supabase
    .from(SUPABASE_TABLES.JOURNALS)
    .upsert(payloadToUpsert, {
      onConflict: "id",
    })
    .select();

  const res = parseApiResponse({
    response,
    errorMessage: "Failed to save journal",
  });
  return transformJournalsFromDb(res.data ?? []);
};
