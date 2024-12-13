import { QueryClient } from "@tanstack/react-query";

export const getQueryClient = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        structuralSharing: false,
        retry: false,
      },
    },
  });

  return queryClient;
};
