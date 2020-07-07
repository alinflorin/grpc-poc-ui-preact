FROM node:lts-alpine as node
WORKDIR /app
COPY ./package.json ./
COPY ./package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM abiosoft/caddy
COPY --from=node /app/build /srv
