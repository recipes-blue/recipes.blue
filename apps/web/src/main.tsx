import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { routeTree } from './routeTree.gen';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { configureOAuth } from '@atcute/oauth-browser-client';
import './index.css'
import { AuthProvider, useAuth } from './state/auth';
import { ThemeProvider } from './components/theme-provider';

const router = createRouter({
  routeTree,
  context: {
    auth: undefined!,
  },
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

configureOAuth({
	metadata: {
    client_id: import.meta.env.VITE_OAUTH_CLIENT_ID,
    redirect_uri: import.meta.env.VITE_OAUTH_REDIRECT_URL,
	},
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      structuralSharing: false,
      retry: false,
    }
  }
});

const InnerApp = () => {
  const auth = useAuth();
  return <RouterProvider router={router} context={{ auth }} />
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="recipes-theme">
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <InnerApp />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>,
)
