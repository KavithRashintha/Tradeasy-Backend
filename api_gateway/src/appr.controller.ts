import { Body, Controller, Delete, Get, Inject, Param, Post, Put, Query, UseGuards, Res} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { GetCustomerDTO, RegisterCustomerDTO, UpdateCustomerDTO } from './models/customerModel';
import { InventoryItemDTO, UpdateInventoryItemDTO } from "./models/inventoryModel";
import { CustomerRefundDTO, InventoryRefundDTO } from "./models/refundModel";
import { RegisterSupplierDTO, UpdateSupplierDTO } from "./models/supplierModel";
import { CustomerPaymentDTO, Data, SupplierPaymentDTO } from "./models/paymentModel";
import { DiscountsDTO } from './models/discountModel';
import { AuthDto } from './models/authModel';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { AppService } from './app.service';
import {AuthGuard} from '@nestjs/passport';
import {JwtGuard} from './guards/jwt.guard';
import {RefreshJwtGuard} from './guards/refresh.jwt.guard';
import {LocalAuthGuard} from './guards/local.guard';
import { Response } from 'express';
import { PurchaseOrderDTO } from './models/purchaseOrderModel';
import { In } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';

@Controller()
export class ApprController {
  constructor(
    @Inject('CUSTOMER_MANAGEMENT') private customerClient: ClientProxy,
    @Inject('INVENTORY_MANAGEMENT') private inventoryClient: ClientProxy,
    @Inject('REFUND_MANAGEMENT') private refundClient: ClientProxy,
    @Inject('SUPPLIER_MANAGEMENT') private supplierClient: ClientProxy,
    @Inject('PAYMENT_MANAGEMENT') private paymentClient: ClientProxy,
    @Inject('DISCOUNT_MANAGEMENT') private discountClient: ClientProxy,
    @Inject ('INVENTORY_REFUND_MANAGEMENT') private inventoryRefund: ClientProxy,
    @Inject ('PURCHASE_ORDER_MANAGEMENT') private inventoryOrder: ClientProxy,
    private authManagement: AppService
  ) { }

  //=================================CUSTOMER_MANAGEMENT=========================================================================

  @Post('customer/create')
  async createCustomer(@Body() payload: RegisterCustomerDTO) {
    return this.customerClient.send({ cmd: 'CREATE_CUSTOMER' }, payload);
  }
  
  @Get('customer/findCustomer/:id')
  async findCustomer(@Param('id') id: any) {
    return this.customerClient.send({ cmd: 'GET_CUSTOMER' }, id)
  }

  @Get('customer/getAllCustomers')
  async getAllCustomers() {
    return this.customerClient.send({ cmd: 'GET_ALL_CUSTOMERS' }, {});
  }

  @Put('customer/update/:id')
  async updateCustomer(@Param('id') id: number, @Body() updateCustomerDto: UpdateCustomerDTO) {
    return this.customerClient.send({ cmd: 'UPDATE_CUSTOMER' }, { id, updateCustomerDto });
  }

  @Delete('customer/delete/:id')
  async deleteCustomer(@Param('id') id: number) {
    return this.customerClient.send({ cmd: 'DELETE_CUSTOMER' }, id);
  }


  //===================================INVENTORY_MANAGEMENT===========================================================================

  @Post('inventory/add')
  async addInventoryItem(@Body() payload: InventoryItemDTO) {
    return this.inventoryClient.send({ cmd: 'ADD_INVENTORY_ITEM' }, payload)
  }

  @Get('inventory/get/:id')
  async getInventoryItem(@Param('id') id: number) {
    return this.inventoryClient.send({ cmd: 'GET_INVENTORY_ITEM' }, id)
  }

  @Get('inventory/getAll')
  async getAllInventoryItems() {
    return this.inventoryClient.send({ cmd: 'GET_ALL_INVENTORY_ITEMS' }, {})
  }

  @Put('inventory/update/:id')
  async updateInventoryItem(@Param('id') id: number, @Body() updateInventoryItemDto: UpdateInventoryItemDTO) {
    return this.inventoryClient.send({ cmd: 'UPDATE_INVENTORY_ITEM' }, { id, updateInventoryItemDto });
  }

  @Delete('inventory/delete/:id')
  async deleteInventoryItem(@Param('id') id: number) {
    return this.inventoryClient.send({ cmd: 'DELETE_INVENTORY_ITEM' }, id);
  }


