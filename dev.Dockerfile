FROM node:14-alpine

WORKDIR /app

COPY ./package*.json /app/
RUN npm i 

COPY ./tsconfig.json .
COPY ./.eslintrc.js .
COPY ./css-modules.d.ts .