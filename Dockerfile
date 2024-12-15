FROM node:22-slim AS base
COPY --from=oven/bun:1 /usr/local/bin/bun /usr/local/bin/bun

FROM base AS build
WORKDIR /usr/src/app
COPY . .
RUN bun install
RUN bun run build

FROM build AS end

ENV NODE_ENV=production
ENV ENV=production
