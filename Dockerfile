FROM hairyhenderson/gomplate:v3.9.0-slim as gomplate

FROM node:14.17.0-buster-slim AS node-base

ENV NODE_ENV=production
ENV DEBUG=false

# Use apt-get rather than apt in scripts
RUN apt-get update
RUN apt-get -y upgrade
RUN apt-get install -y python3 make gcc g++

FROM node-base AS builder

COPY --from=gomplate /gomplate /bin/gomplate

WORKDIR /templates
COPY templates/.env.tmpl ./

WORKDIR /panzerbot

RUN apt-get install -y git

COPY ./package.json ./
COPY ./yarn.lock ./
COPY ./dist ./dist

RUN yarn install

RUN /bin/gomplate --input-dir=/templates --output-map='/panzerbot/{{ .in | strings.ReplaceAll ".tmpl" "" }}'

FROM node-base AS panzerbot

WORKDIR /panzerbot
COPY --from=builder /panzerbot .

ENTRYPOINT yarn start
