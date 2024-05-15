import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerRefund } from './refunds.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "215016G",
      database: "Refund",
      entities: [CustomerRefund],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([CustomerRefund]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
