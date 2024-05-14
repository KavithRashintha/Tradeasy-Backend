import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm'; 
import { InventoryRefund } from './inventory_refunds.entitiy';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1217',
      database: 'inventory_refund_mgt',
      entities: [InventoryRefund],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([InventoryRefund]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
