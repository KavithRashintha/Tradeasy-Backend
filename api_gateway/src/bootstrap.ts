import { join } from 'path';
import * as dotenv from 'dotenv';

// Load environment variables from the shared .env file
dotenv.config({ path: join(__dirname, '../../.env') });

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    await app.listen(9000);
}
bootstrap();
