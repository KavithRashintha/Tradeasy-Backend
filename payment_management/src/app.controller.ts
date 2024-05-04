/* eslint-disable prettier/prettier */
import { Controller, Post, Body } from '@nestjs/common'; 
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CustomerPaymentDTO } from './dto/cutomerPaymentDTO';
import { CustomerPayments } from './payment.entity';
import { Query } from 'express-serve-static-core';


@Controller()
export class AppController {
  constructor(private readonly customerPaymentManagement: AppService) {}

  @MessagePattern({ cmd: 'CREATE_CUSTOMER_PAYMENT' })
  async createCustomerPayment(@Payload() customerPaymentDTO: CustomerPaymentDTO): Promise<CustomerPayments> {
    return await this.customerPaymentManagement.createCustomerPayment(customerPaymentDTO);
  }

  @MessagePattern({ cmd: 'GET_ALL_CUSTOMER_PAYMENTS' })
  async getAllCustomerPayments(): Promise<CustomerPayments[]> {
    return await this.customerPaymentManagement.getAllCustomerPayments();
  }

  @MessagePattern({ cmd: 'GET_CUSTOMER_PAYMENT' })
  async getCustomerPaymentById(@Payload() id: any): Promise<CustomerPayments | null> {
    return await this.customerPaymentManagement.getCustomerPaymentById(id);
  }

  @MessagePattern({cmd: 'SEARCH_ALL_PAYMENTS'})
  async searchAllPayments(@Payload() query: Query): Promise<CustomerPayments[]>{
    return await this.customerPaymentManagement.searchAllPayments(query);
  }

}
