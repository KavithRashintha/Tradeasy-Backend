/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerPayments } from './payment.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '215016G',
      database: 'Payment',
      entities: [CustomerPayments],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([CustomerPayments]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
