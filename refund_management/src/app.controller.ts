import { Controller, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';
import { CustomerRefundDTO } from './dto/customerRefundDTO';
import { updateRefundStatusDTO } from './dto/updateRefundStatusDTO';
import { InventoryRefundDTO, UpdateInventoryRefundStatusDTO } from './dto/inventoryRefundDTO';
import { CustomerRefund, InventoryRefund } from './refunds.entity';


@Controller()
export class AppController {
  constructor(
    @Inject('INVENTORY_MANAGEMENT') private inventoryClient:ClientProxy,
    private readonly refundManagement: AppService
  ) {}

  @MessagePattern({ cmd: 'CREATE_CUSTOMER_REFUND' })
  async createCustomerRefund(
    @Payload() customerRefundDto: CustomerRefundDTO,
  ): Promise<CustomerRefund> {
    return await this.refundManagement.createCustomerRefund(customerRefundDto);
  }

  @MessagePattern({cmd: 'GET_CUSTOMER_REFUND'})
  async getCustomerRefund(@Payload() id:number):Promise<CustomerRefund> {
    return await this.refundManagement.getCustomerRefund(id);
  }

  @MessagePattern({ cmd: 'GET_ALL_CUSTOMER_REFUNDS' })
  async getAllCustomerRefunds(): Promise<CustomerRefund[]> {
    return await this.refundManagement.getAllCustomerRefunds();
  }

  @MessagePattern({cmd: 'DELETE_CUSTOMER_REFUND'})
  async deleteCustomerRefund(@Payload() id:number){
    return await this.refundManagement.deleteCustomerRefund(id);
  }

  @MessagePattern({cmd: 'GET_CUSTOMER_REFUND_BY_CATEGORY'})
  async getCustomerRefundByStatus(@Payload() refundStatus:string){
    return await this.refundManagement.getCustomerRefundByStatus(refundStatus);
  }

  @MessagePattern({cmd: 'CALLING_TEST_FUNCTION'})
  async runTestFunction():Promise<any>{
    return await this.inventoryClient.send({cmd: 'TEST_FUNCTION'}, {});
  }

  @MessagePattern({cmd: 'GET_CUSTOMER_REFUND_COUNT'})
  async getCustomerRefundCount(){
    return await this.refundManagement.getCustomerRefundCount();
  }
  
  @MessagePattern({ cmd: 'UPDATE_REFUND_STATUS' })
  async updateRefundStatus(@Payload() updateRefundStatusDto: updateRefundStatusDTO): Promise<CustomerRefund> {
    return await this.refundManagement.updateRefundStatus(updateRefundStatusDto);
  }

  @MessagePattern({cmd: 'GET_CUSTOMER_REFUND_BY_CUSTOMER_ID'})
  async getCustomerRefundsByCustomerId(@Payload() customerId: string): Promise<CustomerRefund[]> {
    return await this.refundManagement.getCustomerRefundsByCustomerId(customerId);
  }

  //==============================================INVENTORY REFUND MANAGEMENT==============================================================

  @MessagePattern({ cmd: 'CREATE_INVENTORY_REFUND' })
  async createInventoryRefund(@Payload() inventoryRefundDTO: InventoryRefundDTO): Promise<InventoryRefund>{
    return this.refundManagement.createInventoryRefund(inventoryRefundDTO)
  }

  @MessagePattern({ cmd: 'GET_ALL_INVENTORY_REFUND' })
  async getAllInventoryRefund(): Promise<InventoryRefund[]>{
    return this.refundManagement.getAllInventoryRefund();
  }

  @MessagePattern({ cmd: 'GET_INVENTORY_REFUND_BY_ID' })
  async getInventoryRefundById(@Payload() inventory_id:number): Promise<InventoryRefund>{
    return this.refundManagement.getInventoryRefundById(inventory_id);
  }

  @MessagePattern({cmd: 'UPDATE_INVENTORY_REFUND'})
  async updateInventoryRefunds(@Payload() data: { id: number, updateInventoryRefundStatusDTO: UpdateInventoryRefundStatusDTO }): Promise<InventoryRefund> {
    const { id, updateInventoryRefundStatusDTO } = data;
    return await this.refundManagement.updateInventoryRefunds(id, updateInventoryRefundStatusDTO);
  }

  @MessagePattern({cmd: 'DELETE_INVENTORY_REFUND'})
async deleteInventoryRefund(@Payload() inventory_id: number) {
    return await this.refundManagement.deleteInventoryRefund(inventory_id);
}


  @MessagePattern({cmd: 'GET_ALL_APPROVED_REFUNDS'})
    async getAllApprovedRefunds(): Promise<InventoryRefund[]> {
        return this.refundManagement.getAllApprovedRefunds();
    }
}
 
  
  

