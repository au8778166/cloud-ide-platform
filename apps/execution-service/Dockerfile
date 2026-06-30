FROM node:22-alpine

WORKDIR /app

RUN corepack enable

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
COPY apps ./apps
COPY packages ./packages

RUN pnpm install --filter execution-service...

WORKDIR /app/apps/execution-service

EXPOSE 5004

CMD ["pnpm", "start"]