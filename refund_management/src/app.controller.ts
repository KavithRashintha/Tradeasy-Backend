import { Controller, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';
import { CustomerRefundDTO } from './dto/customerRefundDTO';
import { CustomerRefund } from './refunds.entity';

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
}
