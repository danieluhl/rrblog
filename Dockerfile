FROM node:20-slim AS development-dependencies-env
RUN corepack enable
ENV PNPM_HOME="/pnpm" 
ENV PATH="$PNPM_HOME:$PATH"
COPY . /app
WORKDIR /app
RUN pnpm install --frozen-lockfile

FROM node:20-slim AS production-dependencies-env
RUN corepack enable
ENV PNPM_HOME="/pnpm" 
ENV PATH="$PNPM_HOME:$PATH"
COPY ./package.json pnpm-lock.yaml /app/
WORKDIR /app
RUN pnpm install --frozen-lockfile

FROM node:20-slim AS build-env
RUN corepack enable
ENV PNPM_HOME="/pnpm" 
ENV PATH="$PNPM_HOME:$PATH"
COPY . /app/
COPY --from=development-dependencies-env /app/node_modules /app/node_modules
WORKDIR /app
RUN pnpm run build

FROM node:20-slim
RUN corepack enable
ENV PNPM_HOME="/pnpm" 
ENV PATH="$PNPM_HOME:$PATH"
COPY ./package.json pnpm-lock.yaml /app/
COPY --from=production-dependencies-env /app/node_modules /app/node_modules
COPY --from=build-env /app/build /app/build
WORKDIR /app
CMD ["pnpm", "run", "start"]
