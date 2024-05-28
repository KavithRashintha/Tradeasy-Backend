import { Body, Controller, Delete, Get, Inject, Param, Post, Put, Query, UseGuards, Res, Req, HttpCode, HttpStatus } from '@nestjs/common';
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
import { JwtGuard} from './guards/jwt.guard';
import { RefreshJwtGuard} from './guards/refresh.jwt.guard';
import {AdminAuthGuard, CustomerAuthGuard,SupplierAuthGuard} from './guards/local.guard';
import { Response } from 'express';
import { PurchaseOrderDTO } from './models/purchaseOrderModel';
import { In } from 'typeorm';
import {RegisterAdminDTO, UpdateAdminDTO} from "./models/adminModel";

@Controller()
export class ApprController {
  constructor(
    @Inject('CUSTOMER_MANAGEMENT') private customerClient: ClientProxy,
    @Inject('INVENTORY_MANAGEMENT') private inventoryClient: ClientProxy,
    @Inject('REFUND_MANAGEMENT') private refundClient: ClientProxy,
    @Inject('SUPPLIER_MANAGEMENT') private supplierClient: ClientProxy,
    @Inject('PAYMENT_MANAGEMENT') private paymantClient: ClientProxy,
    @Inject('DISCOUNT_MANAGEMENT') private discountClient: ClientProxy,
    @Inject ('INVENTORY_REFUND_MANAGEMENT') private inventoryRefund: ClientProxy,
    @Inject ('PURCHASE_ORDER_MANAGEMENT') private inventoryOrder: ClientProxy,
    @Inject ('ADMIN_MANAGEMENT') private adminClient: ClientProxy,

    private authManagement: AppService
  ) { }

  //===============================================CUSTOMER_MANAGEMENT=========================================================================
  @UseGuards(JwtGuard)
  @Post('customer/create')
  async createCustomer(@Body() payload: RegisterCustomerDTO) {
    return this.customerClient.send({ cmd: 'CREATE_CUSTOMER' }, payload);
  }

  @UseGuards(JwtGuard)
  @Get('customer/findCustomer/:id')
  async findCustomer(@Param('id') id: any) {
    return this.customerClient.send({ cmd: 'GET_CUSTOMER' }, id)
  }

  @UseGuards(JwtGuard)
  @Get('customer/findCustomerByUsername/:username')
  async findCustomerByUsername(@Param('username') username: any) {
    return this.customerClient.send({ cmd: 'GET_CUSTOMER_BY_USERNAME' }, username)
  }

  @UseGuards(JwtGuard)
  @Get('customer/getAllCustomers')
  async getAllCustomers() {
    return this.customerClient.send({ cmd: 'GET_ALL_CUSTOMERS' }, {});
  }

  @UseGuards(JwtGuard)
  @Put('customer/update/:id')
  async updateCustomer(@Param('id') id: number, @Body() updateCustomerDto: UpdateCustomerDTO) {
    return this.customerClient.send({ cmd: 'UPDATE_CUSTOMER' }, { id, updateCustomerDto });
  }

  @UseGuards(JwtGuard)
  @Delete('customer/delete/:id')
  async deleteCustomer(@Param('id') id: number) {
    return this.customerClient.send({ cmd: 'DELETE_CUSTOMER' }, id);
  }

  @UseGuards(JwtGuard)
  @Get('customer/search')
  async searchAllCustomers(@Query() query: ExpressQuery) {
    return this.customerClient.send({ cmd: 'SEARCH_ALL_CUSTOMERS' }, {query})
  }

  @UseGuards(JwtGuard)
  @Get('customer/activeCustomers')
  async getActiveCustomers(){
    return this.customerClient.send({ cmd: 'GET_ACTIVE_CUSTOMERS' }, {});
  }

  //===============================================ADMIN_MANAGEMENT=========================================================================
  @UseGuards(JwtGuard)
  @Post('admin/create')
  async createAdmin(@Body() payload: RegisterAdminDTO) {
    return this.adminClient.send({ cmd: 'CREATE_ADMIN' }, payload);
  }

  @UseGuards(JwtGuard)
  @Get('customer/findAdmin/:id')
  async findAdmin(@Param('id') id: any) {
    return this.adminClient.send({ cmd: 'GET_ADMIN' }, id)
  }

