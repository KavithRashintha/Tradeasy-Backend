import { Controller, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';
import { CustomerRefundDTO } from './dto/customerRefundDTO';
import { updateRefundStatusDTO } from './dto/updateRefundStatusDTO';
import { CustomerRefund } from './refunds.entity';
import { SubmitRefundDenialDto } from './dto/submitRefundDenialDTO';

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
  
  @MessagePattern({cmd: 'UPDATE_REFUND_STATUS'})
  async updateRefundStatus(@Payload() updateRefundStatusDto: any): Promise<CustomerRefund> {
    return await this.refundManagement.updateRefundStatus(updateRefundStatusDto);
  }

  @MessagePattern({ cmd: 'SUBMIT_REFUND_DENIAL' })
  async submitRefundDenial(@Payload() submitRefundDenialDto: SubmitRefundDenialDto) {
    const { id, denialReason } = submitRefundDenialDto;
    return this.refundManagement.submitRefundDenial(id, denialReason);
    
  }

  
@MessagePattern({cmd: 'GET_CUSTOMER_REFUND_BY_CUSTOMER_ID'})
async getCustomerRefundsByCustomerId(@Payload() customerId: string): Promise<CustomerRefund[]> {
  return await this.refundManagement.getCustomerRefundsByCustomerId(customerId);
}
  }
 
  
  

