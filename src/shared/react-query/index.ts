import { QueryClient } from "@tanstack/react-query";

const STALE_TIME = 1000 * 60 * 5;

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: STALE_TIME,
      retry: (failureCount, error) => {
        const status = (error as any)?.status;
        if (typeof status === "number" && status >= 400 && status < 500)
          return false;
        return failureCount < 2;
      },
    },
  },
});
