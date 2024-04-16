import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      host: '127.0.0.1',
      port: 3004,
    },
  });

  await app.startAllMicroservices();
  await app.listen(3004);
  console.log(`App is running on port ${await app.getUrl()}`);
}

bootstrap();
