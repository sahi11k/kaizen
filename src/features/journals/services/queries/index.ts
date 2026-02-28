import { useQuery } from "@tanstack/react-query";
import { fetchJournals } from "../apis";

export const useJournalsQuery = (userId) => {
  return useQuery({
    queryKey: ["journals", userId],
    queryFn: async () => {
      const response = await fetchJournals(userId);
      return response.data ?? [];
    },
    enabled: !!userId,
  });
};
