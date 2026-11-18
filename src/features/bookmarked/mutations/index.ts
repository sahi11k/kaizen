import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/shared/constants';
import {
  createBookmarkedItem,
  updateBookmarkedItem,
  deleteBookmarkedItem,
} from '@/features/bookmarked/apis';
import { upsertById, deleteById } from '@/shared/lib/utils';
import type { BookmarkedItem } from '@/features/bookmarked/types';

function logError(name: string, error: unknown) {
  console.error(`[${name}]`, error);
}

type CreatePayload = {
  item: Omit<BookmarkedItem, 'id' | 'createdAt' | 'updatedAt'>;
  userId: string;
};

type UpdatePayload = {
  id: string;
  item: Partial<BookmarkedItem>;
  userId: string;
};

type DeletePayload = {
  id: string;
  userId: string;
};

export const useCreateBookmarkedItemMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ item }: CreatePayload) => createBookmarkedItem(item),
    onSuccess: (created, variables) => {
      queryClient.setQueryData<BookmarkedItem[]>(
        queryKeys.bookmarked.all(variables.userId),
        (old) => upsertById(old ?? [], created),
      );
    },
    onError: (error, _variables) => {
      logError('useCreateBookmarkedItemMutation', error);
    },
  });
};

export const useUpdateBookmarkedItemMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, item }: UpdatePayload) => updateBookmarkedItem(id, item),
    onSuccess: (updated, variables) => {
      queryClient.setQueryData<BookmarkedItem[]>(
        queryKeys.bookmarked.all(variables.userId),
        (old) => upsertById(old ?? [], updated),
      );
    },
    onError: (error) => {
      logError('useUpdateBookmarkedItemMutation', error);
    },
  });
};

export const useDeleteBookmarkedItemMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: DeletePayload) => deleteBookmarkedItem(id),
    onSuccess: (_res, variables) => {
      queryClient.setQueryData<BookmarkedItem[]>(
        queryKeys.bookmarked.all(variables.userId),
        (old) => deleteById(old ?? [], variables.id),
      );
    },
    onError: (error) => {
      logError('useDeleteBookmarkedItemMutation', error);
    },
  });
};
