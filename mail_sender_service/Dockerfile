FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm rebuild bcrypt --build-from-source

RUN npm run build

EXPOSE 9011

CMD ["npm", "run", "start:dev"]
