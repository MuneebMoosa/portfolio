FROM node:24-alpine AS build

WORKDIR /app

ARG VITE_API_URL=http://localhost:8000/api
ARG VITE_AI_API_URL=http://localhost:8001
ARG VITE_SERVICE=
ARG VITE_TEMPLATE=
ARG VITE_PUBLIC=

ENV VITE_API_URL=$VITE_API_URL \
    VITE_AI_API_URL=$VITE_AI_API_URL \
    VITE_SERVICE=$VITE_SERVICE \
    VITE_TEMPLATE=$VITE_TEMPLATE \
    VITE_PUBLIC=$VITE_PUBLIC

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
