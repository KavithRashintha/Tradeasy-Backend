import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import { ApprController } from './appr.controller';
import { ProductController } from './product.controller';
import { OrderController } from "./order.controller";
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { User } from './auth.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';


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

      {
        name:'INVENTORY_REFUND_MANAGEMENT',
        transport: Transport.TCP,
        options:{
          host: '127.0.0.1',
          port:9009,
        }
      },
  
      {
        name:'PURCHASE_ORDER_MANAGEMENT',
        transport:Transport.TCP,
        options:{
          host:'127.0.0.1',
          port:9010,
        }
      }
      
    ]),

    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "215016G",
      database: "Users",
      entities: [User],
      synchronize: true,
    }),

    TypeOrmModule.forFeature([User]),

    JwtModule.register({
      global: true,
      secret: 'abc123',
      signOptions: {
        expiresIn: '60s'
      },
    }),
    PassportModule
  ],
  
  controllers: [ApprController, ProductController, OrderController],
  providers: [
    AppService, 
    JwtStrategy, 
    LocalStrategy,
  ],
})
export class AppModule {}