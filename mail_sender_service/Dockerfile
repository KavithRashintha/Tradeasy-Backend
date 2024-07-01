FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install -g @nestjs/cli

RUN npm install @css-inline/css-inline-linux-x64-gnu

RUN npm rebuild bcrypt --build-from-source

COPY . .

RUN npm rebuild bcrypt --build-from-source

RUN npm run build

EXPOSE 8011
EXPOSE 9011

CMD ["npm", "run", "start:dev"]
