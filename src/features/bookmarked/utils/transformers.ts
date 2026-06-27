import { transformKeys, reverseMapping } from '@/shared/lib/transformers';
import { BOOKMARKED_FIELD_MAPPING } from '@/features/bookmarked/constants';
import type { BookmarkedItem } from '@/features/bookmarked/types';

export const toBookmarkedItem = (row: Record<string, unknown>): BookmarkedItem => {
  return transformKeys(row, BOOKMARKED_FIELD_MAPPING) as unknown as BookmarkedItem;
};

export const toBookmarkedItems = (rows: Record<string, unknown>[] | null): BookmarkedItem[] => {
  if (!rows || !Array.isArray(rows)) return [];
  return rows.map(toBookmarkedItem);
};

export const toDbBookmarkedItem = (item: Partial<BookmarkedItem>): Record<string, unknown> => {
  return transformKeys(item as Record<string, unknown>, reverseMapping(BOOKMARKED_FIELD_MAPPING));
};
