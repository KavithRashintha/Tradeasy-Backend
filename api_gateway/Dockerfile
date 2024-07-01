FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install -g @nestjs/cli

COPY . .

RUN npm rebuild bcrypt --build-from-source

RUN npm run build

EXPOSE 9100

CMD [ "npm","run","start:dev" ]