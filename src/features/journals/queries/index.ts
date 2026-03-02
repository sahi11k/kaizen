import { queryKeys } from "@/shared/constants";
import { useQuery } from "@tanstack/react-query";
import { fetchJournals } from "../apis";

export const useJournalsQuery = (userId?: string) => {
  return useQuery({
    queryKey: queryKeys.journals.all(userId),
    queryFn: () => fetchJournals(userId),
    enabled: !!userId,
  });
};