  //====================================================REFUND_MANAGEMENT==================================================

  //----------------------------------------------------CUSTOMER_REFUND_MANAGEMENT-----------------------------------------

  @Post('refund/customerRefund/create')
  async createCustomerRefund(@Body() customerRefundDto: CustomerRefundDTO) {
    return this.refundClient.send({ cmd: 'CREATE_CUSTOMER_REFUND' }, customerRefundDto)
  }

  @Get('refund/customerRefund/get/:id')
  async getCustomerRefund(@Param('id') id: number) {
    return this.refundClient.send({ cmd: 'GET_CUSTOMER_REFUND' }, id);
  }

  @Get('refund/customerRefund/getAll')
  async getAllCustomerRefunds() {
    return this.refundClient.send({ cmd: 'GET_ALL_CUSTOMER_REFUNDS' }, {})
  }

  @Delete('refund/customerRefund/delete/:id')
  async deleteCustomerRefund(@Param('id') id: number) {
    return this.refundClient.send({ cmd: 'DELETE_CUSTOMER_REFUND' }, id);
  }


   //----------------------------------------------------Inventory_REFUND_MANAGEMENT-----------------------------------------
   @Post('payment/inventoryPayment/create')
   async createInventoryPayment(@Body() inventoryPaymentDTO:InventoryRefundDTO)
   {
     return this.paymentClient.send({cmd:'CREATE_INVENTORY_PAYMENT'},inventoryPaymentDTO);
   } 
   @Get('payment/inventoryPayment/getAll')
   async getAllInventoryPayments(){
     return this.paymentClient.send({cmd:'GET_ALL_INVENTORY_PAYMENT'},{})
   }
   @Get('payment/inventoryPayment/get/:id')  
   async getInventoryPaymentById(@Param('id') id:number){
     return this.paymentClient.send({cmd:'GET_INVENTORY_PAYMENT_BY_ID'},id)
   }
 

  //================================================PURCHASE_ORDER__MANAGEMENT===========================================================================

  @Post('purchaseOrder/create')
  async createPurchaseOrder(@Body() purchaseOrderDTO: PurchaseOrderDTO){
    return this.inventoryOrder.send({cmd: 'CREATE_PURCHASE_ORDER'}, purchaseOrderDTO);
  }

  @Get('purchaseOrder/getAll')
  async getAllPurchaseOrder(){
    return this.inventoryOrder.send({cmd: 'GET_ALL_PURCHASE_ORDER'}, {});
  }

  @Get('purchaseOrder/get/:id')
  async getPurchaseOrderById(@Param('id') id:number){
    return this.inventoryOrder.send({cmd: 'GET_PURCHASE_ORDER_BY_ID'}, id);
  }

  @Delete('purchaseOrder/delete/:id')
  async deletePurchaseOrder(@Param('id') id:number){
    return this.inventoryOrder.send({cmd: 'DELETE_PURCHASE_ORDER'}, id);
  }

  @Get('purchaseOrder/getCountOfOrdersByStatus/:status')
  async getCountOfOrdersByStatus(@Param('status') status: string){
    return this.inventoryOrder.send({cmd: 'GET_COUNT_OF_ORDERS_BY_STATUS'}, status);
  }


  //===================================SUPPLIER_MANAGEMENT===========================================================================
  @Post('supplier/create')
  async createSupplier(@Body() payload: RegisterSupplierDTO) {
    return this.supplierClient.send({ cmd: 'CREATE_SUPPLIER' }, payload);
  }

  @Get('supplier/getSupplier/:id')
  async getSupplier(@Param('id') id: any) {
    return this.supplierClient.send({ cmd: 'GET_SUPPLIER' }, id)
  }

  //@UseGuards(AuthGuard('jwt'))
  @Get('supplier/getAllSuppliers')
  async getAllSuppliers() {
    return this.supplierClient.send({ cmd: 'GET_ALL_SUPPLIERS' }, {});
  }

  @Get('supplier/search')
  async searchAllSuppliers(@Query() query: ExpressQuery) {
    return this.supplierClient.send({ cmd: 'SEARCH_ALL_SUPPLIERS' }, {query})
  }

