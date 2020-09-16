# Dockerfile

# base image
FROM registry.art.rambler.ru/base/node:13-build AS stage-1
# FROM node:13 AS stage-1

# create & set working directory
RUN mkdir -p /usr/src
WORKDIR /usr/src

COPY package.json package-lock.json .config/.npmrc ./
# COPY package.json package-lock.json ./

RUN npm install

# copy source files
COPY . /usr/src

# build app
RUN npm run build

FROM registry.art.rambler.ru/base/node:13
# FROM node:13

RUN mkdir -p /usr/app
WORKDIR /usr/app
COPY --from=stage-1 /usr/src/.next ./.next
COPY --from=stage-1 /usr/src/public ./public
COPY --from=stage-1 /usr/src/next.config.js ./
COPY --from=stage-1 /usr/src/package.json ./
COPY --from=stage-1 /usr/src/package-lock.json  ./
COPY --from=stage-1 /usr/src/.npmrc ./

RUN npm install --only=prod

EXPOSE 3000
CMD ["node_modules/.bin/next", "start"]
