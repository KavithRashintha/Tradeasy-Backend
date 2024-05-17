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
      port: 5432,
      username: 'postgres',
      password: '215016G',
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