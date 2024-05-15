import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchaseOrder } from './purchaseorder.entity';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "215016G",
      database: "Order",
      entities: [PurchaseOrder],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([PurchaseOrder]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
