import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerRefund, InventoryRefund} from './refunds.entity';
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
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT, 10),
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: "Refund",
      entities: [CustomerRefund, InventoryRefund],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([CustomerRefund, InventoryRefund]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}