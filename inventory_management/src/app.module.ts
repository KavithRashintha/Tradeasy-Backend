import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {InventoryItem} from "./inventoryItem.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: 'Kviper0824@',
      database: 'Inventory',
      entities: [InventoryItem],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([InventoryItem]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
