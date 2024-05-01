import {Module} from '@nestjs/common';
import {ApprController} from './appr.controller';
import {AppService} from './app.service';
import {ClientsModule, Transport} from '@nestjs/microservices';
import { CustomerController } from './customer/customer.controller';

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
        name: 'INVENTORY_MANAGEMENT',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 9002,
        }
      },

      {
        name: 'REFUND_MANAGEMENT',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 9003,
        }
      }
    ]),
  ],
  controllers: [ApprController, CustomerController],
  providers: [AppService],
})
export class AppModule {}
