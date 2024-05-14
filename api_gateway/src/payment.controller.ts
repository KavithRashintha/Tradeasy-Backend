import {Body, Controller, Delete, Get, Inject, Param, Post, Put, Query} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CustomerPaymentDTO, Data, SupplierPaymentDTO } from "./models/paymentModel";
import { Query as ExpressQuery } from 'express-serve-static-core';


@Controller('product')
export class PaymentController {
    constructor(
        @Inject('PAYMENT_MANAGEMENT') private paymantClient: ClientProxy,
    ) {}

    //----------------------------------------------------CUSTOMER_Payment_MANAGEMENT-----------------------------------------

  @Post('payment/customerPayment/checkout')
  async createCustomerPaymentSession(@Body() data: any){
    return this.paymantClient.send({ cmd: 'CREATE_CHECKOUT_SESSION' }, data);
  }

  @Post('payment/customerPayment/create')
  async saveCustomerPayments(@Body() data: Data): Promise<any>{
    return this.paymantClient.send({ cmd: 'CREATE_CUSTOMER_PAYMENT' }, data);
  }

  //@UseGuards(JwtGuard)
  @Get('payment/customerPayment/getAllCustomerPayments')
  async getAllCustomerPayments() {
    return await this.paymantClient.send({ cmd: 'GET_ALL_CUSTOMER_PAYMENTS' }, {});
  }

  @Get('payment/customerPayment/get/:id')
  async getCustomerPaymentById(@Param('id') id: number) {
    return await this.paymantClient.send({ cmd: 'GET_CUSTOMER_PAYMENT' }, id);
  }

  @Get('payment/customerPayment/search')
  async searchAllPayments(@Query() query: ExpressQuery) {
    return this.paymantClient.send({ cmd: 'SEARCH_ALL_CUSTOMER_PAYMENTS' }, {query});
  }

  //----------------------------------------------------SUPPLIER_Payment_MANAGEMENT-----------------------------------------

  @Post('payment/supplierPayment/create')
  async createSupplierPayment(@Body() supplierPaymentDTO: SupplierPaymentDTO){
    return this.paymantClient.send({ cmd: 'CREATE_SUPPLIER_PAYMENT' }, supplierPaymentDTO);
  }

  @Get('payment/supplierPayment/getAll')
  async getAllSupplierPayments() {
    return await this.paymantClient.send({ cmd: 'GET_ALL_SUPPLIER_PAYMENTS' }, {});
  }

  @Get('payment/supplierPayment/search')
  async searchAllSupplierPayments(@Query() query: ExpressQuery) {
    return this.paymantClient.send({ cmd: 'SEARCH_ALL_SUPPLIER_PAYMENTS' }, {query});
  }

}



