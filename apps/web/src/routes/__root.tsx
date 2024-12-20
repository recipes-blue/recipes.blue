import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AuthContextType } from "@/state/auth";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import "../index.css";
import { configureOAuth } from "@atcute/oauth-browser-client";
import { Meta, Scripts } from "@tanstack/start";
import { Providers } from '@/providers';

if (typeof window !== "undefined") {
  configureOAuth({
    metadata: {
      client_id: import.meta.env.VITE_OAUTH_CLIENT_ID,
      redirect_uri: import.meta.env.VITE_OAUTH_REDIRECT_URL,
    },
  });
}

type RootContext = {
  auth: AuthContextType;
};

export const Route = createRootRouteWithContext<RootContext>()({
  component: RootComponent,
  head: () => ({
    meta: [
      {
        title: "Recipes",
      },
      {
        charSet: "UTF-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1.0",
      },
    ],
    links: import.meta.env.PROD
      ? [ { rel: 'stylesheet', href: '/static/assets/main.css' } ]
      : [],
    scripts: import.meta.env.PROD
      ? [
        { type: "module", src: "/static/main.js" },
      ]
      : [
        {
          type: "module",
          children: `import RefreshRuntime from "/@react-refresh"
RefreshRuntime.injectIntoGlobalHook(window)
window.$RefreshReg$ = () => {}
window.$RefreshSig$ = () => (type) => type
window.__vite_plugin_react_preamble_installed__ = true`,
        },
        {
          type: "module",
          src: "/@vite/client",
        },
        {
          type: "module",
          src: "/src/main.tsx",
        },
      ],
  }),
});

function RootComponent() {
  return (
    <html>
      <head>
        <Meta />
      </head>
      <body>
        <Providers>
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
              <Outlet />
            </SidebarInset>
          </SidebarProvider>
        </Providers>

        <TanStackRouterDevtools position="bottom-right" />
        <Scripts />
      </body>
    </html>
  );
}
