FROM node:16-slim as base

RUN apt-get update
RUN apt-get install -y openssl

WORKDIR /app


# Install dependencies

COPY package.json package.json
COPY web/package.json web/package.json
COPY api/package.json api/package.json
COPY yarn.lock yarn.lock
RUN yarn install

COPY redwood.toml .
COPY graphql.config.js .


# Build web

FROM base as web_build

COPY web web
RUN yarn rw build web


# Build api

FROM base as api_build

COPY api api
RUN yarn rw build api


# Start app

FROM node:16-slim

WORKDIR /app

COPY api/package.json .

RUN yarn install && yarn add react react-dom @redwoodjs/api-server @redwoodjs/internal prisma

COPY graphql.config.js .
COPY redwood.toml .
COPY api api

COPY --from=web_build /app/web/dist /app/web/dist
COPY --from=api_build /app/api/dist /app/api/dist
COPY --from=api_build /app/api/db /app/api/db
COPY --from=api_build /app/node_modules/.prisma /app/node_modules/.prisma

CMD [ "yarn", "rw-server", "--port", "8910" ]
