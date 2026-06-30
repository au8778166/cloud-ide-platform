FROM node:22-alpine

WORKDIR /app

RUN corepack enable

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
COPY apps ./apps
COPY packages ./packages

RUN pnpm install --filter frontend...

WORKDIR /app/apps/frontend

EXPOSE 5173

CMD ["pnpm", "dev", "--host"]