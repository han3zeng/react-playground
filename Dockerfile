FROM node:16-slim

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --only=production
COPY . ./
RUN npm run build

CMD [ "npm", "start" ]
