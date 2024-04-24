import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Discounts} from "./discount.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '215016G',
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
