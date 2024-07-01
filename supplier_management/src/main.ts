import * as dotenv from "dotenv";
import {join} from "path";

dotenv.config({ path: join(__dirname, '../.env') });

import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      host: '127.0.0.1',
      port: 9006,
    },
  });

  app.enableCors();

  await app.startAllMicroservices();
  await app.listen(8006);
  console.log(`App is running on port ${await app.getUrl()}`);
}

bootstrap();
