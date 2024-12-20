import { defineConfig, UserConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import path from 'path'
import metadata from "./public/client-metadata.json";
import devServer from '@hono/vite-dev-server';
import nodeAdapter from '@hono/vite-dev-server/node';
import build from '@hono/vite-build/node';

const SERVER_HOST = "127.0.0.1";
const SERVER_PORT = 5173;

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const base = {
    plugins: [
      TanStackRouterVite(),
      react(),

      {
        name: "oauth",
        config(_conf, { command }) {
          if (command === "build") {
            process.env.VITE_OAUTH_CLIENT_ID = metadata.client_id;
            process.env.VITE_OAUTH_REDIRECT_URL = metadata.redirect_uris[0];
          } else {
            const redirectUri = ((): string => {
              const url = new URL(metadata.redirect_uris[0]);
              return `http://${SERVER_HOST}:${SERVER_PORT}${url.pathname}`;
            })();

            const clientId =
              `http://localhost` +
              `?redirect_uri=${encodeURIComponent(redirectUri)}` +
              `&scope=${encodeURIComponent(metadata.scope)}`;

            process.env.VITE_DEV_SERVER_PORT = "" + SERVER_PORT;
            process.env.VITE_OAUTH_CLIENT_ID = clientId;
            process.env.VITE_OAUTH_REDIRECT_URL = redirectUri;
          }

          process.env.VITE_CLIENT_URI = metadata.client_uri;
          process.env.VITE_OAUTH_SCOPE = metadata.scope;
        },
      },
    ],
    build: {
      target: "esnext",
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '~': path.resolve(__dirname, './server'),
      }
    }
  } satisfies UserConfig;

  if (mode === 'client') {
    return {
      ...base,
      build: {
        ...base.build,
        rollupOptions: {
          input: ['./src/main.tsx'],
          output: {
            entryFileNames: 'static/main.js',
            chunkFileNames: 'static/assets/[name]-[hash].js',
            assetFileNames: 'static/assets/[name].[ext]',
          },
        },
        emptyOutDir: false,
        copyPublicDir: false,
      }
    };
  } else {
    return {
      ...base,
      server: {
        host: SERVER_HOST,
        port: SERVER_PORT,
      },
      plugins: [
        devServer({
          entry: './server/index.ts',
          adapter: nodeAdapter,
          injectClientScript: false,
        }),
        build({
          entry: './server/index.ts',
          staticPaths: ['/static'],
          staticRoot: './dist',
          minify: false,
        }),
        ...base.plugins,
      ],
    };
  }
})
