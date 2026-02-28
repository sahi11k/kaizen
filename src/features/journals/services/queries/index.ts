import { queryKeys } from "@/shared/constants/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { fetchJournals } from "../apis";

export const useJournalsQuery = (userId) => {
  return useQuery({
    queryKey: queryKeys.journals.all(userId),
    queryFn: () => fetchJournals(userId),
    enabled: !!userId,
  });
};
