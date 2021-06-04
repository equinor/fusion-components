FROM nikolaik/python-nodejs:latest as build-stage

WORKDIR /app

COPY ./package*.json /app/
RUN npm ci --no-optional

COPY . /app/

WORKDIR /app
RUN npx webpack && npx tsc --emitDeclarationOnly true
RUN ls -l /app/dist

FROM scratch AS export-stage
COPY --from=build-stage /app/dist /