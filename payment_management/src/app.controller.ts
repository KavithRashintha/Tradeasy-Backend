/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Param } from '@nestjs/common'; 
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CustomerPaymentDTO, Data } from './dto/cutomerPaymentDTO';
import { SupplierPaymentDTO } from './dto/supplierPaymentDTO';
import { CustomerPayments, SupplierPayments} from './payment.entity';
import { Query } from 'express-serve-static-core';
import { Cart } from './stripe/Cart.model';

@Controller()
export class AppController {
  constructor(private readonly PaymentManagement: AppService) {}

  @MessagePattern({ cmd: 'CREATE_CHECKOUT_SESSION' })
  async createCustomerPaymentSession(@Body() data: any): Promise<{ sessionUrl: string }>{
    return await this.PaymentManagement.createCustomerPaymentSession(data);
  }

  @MessagePattern({ cmd: 'GET_CHECKOUT_SESSION' })
  async getCheckoutSession(@Payload() sessionId: string){
    console.log('Session ID:', sessionId);
    return await this.PaymentManagement.getCheckoutSession(sessionId);
  }

  // @MessagePattern({ cmd: 'CREATE_CUSTOMER_PAYMENT_RECEIPT' })
  // async saveCustomerPaymentReceipt(@Body() data: any): Promise<CustomerPayments>{
  //   return this.PaymentManagement.saveCustomerPaymentReceipt(data);
  // }

  @MessagePattern({ cmd: 'CREATE_CUSTOMER_PAYMENT' })
  async saveCustomerPayments(@Body() data: any): Promise<CustomerPayments>{
    return this.PaymentManagement.saveCustomerPayments(data);
  }

  @MessagePattern({ cmd: 'GET_ALL_CUSTOMER_PAYMENTS' })
  async getAllCustomerPayments(): Promise<CustomerPayments[]> {
    return await this.PaymentManagement.getAllCustomerPayments();
  }

  @MessagePattern({ cmd: 'GET_CUSTOMER_PAYMENT' })
  async getCustomerPaymentById(@Payload() id: any): Promise<CustomerPayments | null> {
    return await this.PaymentManagement.getCustomerPaymentById(id);
  }

  @MessagePattern({cmd: 'SEARCH_ALL_CUSTOMER_PAYMENTS'})
  async searchAllPayments(@Payload() query: Query): Promise<CustomerPayments[]>{
    return await this.PaymentManagement.searchAllPayments(query);
  }

  //Supplier Payments
  @MessagePattern({cmd: 'CREATE_SUPPLIER_PAYMENT'})
  async createSupplierPayment(@Payload() supplierPaymentDTO: SupplierPaymentDTO): Promise<SupplierPayments>{
    return await this.PaymentManagement.createSupplierPayment(supplierPaymentDTO);
  }

  @MessagePattern({ cmd: 'GET_ALL_SUPPLIER_PAYMENTS' })
  async getAllSupplierPayments(): Promise<SupplierPayments[]> {
    return await this.PaymentManagement.getAllSupplierPayments();
  }

  @MessagePattern({cmd: 'SEARCH_ALL_SUPPLIER_PAYMENTS'})
  async searchAllSupplierPayments(@Payload() query: Query): Promise<SupplierPayments[]>{
    return await this.PaymentManagement.searchAllSupplierPayments(query);
  }

}
