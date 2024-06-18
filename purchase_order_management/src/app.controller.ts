import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PurchaseOrderDTO, UpdatePurchaseOrderDTO } from './dto/purchaseOrderDTO';
import { Query } from 'express-serve-static-core';


@Controller()
export class AppController {
  constructor(private readonly purchasedOrder: AppService) {}
   @MessagePattern ({cmd: 'CREATE_PURCHASE_ORDER'})
   async createPurchaseOrder(@Payload() purchaseOrderDTO: PurchaseOrderDTO):Promise<PurchaseOrderDTO>{
     return this.purchasedOrder.createPurchaseOrder(purchaseOrderDTO);
   }

    @MessagePattern({cmd: 'GET_ALL_PURCHASE_ORDER'})
    async getAllPurchaseOrder(): Promise<PurchaseOrderDTO[]>{
      return this.purchasedOrder.getAllPurchaseOrder();
    }

    @MessagePattern({cmd: 'GET_PURCHASE_ORDER_BY_ID'})
    async getPurchaseOrderById(@Payload() purchase_id: number): Promise<PurchaseOrderDTO>{
      return this.purchasedOrder.getPurchaseOrderById(purchase_id);
    }

    @MessagePattern({cmd: 'UPDATE_PURCHASE_ORDER'})
    async updatePurchaseOrder(@Payload() data: { id: number, updatePurchaseOrderDTO: UpdatePurchaseOrderDTO }): Promise<UpdatePurchaseOrderDTO> {
      console.log("con:",data)
      const { id, updatePurchaseOrderDTO } = data;
      return await this.purchasedOrder.updatePurchaseOrder(id, updatePurchaseOrderDTO);
    }

    @MessagePattern({cmd: 'DELETE_PURCHASE_ORDER'})
    async deletePurchaseOrder(@Payload() purchase_id: number){
      return this.purchasedOrder.deletePurchaseOrder(purchase_id);
    }

   @MessagePattern({cmd: 'GET_COUNT_OF_ORDERS_BY_STATUS'})  
    async getCountOfOrdersByStatus(@Payload() status: string): Promise<number> {
      return this.purchasedOrder.getCountOfOrdersByStatus(status);
    }

   @MessagePattern({cmd: 'GET_CURRENT_MONTH_NAME'})
    getCurrentMonthName(): string {
      return this.purchasedOrder.getCurrentMonthName();
    } 

    @MessagePattern({cmd: 'SEARCH_ALL_ORDERS'})
    async searchAllOrders(@Payload() query: Query): Promise<PurchaseOrderDTO[]>{
      return await this.purchasedOrder.searchAllOrders(query);
    }
  
    @MessagePattern({cmd: 'GET_SUPPLIERS_LIST'})
    async getSuppliersList(): Promise<{ id: string, name: string }[]> {
        return this.purchasedOrder.getSuppliersList();
    }
    
    @MessagePattern({ cmd: 'GET_ITEMS_LIST_BY_SUPPLIER' })
    async getItemsList(@Payload() supplierId: string): Promise<string[]> {
      return this.purchasedOrder.getItemsList(supplierId);
    }
    
}
