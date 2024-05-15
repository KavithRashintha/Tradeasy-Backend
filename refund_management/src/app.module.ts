import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerRefund } from './refunds.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: 'Kviper0824@',
      database: 'Refund',
      entities: [CustomerRefund],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([CustomerRefund]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}