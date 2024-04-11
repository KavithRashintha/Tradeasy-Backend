import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerRefund } from './refunds.entity';
import { Repository } from 'typeorm';
import { CustomerRefundDTO } from './dto/customerRefundDTO';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(CustomerRefund)
    private readonly refundManagement: Repository<CustomerRefund>,
  ) {}

  async createCustomerRefund(
    customerRefundDto: CustomerRefundDTO,
  ): Promise<CustomerRefund> {
    const newCustomerRefund = this.refundManagement.create(customerRefundDto);
    return await this.refundManagement.save(newCustomerRefund);
  }

  async getCustomerRefund(id:number):Promise<CustomerRefund> {
    return await this.refundManagement.findOneById(id);
  }

  async getAllCustomerRefunds(): Promise<CustomerRefund[]> {
    return await this.refundManagement.find();
  }
}
