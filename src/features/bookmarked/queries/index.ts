import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/shared/constants';
import { fetchBookmarkedItems } from '@/features/bookmarked/apis';

export const useBookmarkedQuery = (userId?: string) => {
  return useQuery({
    queryKey: queryKeys.bookmarked.all(userId ?? ''),
    queryFn: () => fetchBookmarkedItems(userId!),
    enabled: !!userId,
  });
};
