import type { BookmarkedItemFormState } from "@/features/bookmarked/types";

export const BOOKMARKED_FIELD_MAPPING: Record<string, string> = {
  created_at: "createdAt",
  updated_at: "updatedAt",
  created_by: "createdBy",
};

export const DEFAULT_BOOKMARKED_FORM_STATE: BookmarkedItemFormState = {
  type: "book",
  title: "",
  url: "",
  author: "",
  notes: "",
  tags: "",
  status: "want_to_read",
};

export const STATUS_OPTIONS = [
  { value: "want_to_read", label: "Want to Read" },
  { value: "reading", label: "Reading" },
  { value: "finished", label: "Finished" },
] as const;

export const TYPE_OPTIONS = [
  { value: "book", label: "Book" },
  { value: "link", label: "Link" },
] as const;

