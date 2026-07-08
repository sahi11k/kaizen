import { supabase, SUPABASE_TABLES } from "@/shared/supabase";
import {
  toBookmarkedItem,
  toBookmarkedItems,
  toDbBookmarkedItem,
} from "@/features/bookmarked/utils/transformers";
import type { BookmarkedItem } from "@/features/bookmarked/types";

export const fetchBookmarkedItems = async (
  userId: string,
): Promise<BookmarkedItem[]> => {
  const { data, error } = await supabase
    .from(SUPABASE_TABLES.BOOKMARKED_ITEMS)
    .select("*")
    .eq("created_by", userId)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return toBookmarkedItems(data);
};

export const createBookmarkedItem = async (
  item: Omit<BookmarkedItem, "id" | "createdAt" | "updatedAt">,
): Promise<BookmarkedItem> => {
  const dbItem = toDbBookmarkedItem(item as Partial<BookmarkedItem>);
  const { data, error } = await supabase
    .from(SUPABASE_TABLES.BOOKMARKED_ITEMS)
    .insert(dbItem)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return toBookmarkedItem(data);
};

export const updateBookmarkedItem = async (
  id: string,
  item: Partial<BookmarkedItem>,
): Promise<BookmarkedItem> => {
  const dbItem = toDbBookmarkedItem(item);
  const { data, error } = await supabase
    .from(SUPABASE_TABLES.BOOKMARKED_ITEMS)
    .update(dbItem)
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return toBookmarkedItem(data);
};

export const deleteBookmarkedItem = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from(SUPABASE_TABLES.BOOKMARKED_ITEMS)
    .delete()
    .eq("id", id);

  if (error) throw new Error(error.message);
};
