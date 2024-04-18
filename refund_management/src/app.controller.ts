import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CustomerRefundDTO } from './dto/customerRefundDTO';
import { CustomerRefund } from './refunds.entity';

@Controller()
export class AppController {
  constructor(private readonly refundManagement: AppService) {}

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
}
