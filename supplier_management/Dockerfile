FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm rebuild bcrypt --build-from-source

RUN  npm run build

EXPOSE 9006

CMD [ "npm", "run", "start:dev" ]