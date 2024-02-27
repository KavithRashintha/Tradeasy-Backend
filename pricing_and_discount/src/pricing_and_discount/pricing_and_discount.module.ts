import { Module } from '@nestjs/common';
import { PricingAndDiscountService } from './pricing_and_discount.service';
import { PricingAndDiscountController } from './pricing_and_discount.controller';

@Module({
  providers: [PricingAndDiscountService],
  controllers: [PricingAndDiscountController]
})
export class PricingAndDiscountModule {}
