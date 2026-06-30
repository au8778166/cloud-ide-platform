FROM node:22-alpine

WORKDIR /app

RUN corepack enable

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
COPY apps ./apps
COPY packages ./packages

RUN pnpm install --filter auth-service...

WORKDIR /app/apps/auth-service

# Required only during image build for Prisma
ENV DATABASE_URL=postgresql://postgres:postgres@localhost:5432/cloudide

RUN pnpm prisma generate

EXPOSE 5001

CMD ["pnpm", "start"]