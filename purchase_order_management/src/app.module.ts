import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchaseOrder } from './purchaseorder.entity';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1217',
      database: 'purchase_order_mgt',
      entities: [PurchaseOrder],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([PurchaseOrder]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
