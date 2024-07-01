import {Controller, Get, Param} from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Order, PurchaseOrder } from './order.entity';
import {OrderDTO} from './DTO/OrderDTO';
import {UpdateOrderDTO} from "./DTO/UpdateOrderDTO";
import { PurchaseOrderDTO, UpdatePurchaseOrderDTO } from './DTO/purchaseOrderDTO';
import { Query } from 'express-serve-static-core';

@Controller()
export class AppController {
  constructor(private readonly orderManagement: AppService) {}

  @MessagePattern({cmd: 'CREATE_ORDER'})
  async createOrders(@Payload() createOrderDto: OrderDTO): Promise<Order>{
    return await this.orderManagement.createOrders(createOrderDto);
  }

  @MessagePattern({ cmd: 'GET_ORDER' })
  async getOrderById(
      @Payload() id:any
  ): Promise<Order | null> {
    return await this.orderManagement.findOrder(id);
  }

  @MessagePattern({cmd: 'GET_ALL_ORDERS'})
  async getAllOrders(): Promise<Order[]>{
    return await this.orderManagement.getAllOrders();
  }

  @MessagePattern({cmd: 'UPDATE_ORDER'})
  async updateOrder(@Payload() data: { id: number, updateOrderDto: UpdateOrderDTO }): Promise<Order> {
    const { id, updateOrderDto } = data;
    return await this.orderManagement.updateOrder(id, updateOrderDto);

  }

  @MessagePattern({cmd: 'DELETE_ORDER'})
  async deleteOrder(@Payload() id:number){
    return await this.orderManagement.deleteOrder(id);
  }

  @MessagePattern({cmd: 'GET_ORDERS_COUNT'})
  async getOrdersCount(){
      return await this.orderManagement.getOrdersCount();
  }


  //=============================================INVENTORY_ORDER_MANAGEMENT======================================================================

  @MessagePattern ({cmd: 'CREATE_PURCHASE_ORDER'})
   async createPurchaseOrder(@Payload() purchaseOrderDTO: PurchaseOrderDTO):Promise<PurchaseOrderDTO>{
     return this.orderManagement.createPurchaseOrder(purchaseOrderDTO);
   }

    @MessagePattern({cmd: 'GET_ALL_PURCHASE_ORDER'})
    async getAllPurchaseOrder(): Promise<PurchaseOrderDTO[]>{
      return this.orderManagement.getAllPurchaseOrder();
    }

    @MessagePattern({cmd: 'GET_PURCHASE_ORDER_BY_ID'})
    async getPurchaseOrderById(@Payload() purchase_id: number): Promise<PurchaseOrderDTO>{
      return this.orderManagement.getPurchaseOrderById(purchase_id);
    }

    @MessagePattern({cmd: 'UPDATE_PURCHASE_ORDER'})
    async updatePurchaseOrder(@Payload() data: { id: number, updatePurchaseOrderDTO: UpdatePurchaseOrderDTO }): Promise<PurchaseOrder> {
      console.log("con:",data)
      const { id, updatePurchaseOrderDTO } = data;
      return await this.orderManagement.updatePurchaseOrder(id, updatePurchaseOrderDTO);
    }

    @MessagePattern({cmd: 'DELETE_PURCHASE_ORDER'})
    async deletePurchaseOrder(@Payload() purchase_id: number){
      return this.orderManagement.deletePurchaseOrder(purchase_id);
    }

   @MessagePattern({cmd: 'GET_COUNT_OF_ORDERS_BY_STATUS'})  
    async getCountOfOrdersByStatus(@Payload() status: string): Promise<number> {
      return this.orderManagement.getCountOfOrdersByStatus(status);
    }

   @MessagePattern({cmd: 'GET_CURRENT_MONTH_NAME'})
    getCurrentMonthName(): string {
      return this.orderManagement.getCurrentMonthName();
    } 

    @MessagePattern({cmd: 'SEARCH_ALL_ORDERS'})
    async searchAllOrders(@Payload() query: Query): Promise<PurchaseOrderDTO[]>{
      return await this.orderManagement.searchAllOrders(query);
    }
  
    @MessagePattern({ cmd: 'MARK_PURCHASE_ORDER_AS_DEPARTED' })
    async markPurchaseOrderAsDeparted(@Payload() id: number): Promise<PurchaseOrder> {
    return await this.orderManagement.markAsDeparted(id);
  }

}
