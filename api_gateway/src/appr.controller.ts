import {Body, Controller, Delete, Get, Inject, Param, Post, Put, Query} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {GetCustomerDTO, RegisterCustomerDTO, UpdateCustomerDTO} from './models/customerModel';
import {InventoryItemDTO, UpdateInventoryItemDTO} from "./models/inventoryModel";
import {CustomerRefundDTO} from "./models/refundModel";

@Controller()
export class ApprController {
  constructor(
      @Inject('CUSTOMER_MANAGEMENT') private customerClient: ClientProxy,
      @Inject('INVENTORY_MANAGEMENT') private inventoryClient: ClientProxy,
      @Inject('REFUND_MANAGEMENT') private refundClient: ClientProxy,
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

  @Get('refund/customerRefund/getAll')
  async getAllCustomerRefunds(){
    return this.refundClient.send({cmd: 'GET_ALL_CUSTOMER_REFUNDS'}, {})
  }

}