  @UseGuards(JwtGuard)
  @Get('admin/findAdminByUsername/:username')
  async findAdminByUsername(@Param('username') username: any) {
    return this.adminClient.send({ cmd: 'GET_ADMIN_BY_USERNAME' }, username)
  }

  @UseGuards(JwtGuard)
  @Get('admin/getAllAdmins')
  async getAllAdmins() {
    return this.adminClient.send({ cmd: 'GET_ALL_ADMINS' }, {});
  }

  @UseGuards(JwtGuard)
  @Put('admin/update/:id')
  async updateAdmin(@Param('id') id: number, @Body() updateAdminDto: UpdateAdminDTO) {
    return this.adminClient.send({ cmd: 'UPDATE_ADMIN' }, { id, updateAdminDto });
  }

  @UseGuards(JwtGuard)
  @Delete('admin/delete/:id')
  async deleteAdmin(@Param('id') id: number) {
    return this.adminClient.send({ cmd: 'DELETE_ADMIN' }, id);
  }

  @UseGuards(JwtGuard)
  @Get('admin/search')
  async searchAllAdmins(@Query() query: ExpressQuery) {
    return this.adminClient.send({ cmd: 'SEARCH_ALL_ADMINS' }, {query})
  }

  @UseGuards(JwtGuard)
  @Get('admin/activeCustomers')
  async getActiveAdmins(){
    return this.adminClient.send({ cmd: 'GET_ACTIVE_ADMINS' }, {});
  }


  //===================================INVENTORY_MANAGEMENT===========================================================================
  @UseGuards(JwtGuard)
  @Post('inventory/add')
  async addInventoryItem(@Body() payload: InventoryItemDTO) {
    return this.inventoryClient.send({ cmd: 'ADD_INVENTORY_ITEM' }, payload)
  }

  @UseGuards(JwtGuard)
  @Get('inventory/get/:id')
  async getInventoryItem(@Param('id') id: number) {
    return this.inventoryClient.send({ cmd: 'GET_INVENTORY_ITEM' }, id)
  }

  @UseGuards(JwtGuard)
  @Get('inventory/getAll')
  async getAllInventoryItems() {
    return this.inventoryClient.send({ cmd: 'GET_ALL_INVENTORY_ITEMS' }, {})
  }

  @UseGuards(JwtGuard)
  @Put('inventory/update/:id')
  async updateInventoryItem(@Param('id') id: number, @Body() updateInventoryItemDto: UpdateInventoryItemDTO) {
    return this.inventoryClient.send({ cmd: 'UPDATE_INVENTORY_ITEM' }, { id, updateInventoryItemDto });
  }

  @UseGuards(JwtGuard)
  @Delete('inventory/delete/:id')
  async deleteInventoryItem(@Param('id') id: number) {
    return this.inventoryClient.send({ cmd: 'DELETE_INVENTORY_ITEM' }, id);
  }

  @UseGuards(JwtGuard)
  @Get('inventory/getByCategory')
  async getInventoryItemByCategory(@Query('productCategory') productCategory:string){
    return this.inventoryClient.send({cmd: 'GET_INVENTORY_ITEM_BY_CATEGORY'}, productCategory);
  }

  @UseGuards(JwtGuard)
  @Get('inventory/getInventoryStatus')
  async getNumberOfItems(){
    return this.inventoryClient.send({cmd: 'GET_INVENTORY_STATUS'}, {});
  }


  //====================================================REFUND_MANAGEMENT==================================================

  //----------------------------------------------------CUSTOMER_REFUND_MANAGEMENT-----------------------------------------
  @UseGuards(JwtGuard)
  @Post('refund/customerRefund/create')
  async createCustomerRefund(@Body() customerRefundDto: CustomerRefundDTO) {
    return this.refundClient.send({ cmd: 'CREATE_CUSTOMER_REFUND' }, customerRefundDto)
  }

  @UseGuards(JwtGuard)
  @Get('refund/customerRefund/get/:id')
  async getCustomerRefund(@Param('id') id: number) {
    return this.refundClient.send({ cmd: 'GET_CUSTOMER_REFUND' }, id);
  }

