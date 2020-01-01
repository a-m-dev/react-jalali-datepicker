FROM node:12 as build_csr_image

ARG NODE_ENV
RUN echo ${NODE_ENV}

WORKDIR /app

COPY ./ /app/

RUN npm install 
RUN npm audit fix
RUN npm rebuild node-sass
RUN npm run build:prod


FROM nginx:alpine 
COPY --from=build_csr_image /app/dist/ /usr/share/nginx/html/
ADD ./deploy/nginx-default.conf /etc/nginx/conf.d/default.conf