import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerRefund } from './refunds.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: process.env.TYPE,
      host: process.env.HOST,
      port: parseInt(process.env.PORT),
      username: process.env.USERNAME,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      entities: [CustomerRefund],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([CustomerRefund]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
