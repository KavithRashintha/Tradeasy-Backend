import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerRefund, InventoryRefund } from './refunds.entity';
import { Repository } from 'typeorm';
import { CustomerRefundDTO } from './dto/customerRefundDTO';
import { updateRefundStatusDTO } from './dto/updateRefundStatusDTO';
import { InventoryRefundDTO, UpdateInventoryRefundStatusDTO } from './dto/inventoryRefundDTO';


@Injectable()
export class AppService {
  constructor(
    @InjectRepository(CustomerRefund)
    private readonly customerRefundRepository: Repository<CustomerRefund>,

    @InjectRepository(InventoryRefund)
    private readonly inventoryRefundRepository: Repository<InventoryRefund>,
  ) {}

  async createCustomerRefund(
    customerRefundDto: CustomerRefundDTO,
  ): Promise<CustomerRefund> {
    const newCustomerRefund = this.customerRefundRepository.create(customerRefundDto);
    return await this.customerRefundRepository.save(newCustomerRefund);
  }

  async getCustomerRefund(id:number):Promise<CustomerRefund> {
    return await this.customerRefundRepository.findOneById(id);
  }

  async getAllCustomerRefunds(): Promise<CustomerRefund[]> {
    return await this.customerRefundRepository.find();
  }

  async deleteCustomerRefund(id:number){
    const result = await this.customerRefundRepository.delete(id);
    if (!result) {
      return 'Not Deleted';
    } else {
      return 'Successfully Deleted';
    }
  }
  async getCustomerRefundByStatus(refundStatus:string):Promise<CustomerRefund[]>{
    return await this.customerRefundRepository
        .createQueryBuilder('customer_refund')
        .where('customer_refund.status = :refundStatus', {refundStatus})
        .getMany();
  }

  async getCustomerRefundCount(){
    return await this.customerRefundRepository.count();
  }

  async updateRefundStatus(updateRefundStatusDto: updateRefundStatusDTO): Promise<CustomerRefund> {
    const refund = await this.customerRefundRepository.findOne({ where: { id: updateRefundStatusDto.id } });
    if (!refund) {
      throw new Error('Refund not found');
    }
    refund.status = updateRefundStatusDto.status;
    if (updateRefundStatusDto.status === 'rejected') {
      refund.denialReason = updateRefundStatusDto.denialReason;
    } else {
      refund.denialReason = '';
    }
    return this.customerRefundRepository.save(refund);
  }

  async getCustomerRefundsByCustomerId(customerId: string): Promise<CustomerRefund[]> {
    return await this.customerRefundRepository.find({ where: { customerId } });
  }

  //==============================================INVENTORY REFUND MANAGEMENT==============================================================

  async createInventoryRefund(inventoryRefundDTO:InventoryRefundDTO):Promise<InventoryRefund>{
      
    const newInventoryRefund = this.inventoryRefundRepository.create(inventoryRefundDTO); 
    return await this.inventoryRefundRepository.save(newInventoryRefund);
  }

  async getAllInventoryRefund():Promise<InventoryRefund[]>{
    return await this.inventoryRefundRepository.find();
  }

  async getInventoryRefundById(inventory_id:number):Promise<InventoryRefund>{
      return await this.inventoryRefundRepository.findOneById(inventory_id);
    }

    async updateInventoryRefunds(id: number, updateInventoryRefundStatusDTO: UpdateInventoryRefundStatusDTO): Promise<InventoryRefund> {
      await this.inventoryRefundRepository.update(id, updateInventoryRefundStatusDTO);
      return await this.inventoryRefundRepository.findOneById(id);
    }

    async deleteInventoryRefund(inventory_id:number){
      const result = await this.inventoryRefundRepository.delete(inventory_id);
      if (!result) {
        return 'Not Deleted';
      } else {
        return 'Successfully Deleted';
      }
    }

    async getAllApprovedRefunds(): Promise<InventoryRefund[]> {
      return await this.inventoryRefundRepository.find({
          where: { status: 'Accepted' }
      });
    }
  
}



