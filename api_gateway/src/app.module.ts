import {Module} from '@nestjs/common';
import {ApprController} from './appr.controller';
import {AppService} from './app.service';
import {ClientsModule, Transport} from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'CUSTOMER_MANAGEMENT',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 3002,
        },
      },

      {
        name: 'INVENTORY_MANAGEMENT',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 3003,
        }
      },

      {
        name: 'REFUND_MANAGEMENT',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 3004,
        }
      },

      {
        name: 'SUPPLIER_MANAGEMENT',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 3005,
        }
      },

      {
        name: 'PAYMENT_MANAGEMENT',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 3006,
        }
      }
    ]),
  ],
  controllers: [ApprController],
  providers: [AppService],
})
export class AppModule {}
