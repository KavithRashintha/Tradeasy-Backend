import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {join} from "path";
import {CustomerRefund, InventoryRefund} from "./refunds.entity";
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
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: join(__dirname, '../.env'),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: 'tradeasy-db.postgres.database.azure.com',
        port: 5432,
        username: 'tradeasy_postgres',
        password: 'AdminPW01@',
        database:  'refund',
        entities: [CustomerRefund, InventoryRefund],
        synchronize: true,
        ssl: true
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([CustomerRefund, InventoryRefund]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
