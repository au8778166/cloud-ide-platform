FROM node:22-alpine

WORKDIR /app

RUN corepack enable

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
COPY apps ./apps
COPY packages ./packages

RUN pnpm install --filter api-gateway...

WORKDIR /app/apps/api-gateway

EXPOSE 5000

CMD ["pnpm", "start"]