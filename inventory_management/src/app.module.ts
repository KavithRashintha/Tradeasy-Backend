import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {join} from "path";
import {Item} from "./inventory.entity";

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
        database:  'inventory',
        entities: [Item],
        synchronize: true,
        ssl: true
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Item]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
