FROM node:20-bookworm-slim

RUN corepack enable

RUN apt-get update && apt-get install -y \
  openssl \
  && rm -rf /var/lib/apt/lists/*

USER node
WORKDIR /home/node/app

COPY --chown=node:node .yarnrc.yml .
COPY --chown=node:node package.json .
COPY --chown=node:node api/package.json api/
COPY --chown=node:node web/package.json web/
COPY --chown=node:node yarn.lock .
COPY --chown=node:node api api
COPY --chown=node:node web web
COPY --chown=node:node scripts ./scripts/
COPY --chown=node:node redwood.toml .
COPY --chown=node:node graphql.config.js .

RUN mkdir -p /home/node/.yarn/berry/index
RUN mkdir -p /home/node/.cache

ENV NODE_ENV=production

RUN yarn install
RUN yarn build

CMD [ "yarn", "start" ]
