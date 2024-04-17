import {Body, Controller, Delete, Get, Inject, Param, Post, Put, Query} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {GetCustomerDTO, RegisterCustomerDTO, UpdateCustomerDTO} from './models/customerModel';
import {InventoryItemDTO, UpdateInventoryItemDTO} from "./models/inventoryModel";
import {CustomerRefundDTO} from "./models/refundModel";
// import {RegisterProductDTO, UpdateProductDTO} from "./models/productModel";
import {RegisterSupplierDTO, UpdateSupplierDTO} from "./models/supplierModel";
import {CustomerPaymentDTO} from "./models/paymentModel";

@Controller()
export class ApprController {
  constructor(
      @Inject('CUSTOMER_MANAGEMENT') private customerClient: ClientProxy,
      @Inject('INVENTORY_MANAGEMENT') private inventoryClient: ClientProxy,
      @Inject('REFUND_MANAGEMENT') private refundClient: ClientProxy,
      // @Inject('PRODUCT_MANAGEMENT') private productClient: ClientProxy,
      @Inject('SUPPLIER_MANAGEMENT') private supplierClient: ClientProxy,
      @Inject('PAYMENT_MANAGEMENT') private paymantClient: ClientProxy
  ) {}

  //=================================CUSTOMER_MANAGEMENT=========================================================================

  @Post('customer/create')
  async createCustomer(@Body() payload: RegisterCustomerDTO) {
    return this.customerClient.send({ cmd: 'CREATE_CUSTOMER' }, payload);
  }

  /*@Post('findCustomer')
  async findCustomerById(@Body() payload:GetCustomerDTO) {
    return this.customerClient.send({cmd:'GET_CUSTOMER'}, payload)
  }*/

  @Get('customer/findCustomer/:id')
  async findCustomer(@Param('id') id: any){
    return this.customerClient.send({cmd:'GET_CUSTOMER'}, id)
  }

  @Get('customer/getAllCustomers')
  async getAllCustomers(){
    return this.customerClient.send({cmd: 'GET_ALL_CUSTOMERS'}, {});
  }

  @Put('customer/update/:id')
  async updateCustomer(@Param('id') id: number, @Body() updateCustomerDto: UpdateCustomerDTO){
    return this.customerClient.send({ cmd: 'UPDATE_CUSTOMER' }, { id, updateCustomerDto });
  }

  @Delete('customer/delete/:id')
  async deleteCustomer(@Param('id') id: number){
    return this.customerClient.send({cmd: 'DELETE_CUSTOMER'}, id);
  }


  //===================================INVENTORY_MANAGEMENT===========================================================================

  @Post('inventory/add')
  async addInventoryItem(@Body() payload: InventoryItemDTO) {
    return this.inventoryClient.send({cmd: 'ADD_INVENTORY_ITEM'}, payload)
  }

  @Get('inventory/get/:id')
  async getInventoryItem(@Param('id') id:number){
    return this.inventoryClient.send({cmd: 'GET_INVENTORY_ITEM'}, id)
  }

  @Get('inventory/getAll')
  async getAllInventoryItems(){
    return this.inventoryClient.send({cmd: 'GET_ALL_INVENTORY_ITEMS'}, {})
  }

  @Put('inventory/update/:id')
  async updateInventoryItem(@Param('id') id:number, @Body() updateInventoryItemDto: UpdateInventoryItemDTO){
    return this.inventoryClient.send({cmd: 'UPDATE_INVENTORY_ITEM'}, {id , updateInventoryItemDto});
  }

  @Delete('inventory/delete/:id')
  async deleteInventoryItem(@Param('id') id:number){
    return this.inventoryClient.send({cmd: 'DELETE_INVENTORY_ITEM'} , id);
  }


  //====================================================REFUND_MANAGEMENT==================================================

  //----------------------------------------------------CUSTOMER_REFUND_MANAGEMENT-----------------------------------------

  @Post('refund/customerRefund/create')
  async createCustomerRefund(@Body() customerRefundDto: CustomerRefundDTO){
    return this.refundClient.send({cmd: 'CREATE_CUSTOMER_REFUND'}, customerRefundDto)
  }

  @Get('refund/customerRefund/get/:id')
  async getCustomerRefund(@Param('id') id:number){
    return this.refundClient.send({cmd: 'GET_CUSTOMER_REFUND'}, id);
  }

  @Get('refund/customerRefund/getAll')
  async getAllCustomerRefunds(){
    return this.refundClient.send({cmd: 'GET_ALL_CUSTOMER_REFUNDS'}, {})
  }

  @Delete('refund/customerRefund/delete/:id')
  async deleteCustomerRefund(@Param('id') id:number){
    return this.refundClient.send({cmd: 'DELETE_CUSTOMER_REFUND'}, id);
  }
      
  


 //----------------------------------------------------PRODUCT_MANAGEMENT-----------------------------------------
// Product Management Controller has been written on a separate file product.controller.ts

    // @Post('product/create')
    // async createProduct(@Body() payload: RegisterProductDTO) {
    //     return this.productClient.send({ cmd: 'CREATE_PRODUCT' }, payload);
    // }

    // @Get('product/findProduct/:id')
    // async findProduct(@Param('id') id: any){
    //     return this.productClient.send({cmd:'GET_PRODUCT'}, id)
    // }


    // @Get('product/getAllProducts')
    // async getAllProducts(){
    //     return this.productClient.send({cmd: 'GET_ALL_PRODUCTS'}, {});
    // }

    // @Put('product/update/:id')
    // async updateProduct(@Param('id') id: number, @Body() updateProductDto: UpdateProductDTO){
    //     return this.productClient.send({ cmd: 'UPDATE_PRODUCT' }, { id, updateProductDto });
    // }

    // @Delete('product/delete/:id')
    // async deleteProduct(@Param('id') id: number){
    //     return this.productClient.send({cmd: 'DELETE_PRODUCT'}, id);
    // }


  //===================================SUPPLIER_MANAGEMENT===========================================================================
  @Post('supplier/create')
  async createSupplier(@Body() payload: RegisterSupplierDTO) {
    return this.supplierClient.send({ cmd: 'CREATE_SUPPLIER' }, payload);
  }

  @Get('supplier/getSupplier/:id')
  async getSupplier(@Param('id') id: any) {
    return this.supplierClient.send({ cmd: 'GET_SUPPLIER' }, id)
  }

  @Get('supplier/getAllSuppliers')
  async getAllSuppliers() {
    return this.supplierClient.send({ cmd: 'GET_ALL_SUPPLIERS' }, {});
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

  @Post('payment/customerPayment/create')
  async createCustomerPayment(@Body() customerPaymentDto: CustomerPaymentDTO) {
    return this.paymantClient.send({ cmd: 'CREATE_CUSTOMER_PAYMENT' }, customerPaymentDto);
  }

  @Get('payment/customerPayment/getAllCustomerPayments')
  async getAllCustomerPayments(){
    return await this.paymantClient.send({cmd:'GET_ALL_CUSTOMER_PAYMENTS'},{});
  }

  @Get('payment/customerPayment/get/:id')
  async getCustomerPaymentById(@Param('id') id: number){
    return await this.paymantClient.send({cmd: 'GET_CUSTOMER_PAYMENT'}, id);
  }

}




