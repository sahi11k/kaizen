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
  status: "pending",
};

export const STATUS_OPTIONS = [
  { value: "pending", label: "Pending" },
  { value: "reading", label: "Reading" },
  { value: "finished", label: "Finished" },
] as const;

export const TYPE_OPTIONS = [
  { value: "book", label: "Book" },
  { value: "link", label: "Link" },
] as const;

export const BOOKMARKED_GROUPS = [
  { status: "reading", label: "Currently Reading" },
  { status: "pending", label: "Want to Read" },
  { status: "finished", label: "Finished Reading" },
] as const;

