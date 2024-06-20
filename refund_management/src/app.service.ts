import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerRefund } from './refunds.entity';
import { Repository } from 'typeorm';
import { CustomerRefundDTO } from './dto/customerRefundDTO';
import { updateRefundStatusDTO } from './dto/updateRefundStatusDTO';


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
  async getCustomerRefundByStatus(refundStatus:string):Promise<CustomerRefund[]>{
    return await this.refundRepository
        .createQueryBuilder('customer_refund')
        .where('customer_refund.status = :refundStatus', {refundStatus})
        .getMany();
  }

  async getCustomerRefundCount(){
    return await this.refundRepository.count();
  }

  async updateRefundStatus(updateRefundStatusDto: updateRefundStatusDTO): Promise<CustomerRefund> {
    const refund = await this.refundRepository.findOne({ where: { id: updateRefundStatusDto.id } });
    if (!refund) {
      throw new Error('Refund not found');
    }
    refund.status = updateRefundStatusDto.status;
    if (updateRefundStatusDto.status === 'rejected') {
      refund.denialReason = updateRefundStatusDto.denialReason;
    } else {
      refund.denialReason = '';
    }
    return this.refundRepository.save(refund);
  }

  async getCustomerRefundsByCustomerId(customerId: string): Promise<CustomerRefund[]> {
    return await this.refundRepository.find({ where: { customerId } });
  }
  
  
}



