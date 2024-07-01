/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerPayments, SupplierPayments } from './payment.entity';
import { StripeModule } from './stripe/stripe.module';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {join} from "path";

@Module({
  imports: [
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
        database:  'payment',
        entities: [CustomerPayments, SupplierPayments],
        synchronize: true,
        ssl: true
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([CustomerPayments, SupplierPayments]),
    StripeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
