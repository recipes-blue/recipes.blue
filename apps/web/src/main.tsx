import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { routeTree } from './routeTree.gen';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { XrpcContext } from './hooks/use-xrpc';
import { CredentialManager, XRPC } from '@atcute/client';
import { SERVER_URL } from './lib/utils';
import './index.css'

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const creds = new CredentialManager({ service: `https://${SERVER_URL}` });
const rpc = new XRPC({ handler: creds });
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      structuralSharing: false,
      retry: false,
    }
  }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <XrpcContext.Provider value={{ creds, rpc }}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </XrpcContext.Provider>
  </StrictMode>,
)
