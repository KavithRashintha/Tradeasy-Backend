import {Body, Controller, Delete, Get, Inject, Param, Post, Put, Query} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {InventoryItemDTO, UpdateInventoryItemDTO} from "./models/inventoryModel";
import {CustomerRefundDTO} from "./models/refundModel";

@Controller()
export class ApprController {
  constructor(
      @Inject('INVENTORY_MANAGEMENT') private inventoryClient: ClientProxy,
      @Inject('REFUND_MANAGEMENT') private refundClient: ClientProxy,
  ) {}

  //=================================CUSTOMER_MANAGEMENT=========================================================================



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

  @Get('inventory/getByCategory')
  async getInventoryItemByCategory(@Query('itemCategory') itemCategory:string){
    return this.inventoryClient.send({cmd: 'GET_INVENTORY_ITEM_BY_CATEGORY'}, itemCategory);
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

}
