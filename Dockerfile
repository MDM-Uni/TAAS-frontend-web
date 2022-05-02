#stage 1
FROM node:17-alpine as node
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build
#stage 2
FROM nginx:alpine
EXPOSE 80
COPY --from=node /app/dist/taas-frontend-web /usr/share/nginx/html
