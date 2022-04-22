FROM node:16.14-alpine

WORKDIR /app

COPY client/package.json client/package.json
COPY server/package.json server/package.json
COPY package.json package.json
COPY yarn.lock yarn.lock

RUN yarn install --silent --ignore-optional && yarn cache clean

COPY client client
COPY server server

RUN yarn workspace client build

RUN cp -r client/build server

USER node

CMD ["node", "server/src/server.js"]
