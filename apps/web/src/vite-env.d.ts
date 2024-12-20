/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
/// <reference types="vite/client" />
/// <reference types="@cookware/lexicons" />
/// <reference types="@atcute/bluesky/lexicons" />

interface ImportMetaEnv {
  readonly VITE_API_SERVICE: string;
  readonly VITE_DEV_SERVER_PORT?: string;
  readonly VITE_CLIENT_URI: string;
  readonly VITE_OAUTH_CLIENT_ID: string;
  readonly VITE_OAUTH_REDIRECT_URL: string;
  readonly VITE_OAUTH_SCOPE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
