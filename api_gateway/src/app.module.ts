import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import { ApprController } from './appr.controller';
import { ProductController } from './product.controller';
import { OrderController } from "./order.controller";
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import {CustomerStrategy, AdminStrategy, SupplierStrategy} from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import {EmailController} from "./mail.controller";

@Module({
  imports: [
    // ConfigModule.forRoot({
    //   envFilePath: join(__dirname, '../../../.env'),
    //   isGlobal: true
    // }),
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
        name:'PURCHASE_ORDER_MANAGEMENT',
        transport:Transport.TCP,
        options:{
          host:'127.0.0.1',
          port:9010,
        }
      },
      {
        name:'MAIL_SENDER_SERVICE',
        transport:Transport.TCP,
        options:{
          host:'127.0.0.1',
          port:9011,
        }
      },

      {
        name:'ADMIN_MANAGEMENT',
        transport:Transport.TCP,
        options:{
          host:'127.0.0.1',
          port:9050,
        }
      }
      
    ]),

    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: process.env.POSTGRES_HOST,
    //   port: parseInt(process.env.POSTGRES_PORT, 10),
    //   username: process.env.POSTGRES_USERNAME,
    //   password: process.env.POSTGRES_PASSWORD,
    //   database: 'Users',
    //   entities: [User],
    //   synchronize: true,
    // }),


    // TypeOrmModule.forFeature([User]),

    JwtModule.register({
      global: true,
      secret: 'abc123',
      signOptions: {
        expiresIn: '7d'
      },
    }),
    PassportModule
  ],
  
  controllers: [ApprController, ProductController, OrderController, EmailController],
  providers: [
    AppService, 
    JwtStrategy, 
    AdminStrategy,
    CustomerStrategy,
    SupplierStrategy
  ],
})
export class AppModule {}