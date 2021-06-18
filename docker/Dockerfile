FROM node:14.17.0-buster-slim AS node-base

RUN apt update
RUN apt -y upgrade
RUN apt install -y python3 make gcc g++

FROM node-base AS builder

ENV NODE_ENV=production

WORKDIR /panzerbot

RUN apt install -y git

COPY ../package.json ./
COPY ../yarn.lock ./
COPY ../dist ./dist

RUN yarn install

FROM node-base AS panzerbot

ENV NODE_ENV=production

WORKDIR /panzerbot

COPY --from=builder /panzerbot ./

ENTRYPOINT yarn start
