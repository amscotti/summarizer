# syntax=docker/dockerfile:1

# --- Build stage (Alpine): install deps and compile the CLI with Bun ---
ARG BUN_VERSION=1.2.19
FROM oven/bun:${BUN_VERSION}-alpine AS build
WORKDIR /app

# Install dependencies with maximum cache efficiency
COPY package.json bun.lockb tsconfig.json ./
RUN bun install --ci

# Copy source
COPY src ./src

# Build the CLI into a single executable (musl-linked)
# Output: /app/summarizer
RUN bun build src/cli.ts --compile --outfile summarizer

# --- Runtime stage (Alpine): minimal image with CA certs and C++ runtime ---
FROM alpine:3.20 AS runtime

# Install root certs and C++ runtime deps for the compiled binary
RUN apk add --no-cache \
      ca-certificates \
      libstdc++ \
      libgcc

# Add unprivileged user
RUN adduser -D -u 10001 appuser
USER appuser
WORKDIR /app

# Copy compiled binary
COPY --from=build /app/summarizer /usr/local/bin/summarizer

# Use the compiled CLI as entrypoint; args are passed through
ENTRYPOINT ["summarizer"]
