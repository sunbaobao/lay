FROM node:14
COPY ./ /usr/local/app
WORKDIR /usr/local/app
RUN npm i --registry=https://registry.npm.taobao.org
ENV NODE_ENV dev
EXPOSE 3000
CMD [ "npm", "start" ]