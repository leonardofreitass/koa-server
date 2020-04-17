# ---- Base ----
#
FROM node:12-alpine AS base
WORKDIR /app

COPY package*.json ./
RUN apk --no-cache add --update bash

# ---- Dev-Dependencies ----
#
FROM base AS dev-dependencies
RUN npm install --quiet
ENV PORT 3030
EXPOSE 3030

# ---- Test ----
#
FROM dev-dependencies AS test
ENV NODE_ENV test
CMD [ "npm", "t" ]

# ---- Dev ----
#
FROM dev-dependencies AS dev
ENV NODE_ENV development
EXPOSE 9229
CMD [ "npm", "run", "watch" ]

# ---- Release ----
#
FROM base AS release
ENV NODE_ENV production
RUN npm ci --only=production
ENV PORT 80
ENV HOST 0.0.0.0
EXPOSE 80
CMD [ "node", "index.js" ]
