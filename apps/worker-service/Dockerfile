FROM node:22-alpine

WORKDIR /app

RUN apk add --no-cache docker-cli

RUN corepack enable

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
COPY apps ./apps
COPY packages ./packages

RUN pnpm install

WORKDIR /app/apps/worker-service

CMD ["pnpm", "start"]