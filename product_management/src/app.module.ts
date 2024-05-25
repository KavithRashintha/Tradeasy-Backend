import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Product, ProductReview} from './product.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT, 10),
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: 'Product',
      entities: [Product, ProductReview],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Product, ProductReview]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
