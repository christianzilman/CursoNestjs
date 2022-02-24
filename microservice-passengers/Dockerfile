FROM node:16 As development

WORKDIR /app

COPY package.json .

RUN npm install

COPY ./dist ./rsc

CMD ["node", "src/main.js"]


