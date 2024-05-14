import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Discounts} from "./discount.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: process.env.TYPE,s
      host: process.env.HOST,
      port: parseInt(process.env.PORT),
      username: process.env.USERNAME,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      entities: [Discounts],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Discounts]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
