import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerRefund } from './refunds.entity';
import {ClientsModule, Transport} from "@nestjs/microservices";

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'INVENTORY_MANAGEMENT',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 9003,
        },
      }
    ]),
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