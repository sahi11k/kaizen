import { queryKeys } from "@/shared/constants";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import {
  fetchJournalById,
  fetchJournals,
  fetchJournalsPage,
} from "../apis";
import { JOURNAL_LIST_PAGE_SIZE } from "@/features/journals/constants";

export const useJournalsQuery = (userId?: string) => {
  return useQuery({
    queryKey: queryKeys.journals.all(userId),
    queryFn: () => fetchJournals(userId),
    enabled: !!userId,
  });
};

export const useInfiniteJournalsQuery = (userId?: string) => {
  return useInfiniteQuery({
    queryKey: queryKeys.journals.list(userId),
    queryFn: ({ pageParam }) =>
      fetchJournalsPage(userId, pageParam, JOURNAL_LIST_PAGE_SIZE),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPageParam,
    enabled: !!userId,
  });
};

export const useJournalByIdQuery = (
  journalId?: string,
  userId?: string,
  enabled = true,
) => {
  return useQuery({
    queryKey: queryKeys.journals.detail(userId, journalId),
    queryFn: () => fetchJournalById(journalId, userId),
    enabled: enabled && !!userId && !!journalId,
  });
};
