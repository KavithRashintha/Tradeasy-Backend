import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Admin, ShopReviews} from './admin.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT, 10),
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: 'Admin',
      entities: [Admin, ShopReviews],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Admin, ShopReviews]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
