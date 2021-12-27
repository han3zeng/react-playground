FROM node:16-slim as base

WORKDIR /usr/src/app

COPY package*.json ./

FROM base as test
RUN npm ci
COPY . .
RUN npm run test

FROM base as prod
RUN npm ci
COPY . ./
RUN npm run build

CMD [ "npm", "start" ]
