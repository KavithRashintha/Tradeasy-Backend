FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install -g @nestjs/cli

COPY . .

RUN  npm run build

EXPOSE 8002
EXPOSE 9002

CMD [ "npm", "run", "start:dev" ]