  @Put('supplier/update/:id')
  async updateSupplier(@Param('id') id: number, @Body() updateSupplierDto: UpdateSupplierDTO) {
    console.log("API - AC");
    return this.supplierClient.send({ cmd: 'UPDATE_SUPPLIER' }, { id, updateSupplierDto });
  }

  @Delete('supplier/delete/:id')
  async deleteSupplier(@Param('id') id: number) {
    return this.supplierClient.send({ cmd: 'DELETE_SUPPLIER' }, id);
  }



  //====================================================PAYMENT_MANAGEMENT==================================================

  //----------------------------------------------------CUSTOMER_Payment_MANAGEMENT-----------------------------------------

  @Post('payment/customerPayment/checkout')
  async createCustomerPaymentSession(@Body() data: any){
    return this.paymentClient.send({ cmd: 'CREATE_CHECKOUT_SESSION' }, data);
  }

  @Post('payment/customerPayment/create')
  async saveCustomerPayments(@Body() data: Data): Promise<any>{
    return this.paymentClient.send({ cmd: 'CREATE_CUSTOMER_PAYMENT' }, data);
  }

  //@UseGuards(JwtGuard)
  @Get('payment/customerPayment/getAllCustomerPayments')
  async getAllCustomerPayments() {
    return await this.paymentClient.send({ cmd: 'GET_ALL_CUSTOMER_PAYMENTS' }, {});
  }

  @Get('payment/customerPayment/get/:id')
  async getCustomerPaymentById(@Param('id') id: number) {
    return await this.paymentClient.send({ cmd: 'GET_CUSTOMER_PAYMENT' }, id);
  }

  @Get('payment/customerPayment/search')
  async searchAllPayments(@Query() query: ExpressQuery) {
    return this.paymentClient.send({ cmd: 'SEARCH_ALL_CUSTOMER_PAYMENTS' }, {query});
  }

  //----------------------------------------------------SUPPLIER_Payment_MANAGEMENT-----------------------------------------

  @Post('payment/supplierPayment/create')
  async createSupplierPayment(@Body() supplierPaymentDTO: SupplierPaymentDTO){
    console.log(supplierPaymentDTO);
    return this.paymentClient.send({ cmd: 'CREATE_SUPPLIER_PAYMENT' }, supplierPaymentDTO);
  }

  @Get('payment/supplierPayment/getAll')
  async getAllSupplierPayments() {
    return await this.paymentClient.send({ cmd: 'GET_ALL_SUPPLIER_PAYMENTS' }, {});
  }

  @Get('payment/supplierPayment/search')
  async searchAllSupplierPayments(@Query() query: ExpressQuery) {
    return this.paymentClient.send({ cmd: 'SEARCH_ALL_SUPPLIER_PAYMENTS' }, {query});
  }

  //====================================================DISCOUNT_MANAGEMENT==================================================

  @Post('discounts/create')
  async createDiscount(@Body() discountsDTO: DiscountsDTO) {
    return this.discountClient.send({ cmd: 'CREATE_DISCOUNT' }, discountsDTO);
  }

  @Get('discounts/search')
  async searchAllDiscounts(@Query() query: ExpressQuery) {
    return this.discountClient.send({ cmd: 'SEARCH_ALL_DISCOUNTS' }, {query})
  }

  @Get('discounts/get/:id')
  async getDiscountById(@Param('id') id: number) {
    return this.discountClient.send({ cmd: 'GET_DISCOUNT' }, id);
  }

  @Get('discounts/getAll')
  async getAllDiscounts() {
    return this.discountClient.send({ cmd: 'GET_ALL_DISCOUNTS' }, {})
  }

  @Delete('discounts/delete/:id')
  async deleteDiscount(@Param('id') id: number) {
    return this.discountClient.send({ cmd: 'DELETE_DISCOUNT' }, id);
  }


  //========================================================AUTHENTICATION=================================================================

  @Post('auth/signup')
  async signUp(@Body() payload: AuthDto) {
    return await this.authManagement.createUser(payload);
  }
  
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async validateUser(@Body() user: AuthDto, @Res() res: Response){
    const token = await this.authManagement.login(user);
    res.json(token);
    return token;
  }

  @UseGuards(RefreshJwtGuard)
  @Post('auth/refresh')
  async refreshToken(@Body() user: AuthDto, @Res() res: Response){
    const token = await this.authManagement.login(user);
    res.json(token);
    return token;
  }
}