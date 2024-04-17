import { Module } from '@nestjs/common';
import { ApprController } from './appr.controller';
import { ProductController } from './product.controller';
import {OrderController} from "./order.controller";
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'CUSTOMER_MANAGEMENT',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 5001,
        },
      },
      {
        name: 'PRODUCT_MANAGEMENT',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 5002,
        },
      },

      {
        name: 'INVENTORY_MANAGEMENT',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 5003,
        },
      },

      {
        name: 'REFUND_MANAGEMENT',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 5004,
        },
      },

      {
        name: 'ORDER_MANAGEMENT',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 5005,
        },
      },
    ]),
  ],
  controllers: [ApprController,OrderController],
  providers: [AppService], 
})
export class AppModule {}
