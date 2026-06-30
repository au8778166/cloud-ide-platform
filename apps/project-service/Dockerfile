FROM node:22-alpine

WORKDIR /app

RUN corepack enable

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
COPY apps ./apps
COPY packages ./packages

RUN pnpm install --filter project-service...

WORKDIR /app/apps/project-service

# Required only during image build for Prisma
ENV DATABASE_URL=postgresql://postgres:postgres@localhost:5432/cloudide

RUN pnpm prisma generate

EXPOSE 5005

CMD ["pnpm", "start"]