import { Module } from '@nestjs/common';
import { BillingAndInvoicesService } from './billing_and_invoices.service';
import { BillingAndInvoicesController } from './billing_and_invoices.controller';

@Module({
  providers: [BillingAndInvoicesService],
  controllers: [BillingAndInvoicesController]
})
export class BillingAndInvoicesModule {}
