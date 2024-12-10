import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";
import DevTools from './rq-devtools';

const getQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        structuralSharing: false,
        retry: false,
      },
    },
  });
};

export const QueryProvider = ({ children }: PropsWithChildren) => {
  return (
    <QueryClientProvider client={getQueryClient()}>
      { children }
      <DevTools />
    </QueryClientProvider>
  );
};
