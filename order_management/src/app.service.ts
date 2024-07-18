import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order, PurchaseOrder } from './order.entity';
import { Repository, ILike } from 'typeorm';
import {OrderDTO} from './DTO/OrderDTO';
import {UpdateOrderDTO} from "./DTO/UpdateOrderDTO";
import { PurchaseOrderDTO, UpdatePurchaseOrderDTO } from './DTO/purchaseOrderDTO';
import { Query } from 'express-serve-static-core';


@Injectable()
export class AppService {

  constructor(
      @InjectRepository(Order)
      private readonly customerOrderRepository: Repository<Order>,

      @InjectRepository(PurchaseOrder)
      private readonly inventoryOrderRepository: Repository<PurchaseOrder>,
  ) {}

  async createOrders(createOrderDTO: OrderDTO): Promise<Order> {
    const newOrder = this.customerOrderRepository.create({
      ...createOrderDTO,
      orderDate: new Date(),
      lastOrderStatusUpdatedDate: new Date() // Set the lastOrderStatusUpdatedDate to the current date when a new order is created
    });
    return await this.customerOrderRepository.save(newOrder);
  }

  async findOrder(id:any): Promise<Order | null>{
    return await this.customerOrderRepository.findOneById(id);
  }

  async getAllOrders():Promise<Order[]>{
    return await this.customerOrderRepository.find();
  }

  async updateOrder(id: number, updateOrderDto: UpdateOrderDTO): Promise<Order> {

    await this.customerOrderRepository.update(id, {
      ...updateOrderDto,
      lastOrderStatusUpdatedDate: new Date()
    });
    return await this.customerOrderRepository.findOneById(id);
  }

  async deleteOrder(id: number){
    const result = await this.customerOrderRepository.delete(id);
    if(!result){
      return "Not Deleted";
    }else{
      return "Successfully Deleted";
    }
  }

  async getOrdersCount() {
    return await this.customerOrderRepository.count();
  }


  //=============================================INVENTORY_ORDER_MANAGEMENT======================================================================

  async createPurchaseOrder(purchaseOrderDTO: PurchaseOrderDTO): Promise<PurchaseOrder> {
    const newPurchaseOrder = this.inventoryOrderRepository.create(purchaseOrderDTO);
    return await this.inventoryOrderRepository.save(newPurchaseOrder);
}  

async getAllPurchaseOrder(): Promise<PurchaseOrder[]> {
    return await this.inventoryOrderRepository.find();
}

async getPurchaseOrderById(purchase_id: number): Promise<PurchaseOrder> {
    return await this.inventoryOrderRepository.findOneById(purchase_id);
}

async updatePurchaseOrder(id: number, updatePurchaseOrderDTO: UpdatePurchaseOrderDTO): Promise<PurchaseOrder> {
  console.log("ser:", updatePurchaseOrderDTO);
  
  const purchaseOrder = await this.inventoryOrderRepository.findOneById(id);
  if (!purchaseOrder) {
    throw new Error('Purchase order not found');
  }

  
  purchaseOrder.status = updatePurchaseOrderDTO.status;
  if (updatePurchaseOrderDTO.status === 'cancelled') {
    purchaseOrder.order_cancel_reason = updatePurchaseOrderDTO.order_cancel_reason;
  } else {
    purchaseOrder.order_cancel_reason = '';
  }

  
  return await this.inventoryOrderRepository.save(purchaseOrder);
}


async deletePurchaseOrder(purchase_id:number){
    const result = await this.inventoryOrderRepository.delete(purchase_id);
    if (!result) {
      return 'Not Deleted';
    } else {
      return 'Successfully Deleted';
    }
  }

  async getCountOfOrdersByStatus(status: string): Promise<number> {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; //January =0

    const query = this.inventoryOrderRepository.createQueryBuilder('purchase_order')
        .andWhere(`EXTRACT(YEAR FROM purchase_order.createdDate) = :year`, { year: currentYear })
        .andWhere(`EXTRACT(MONTH FROM purchase_order.createdDate) = :month`, { month: currentMonth });

    if (status !== 'total') {
        query.andWhere('purchase_order.status = :status', { status });
    }

    return await query.getCount();
}

getCurrentMonthName(): string {
  const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
  ];
  const currentMonthIndex = new Date().getMonth(); // getMonth() is zero-indexed
  return months[currentMonthIndex];
}

async searchAllOrders(query: Query): Promise<PurchaseOrder[]> {
console.log('Received query:', query);
const keyword = (query.query as { keyword?: string }).keyword;
try {
  const filteredorders = await this.inventoryOrderRepository.find({ where: { supplierName: ILike(`%${keyword}%`) } });
  console.log('Filtered orders:', filteredorders);
  return filteredorders;
} catch (error) {
  console.error('Error occurred while searching orders:', error);
  return [];
}
}

async markAsReceived(id: number): Promise<PurchaseOrder> {
  const purchaseOrder = await this.inventoryOrderRepository.findOne({ where: { id } });

  if (!purchaseOrder) {
    throw new Error('Purchase order not found');
  }

  purchaseOrder.status = 'Received';
  purchaseOrder.departedDate = new Date();

  return this.inventoryOrderRepository.save(purchaseOrder);
}



}



