FROM node:14.15.1
RUN npm config set registry https://registry.npm.taobao.org
WORKDIR /web
ADD package.json package-lock.json /web/
RUN npm install
ADD . /web/
RUN npm run build:site

FROM nginx:latest
COPY --from=0 /web/site-dist /usr/share/nginx/html

