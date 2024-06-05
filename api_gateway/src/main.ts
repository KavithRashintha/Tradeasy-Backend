import * as dotenv from "dotenv";
import {join} from "path";

dotenv.config({ path: join(__dirname, '../../.env') });

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters/custom-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors({
    origin: ['http://localhost:3000','https://vercel.com/mrsilents-projects/sales-and-inventory-management-system-u4vo/EchcgdbbiNgVUzZ4n2ZauJMvuher'], // Allow requests from this origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allow these HTTP methods
    allowedHeaders: 'Content-Type,Authorization', // Allow these headers
  });

  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(9000);
  console.log(`App is running on port ${await app.getUrl()}`);
}
bootstrap();

