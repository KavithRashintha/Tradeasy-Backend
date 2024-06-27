FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN  npm run build

EXPOSE 9003

CMD [ "npm", "run", "start:dev" ]