  @UseGuards(JwtGuard)
  @Get('refund/customerRefund/getAll')
  async getAllCustomerRefunds() {
    return this.refundClient.send({ cmd: 'GET_ALL_CUSTOMER_REFUNDS' }, {})
  }

  @UseGuards(JwtGuard)
  @Delete('refund/customerRefund/delete/:id')
  async deleteCustomerRefund(@Param('id') id: number) {
    return this.refundClient.send({ cmd: 'DELETE_CUSTOMER_REFUND' }, id);
  }

  @UseGuards(JwtGuard)
  @Get('refund/customerRefund/getRefundByStatus')
  async getCustomerRefundByStatus(@Query('refundStatus') refundStatus:string){
    return this.refundClient.send({cmd: 'GET_CUSTOMER_REFUND_BY_CATEGORY'}, refundStatus);
  }

  @UseGuards(JwtGuard)
  @Get('refund/customerRefund/test')
  async runTestFunction(){
    return await this.refundClient.send({cmd: 'CALLING_TEST_FUNCTION'}, {});
  }

  @UseGuards(JwtGuard)
  @Get('refund/customerRefundCount')
  async getCustomerRefundCount(){
    return await this.refundClient.send({cmd: 'GET_CUSTOMER_REFUND_COUNT'}, {});
  }

 //----------------------------------------------------Inventory_REFUND_MANAGEMENT-----------------------------------------
 @UseGuards(JwtGuard)
 @Post('refund/inventoryRefund/create')
 async createInventoryRefund(@Body() inventoryRefundDTO:InventoryRefundDTO)
  {
    return this.inventoryRefund.send({cmd:'CREATE_INVENTORY_REFUND'},inventoryRefundDTO);
  }
 
@UseGuards(JwtGuard)  
@Get('refund/inventoryRefund/getAll')
async getAllInventoryRefunds(){
  return this.inventoryRefund.send({cmd:'GET_ALL_INVENTORY_REFUND'},{})
}

@UseGuards(JwtGuard)
@Get('refund/inventoryRefund/get/:id')
async getInventoryRefundById(@Param('id') id:number){
  return this.inventoryRefund.send({cmd:'GET_INVENTORY_REFUND_BY_ID'},id)
}

@UseGuards(JwtGuard)
@Delete('refund/inventoryRefund/delete/:id')
async deleteInventoryRefund(@Param('id') id:number){  
  return this.inventoryRefund.send({cmd:'DELETE_CUSTOMER_REFUND'},id)
}

@UseGuards(JwtGuard)
@Get('refund/approvedRefunds/getAll')
  async getAllApprovedRefunds() {
      return this.inventoryRefund.send({ cmd: 'GET_ALL_APPROVED_REFUNDS' }, {});
  }






   //----------------------------------------------------Inventory_REFUND_MANAGEMENT-----------------------------------------
  @UseGuards(JwtGuard) 
  @Post('payment/inventoryPayment/create')
  async createInventoryPayment(@Body() inventoryPaymentDTO:InventoryRefundDTO){
    return this.paymantClient.send({cmd:'CREATE_INVENTORY_PAYMENT'},inventoryPaymentDTO);
  }
  
  @UseGuards(JwtGuard)
  @Get('payment/inventoryPayment/getAll')
  async getAllInventoryPayments(){
    return this.paymantClient.send({cmd:'GET_ALL_INVENTORY_PAYMENT'},{})
  }

  @UseGuards(JwtGuard)
  @Get('payment/inventoryPayment/get/:id')  
  async getInventoryPaymentById(@Param('id') id:number){
    return this.paymantClient.send({cmd:'GET_INVENTORY_PAYMENT_BY_ID'},id)
  }
 

  //================================================PURCHASE_ORDER__MANAGEMENT===========================================================================
  @UseGuards(JwtGuard)
  @Post('purchaseOrder/create')
  async createPurchaseOrder(@Body() purchaseOrderDTO: PurchaseOrderDTO){
    return this.inventoryOrder.send({cmd: 'CREATE_PURCHASE_ORDER'}, purchaseOrderDTO);
  }

  @UseGuards(JwtGuard)
  @Get('purchaseOrder/getAll')
  async getAllPurchaseOrder(){
    return this.inventoryOrder.send({cmd: 'GET_ALL_PURCHASE_ORDER'}, {});
  }

