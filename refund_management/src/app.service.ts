import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerRefund } from './refunds.entity';
import { Repository } from 'typeorm';
import { CustomerRefundDTO } from './dto/customerRefundDTO';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(CustomerRefund)
    private readonly refundRepository: Repository<CustomerRefund>,
  ) {}

  async createCustomerRefund(
    customerRefundDto: CustomerRefundDTO,
  ): Promise<CustomerRefund> {
    const newCustomerRefund = this.refundRepository.create(customerRefundDto);
    return await this.refundRepository.save(newCustomerRefund);
  }

  async getCustomerRefund(id:number):Promise<CustomerRefund> {
    return await this.refundRepository.findOneById(id);
  }

  async getAllCustomerRefunds(): Promise<CustomerRefund[]> {
    return await this.refundRepository.find();
  }

  async deleteCustomerRefund(id:number){
    const result = await this.refundRepository.delete(id);
    if (!result) {
      return 'Not Deleted';
    } else {
      return 'Successfully Deleted';
    }
  }
}
