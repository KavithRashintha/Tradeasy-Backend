import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { InventoryRefundDTO } from './dto/inventoryRedundDTO';
import { InventoryRefund } from './inventory_refunds.entitiy';


@Controller()
export class AppController {
  constructor(private readonly inventoryRefundManagement: AppService) {}

  @MessagePattern({ cmd: 'CREATE_INVENTORY_REFUND' })
  
  async createInventoryRefund(@Payload() inventoryRefundDTO: InventoryRefundDTO): Promise<InventoryRefund>{
    return this.inventoryRefundManagement.createInventoryRefund(inventoryRefundDTO)
  }

  @MessagePattern({ cmd: 'GET_ALL_INVENTORY_REFUND' })
  async getAllInventoryRefund(): Promise<InventoryRefund[]>{
    return this.inventoryRefundManagement.getAllInventoryRefund();
  }

  @MessagePattern({ cmd: 'GET_INVENTORY_REFUND_BY_ID' })
  async getInventoryRefundById(@Payload() inventory_id:number): Promise<InventoryRefund>{
    return this.inventoryRefundManagement.getInventoryRefundById(inventory_id);
  }

  @MessagePattern({cmd: 'DELETE_INVENTORY_REFUND'})
  async deleteCustomerRefund(@Payload() inventory_id:number){
    return await this.inventoryRefundManagement.deleteCustomerRefund(inventory_id);
  }
 
}
