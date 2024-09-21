

# https://dev.to/sliplane/understanding-nextjs-docker-images-2g08

# 1: The base image that the rest is built upon
FROM node:20-alpine AS base

# 2: Dependency installation installs some libraries that the very small node alpine
# image might be missing and then the apps' dependencies. 
FROM base AS deps
# This is first the possible installation for missing alpine libraries
RUN apk add --no-cache libc6-compat
WORKDIR /app
# And then this is the installation of the app's dependencies
COPY package.json package-lock.json* ./
RUN npm ci

# 3: Next.js build 
# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
# First we copy only the node modules from the previous stage (or image layer)
COPY --from=deps /app/node_modules ./node_modules
# Then we copy the rest of the application (and if we have not change the dependencies,
# we only need to rebuild from this step on)
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
# ENV NEXT_TELEMETRY_DISABLED=1

# RUN \
#     if [ -f yarn.lock ]; then yarn run build; \
#     elif [ -f package-lock.json ]; then npm run build; \
#     elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build; \
#     else echo "Lockfile not found." && exit 1; \
#     fi
RUN npm run build

# 4: Starting the server (the runtime)
# We start a new image layer
FROM base AS runner
WORKDIR /app
# When setting to production, performance improves.
ENV NODE_ENV=production
# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED=1

# We create a new user group and user to improve security. We do not want our app
# to run as root but rather give it only the permissions it needs.
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
# # Here we switch to the new user (with least possible privileges) we created above
# USER nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size 
# You need to set ouput in next.config.js!!! https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Here we switch to the new user (with least possible privileges) we created above
USER nextjs

EXPOSE 3000

ENV PORT=3000

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
ENV HOSTNAME="0.0.0.0"
# This is a different command from the package.json start script because we have
# created a standalone output version
CMD ["node", "server.js"]