  @UseGuards(JwtGuard)
  @Get('purchaseOrder/get/:id')
  async getPurchaseOrderById(@Param('id') id:number){
    return this.inventoryOrder.send({cmd: 'GET_PURCHASE_ORDER_BY_ID'}, id);
  }

  @UseGuards(JwtGuard)
  @Delete('purchaseOrder/delete/:id')
  async deletePurchaseOrder(@Param('id') id:number){
    return this.inventoryOrder.send({cmd: 'DELETE_PURCHASE_ORDER'}, id);
  }

  @UseGuards(JwtGuard)
  @Get('purchaseOrder/getCountOfOrdersByStatus/:status')
  async getCountOfOrdersByStatus(@Param('status') status: string){
    return this.inventoryOrder.send({cmd: 'GET_COUNT_OF_ORDERS_BY_STATUS'}, status);
  }

  @UseGuards(JwtGuard)
  @Get('purchaseOrder/getCurrentMonthName')
  async getCurrentMonthName(){
    return this.inventoryOrder.send({cmd: 'GET_CURRENT_MONTH_NAME'}, {});
  }

  


  //===================================SUPPLIER_MANAGEMENT===========================================================================
  @UseGuards(JwtGuard)
  @Post('supplier/create')
  async createSupplier(@Body() payload: RegisterSupplierDTO) {
    return this.supplierClient.send({ cmd: 'CREATE_SUPPLIER' }, payload);
  }

  @UseGuards(JwtGuard)
  @Get('supplier/getSupplier/:id')
  async getSupplier(@Param('id') id: any) {
    return this.supplierClient.send({ cmd: 'GET_SUPPLIER' }, id)
  }

  @UseGuards(JwtGuard)
  @Get('supplier/getAllSuppliers')
  async getAllSuppliers() {
    return this.supplierClient.send({ cmd: 'GET_ALL_SUPPLIERS' }, {});
  }

  @UseGuards(JwtGuard)
  @Get('supplier/search')
  async searchAllSuppliers(@Query() query: ExpressQuery) {
    return this.supplierClient.send({ cmd: 'SEARCH_ALL_SUPPLIERS' }, {query})
  }

  @UseGuards(JwtGuard)
  @Put('supplier/update/:id')
  async updateSupplier(@Param('id') id: number, @Body() updateSupplierDto: UpdateSupplierDTO) {
    console.log("API - AC");
    return this.supplierClient.send({ cmd: 'UPDATE_SUPPLIER' }, { id, updateSupplierDto });
  }

  @UseGuards(JwtGuard)
  @Delete('supplier/delete/:id')
  async deleteSupplier(@Param('id') id: number) {
    return this.supplierClient.send({ cmd: 'DELETE_SUPPLIER' }, id);
  }



  //====================================================PAYMENT_MANAGEMENT==================================================

  //----------------------------------------------------CUSTOMER_Payment_MANAGEMENT-----------------------------------------
  @UseGuards(JwtGuard)
  @Post('payment/customerPayment/checkout')
  async createCustomerPaymentSession(@Body() data: any){
    return this.paymantClient.send({ cmd: 'CREATE_CHECKOUT_SESSION' }, data);
  }

  @UseGuards(JwtGuard)
  @Get('payment/customerPayment/checkout-session/:sessionId')
  async getCheckoutSession(@Param('sessionId') sessionId: string) {
    console.log('Session ID:', sessionId);
    return await this.paymantClient.send({ cmd: 'GET_CHECKOUT_SESSION' }, sessionId);
  }

  @UseGuards(JwtGuard)
  @Post('payment/customerPayment/create')
  async saveCustomerPayments(@Body() data: Data): Promise<any>{
    return this.paymantClient.send({ cmd: 'CREATE_CUSTOMER_PAYMENT' }, data);
  }

  @UseGuards(JwtGuard)
  @Get('payment/customerPayment/getAllCustomerPayments')
  async getAllCustomerPayments() {
    return await this.paymantClient.send({ cmd: 'GET_ALL_CUSTOMER_PAYMENTS' }, {});
  }

