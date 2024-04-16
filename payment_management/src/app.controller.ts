/* eslint-disable prettier/prettier */
import { Controller} from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CustomerPaymentDTO } from './dto/cutomerPaymentDTO';
import { CustomerPayments } from './payment.entity';

@Controller()
export class AppController {
  constructor(private readonly customerPaymentManagement: AppService) {}

  @MessagePattern({cmd: 'CREATE_CUSTOMER_PAYMENT'})
  async createCustomerPayment(@Payload() customerPaymentDTO: CustomerPaymentDTO): Promise<CustomerPayments>{
    return await this.customerPaymentManagement.createCustomerPayment(customerPaymentDTO);
  }

  @MessagePattern({cmd: 'GET_ALL_CUSTOMER_PAYMENTS'})
  async getAllCustomerPayments(): Promise<CustomerPayments[]>{
    return await this.customerPaymentManagement.getAllCustomerPayments();
  }

  @MessagePattern({cmd: 'GET_CUSTOMER_PAYMENT'})
  async getCustomerPaymentById(@Payload() id: any): Promise<CustomerPayments | null>{
    return await this.customerPaymentManagement.getCustomerPaymentById(id);
  }

}
