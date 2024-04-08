import { Module } from '@nestjs/common';
import { ApprController } from './appr.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SupplierController } from './supplier.controller';

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
        name: 'SUPPLIER_MANAGEMENT',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 3003,
        },
      }
    ]),
  ],
  controllers: [ApprController, SupplierController],
  providers: [AppService],
})
export class AppModule {}
