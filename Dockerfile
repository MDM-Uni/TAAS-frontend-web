#stage 1
FROM node:17-alpine as node
WORKDIR /app
COPY . .
RUN npm install --legacy-peer-deps
RUN npm run build
#stage 2
FROM nginx:alpine
EXPOSE 80
COPY --from=node /app/dist/taas-frontend-web /usr/share/nginx/html
