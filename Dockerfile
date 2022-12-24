FROM node:16-alpine3.16 as base

WORKDIR /app

COPY package.json package.json
COPY web/package.json web/package.json
COPY api/package.json api/package.json
COPY yarn.lock yarn.lock
RUN yarn install

COPY redwood.toml .
COPY graphql.config.js .

FROM base as web_build

COPY web web
RUN yarn rw build web

FROM base as api_build

COPY api api
RUN yarn rw build api

FROM node:14-alpine

WORKDIR /app

# Only install API packages to keep image small
COPY api/package.json .

RUN yarn install && yarn add react react-dom @redwoodjs/api-server @redwoodjs/internal prisma

COPY graphql.config.js .
COPY redwood.toml .
COPY api api

COPY --from=web_build /app/web/dist /app/web/dist
COPY --from=api_build /app/api/dist /app/api/dist
COPY --from=api_build /app/api/db /app/api/db
COPY --from=api_build /app/node_modules/.prisma /app/node_modules/.prisma

# Entrypoint to @redwoodjs/api-server binary
CMD [ "yarn", "rw-server", "--port", "8910" ]
