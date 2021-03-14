FROM node:12.13.0 AS builder
WORKDIR /usr/src/app
COPY . .
RUN npm install 
CMD npm run ms:build && npm run ms:watch