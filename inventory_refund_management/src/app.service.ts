import { Injectable } from '@nestjs/common';
import { InventoryRefund } from './inventory_refunds.entitiy';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { InventoryRefundDTO } from './dto/inventoryRedundDTO';

@Injectable()
export class AppService {
    constructor(
      @InjectRepository(InventoryRefund)
      private readonly inventoryRefundManagement: Repository<InventoryRefund>
    ) {}
    async createInventoryRefund(inventoryRefundDTO:InventoryRefundDTO):Promise<InventoryRefund>{
      
      const newInventoryRefund = this.inventoryRefundManagement.create(inventoryRefundDTO); 
      return await this.inventoryRefundManagement.save(newInventoryRefund);
    }

    async getAllInventoryRefund():Promise<InventoryRefund[]>{
      return await this.inventoryRefundManagement.find();
    }

    async getInventoryRefundById(inventory_id:number):Promise<InventoryRefund>{
        return await this.inventoryRefundManagement.findOneById(inventory_id);
      }

      async deleteCustomerRefund(inventory_id:number){
        const result = await this.inventoryRefundManagement.delete(inventory_id);
        if (!result) {
          return 'Not Deleted';
        } else {
          return 'Successfully Deleted';
        }
      }

      async getAllApprovedRefunds(): Promise<InventoryRefund[]> {
        return await this.inventoryRefundManagement.find({
            where: { status: 'completed' }
        });
      }

      
    }

