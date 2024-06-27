import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Discounts} from "./discount.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT, 10),
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: 'Discount',
      entities: [Discounts],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Discounts]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
