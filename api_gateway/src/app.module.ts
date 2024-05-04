import { Module } from '@nestjs/common';
import { ApprController } from './appr.controller';
import { ProductController } from './product.controller';
import { OrderController } from "./order.controller";
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {AuthController} from "./auth.controller";

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'CUSTOMER_MANAGEMENT',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 9001,
        },
      },
      {
        name: 'PRODUCT_MANAGEMENT',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 9002,
        },
      },

      {
        name: 'INVENTORY_MANAGEMENT',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 9003,
        },
      },

      {
        name: 'REFUND_MANAGEMENT',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 9004,
        },
      },

      {
        name: 'ORDER_MANAGEMENT',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 9005,
        },
      },

      {
        name: 'SUPPLIER_MANAGEMENT',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 9006,
        },
      },

      {
        name: 'PAYMENT_MANAGEMENT',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 9007,
        },
      },

      {
        name: 'DISCOUNT_MANAGEMENT',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 9008,
        },
      },

      // {
      //   name: 'AUTH_MANAGEMENT',
      //   transport: Transport.TCP,
      //   options: {
      //     host: '127.0.0.1',
      //     port: 9009,
      //   },
      // },

      {
        name: 'AUTH_MANAGEMENT_2',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 9010,
        },
      }
    ]),
  ],
  // controllers: [ApprController],
  controllers: [ApprController, ProductController, OrderController, AuthController], //Separate Controller file for product Management CRUD and Order Managemennt CRUD Tuks#02
  providers: [AppService],
})
export class AppModule { }
