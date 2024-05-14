import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm'; 
import { InventoryRefund } from './inventory_refunds.entitiy';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: process.env.TYPE,
      host: process.env.HOST,
      port: parseInt(process.env.PORT),
      username: process.env.USERNAME,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      entities: [InventoryRefund],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([InventoryRefund]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
