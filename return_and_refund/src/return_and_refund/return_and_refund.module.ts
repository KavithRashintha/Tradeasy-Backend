import { Module } from '@nestjs/common';
import { ReturnAndRefundService } from './return_and_refund.service';
import { ReturnAndRefundController } from './return_and_refund.controller';

@Module({
  providers: [ReturnAndRefundService],
  controllers: [ReturnAndRefundController]
})
export class ReturnAndRefundModule {}