  @UseGuards(JwtGuard)
  @Get('payment/customerPayment/get/:id')
  async getCustomerPaymentById(@Param('id') id: number) {
    return await this.paymantClient.send({ cmd: 'GET_CUSTOMER_PAYMENT' }, id);
  }

  @UseGuards(JwtGuard)
  @Get('payment/customerPayment/search')
  async searchAllPayments(@Query() query: ExpressQuery) {
    return this.paymantClient.send({ cmd: 'SEARCH_ALL_CUSTOMER_PAYMENTS' }, {query});
  }

  //----------------------------------------------------SUPPLIER_Payment_MANAGEMENT-----------------------------------------
  @UseGuards(JwtGuard)
  @Post('payment/supplierPayment/create')
  async createSupplierPayment(@Body() supplierPaymentDTO: SupplierPaymentDTO){
    return this.paymantClient.send({ cmd: 'CREATE_SUPPLIER_PAYMENT' }, supplierPaymentDTO);
  }

  @UseGuards(JwtGuard)
  @Get('payment/supplierPayment/getAll')
  async getAllSupplierPayments() {
    return await this.paymantClient.send({ cmd: 'GET_ALL_SUPPLIER_PAYMENTS' }, {});
  }

  @UseGuards(JwtGuard)
  @Get('payment/supplierPayment/search')
  async searchAllSupplierPayments(@Query() query: ExpressQuery) {
    return this.paymantClient.send({ cmd: 'SEARCH_ALL_SUPPLIER_PAYMENTS' }, {query});
  }


  //====================================================DISCOUNT_MANAGEMENT==================================================
  @UseGuards(JwtGuard)
  @Post('discounts/create')
  async createDiscount(@Body() discountsDTO: DiscountsDTO) {
    return this.discountClient.send({ cmd: 'CREATE_DISCOUNT' }, discountsDTO);
  }

  @UseGuards(JwtGuard)
  @Get('discounts/search')
  async searchAllDiscounts(@Query() query: ExpressQuery) {
    return this.discountClient.send({ cmd: 'SEARCH_ALL_DISCOUNTS' }, {query})
  }

  @UseGuards(JwtGuard)
  @Get('discounts/get/:id')
  async getDiscountById(@Param('id') id: number) {
    return this.discountClient.send({ cmd: 'GET_DISCOUNT' }, id);
  }

  @UseGuards(JwtGuard)
  @Get('discounts/getAll')
  async getAllDiscounts() {
    return this.discountClient.send({ cmd: 'GET_ALL_DISCOUNTS' }, {})
  }

  @UseGuards(JwtGuard)
  @Delete('discounts/delete/:id')
  async deleteDiscount(@Param('id') id: number) {
    return this.discountClient.send({ cmd: 'DELETE_DISCOUNT' }, id);
  }


  //========================================================AUTHENTICATION=================================================================

  @Post('auth/signup')
  async adminSignUp(@Body() payload: AuthDto) {
    
    if(payload.role == 'customer'){
      return this.customerClient.send({ cmd: 'CREATE_CUSTOMER' }, payload);
    }
    else if(payload.role == 'supplier'){
      return this.supplierClient.send({ cmd: 'CREATE_SUPPLIER' }, payload);
    }
    else{
      // return await this.authManagement.createUser(payload);
      return this.adminClient.send({ cmd: 'CREATE_ADMIN' }, payload);
    }
  }
  
  @HttpCode(HttpStatus.OK)
  @UseGuards(CustomerAuthGuard)
  @Post('auth/customer/login')
  async customerSignIn(@Req() req){
    return await this.authManagement.customerLogin(req.user);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(SupplierAuthGuard)
  @Post('auth/supplier/login')
  async supplierSignIn(@Req() req){
    return await this.authManagement.supplierLogin(req.user);
  }

  // @HttpCode(HttpStatus.OK)
  // @UseGuards(AdminAuthGuard)
  // @Post('auth/admin/login')
  // async adminSignIn(@Req() req){
  //   return await this.authManagement.login(req.user);
  // }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AdminAuthGuard)
  @Post('auth/admin/login')
  async adminSignIn(@Req() req){
    return await this.authManagement.adminLogin(req.user);
  }

  @Post('auth/logout')
  async logout(){
    return await this.authManagement.logout(); 
  }

}