FROM node:latest
WORKDIR /discord
COPY package*.json /discord/
RUN npm install

COPY ./ /discord/
CMD ["node", "app.js"]