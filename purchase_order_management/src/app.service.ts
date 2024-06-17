import { Injectable } from '@nestjs/common';
import { PurchaseOrder } from './purchaseorder.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PurchaseOrderDTO } from './dto/purchaseOrderDTO';
import { Query } from 'express-serve-static-core';
import { ILike } from 'typeorm';

@Injectable()
export class AppService {

    constructor(
        @InjectRepository(PurchaseOrder)
        private readonly purchaseOrder: Repository<PurchaseOrder>,
    ) {}

    async createPurchaseOrder(purchaseOrderDTO: PurchaseOrderDTO): Promise<PurchaseOrder> {
        const newPurchaseOrder = this.purchaseOrder.create(purchaseOrderDTO);
        return await this.purchaseOrder.save(newPurchaseOrder);
    }  

    async getAllPurchaseOrder(): Promise<PurchaseOrder[]> {
        return await this.purchaseOrder.find();
    }

    async getPurchaseOrderById(purchase_id: number): Promise<PurchaseOrder> {
        return await this.purchaseOrder.findOneById(purchase_id);
    }

    async deletePurchaseOrder(purchase_id:number){
        const result = await this.purchaseOrder.delete(purchase_id);
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
    
        const query = this.purchaseOrder.createQueryBuilder('purchase_order')
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
      const filteredorders = await this.purchaseOrder.find({ where: { supplierName: ILike(`%${keyword}%`) } });
      console.log('Filtered orders:', filteredorders);
      return filteredorders;
    } catch (error) {
      console.error('Error occurred while searching orders:', error);
      return [];
    }
  }

  async getSuppliersList(): Promise<{ id: string, name: string }[]> {
    const today = new Date();
    const sevenDaysAgo = new Date(today.setDate(today.getDate() - 7));
    
    const suppliers = await this.purchaseOrder
      .createQueryBuilder('purchase_order')
      .select('purchase_order.supplierId', 'id')
      .addSelect('purchase_order.supplierName', 'name')
      .where('purchase_order.createdDate BETWEEN :sevenDaysAgo AND :today', { sevenDaysAgo, today: new Date() })
      .distinct(true)
      .getRawMany();
      
    return suppliers;
  }

  async getItemsList(supplierId: string): Promise<string[]> {
    const today = new Date();
    const sevenDaysAgo = new Date(today.setDate(today.getDate() - 7));
    
    const result = await this.purchaseOrder
      .createQueryBuilder('purchaseOrder')
      .select('DISTINCT purchaseOrder.items', 'items')
      .where('purchaseOrder.supplierId = :supplierId', { supplierId })
      .andWhere('purchaseOrder.createdDate BETWEEN :sevenDaysAgo AND :today', { sevenDaysAgo, today: new Date() })
      .getRawMany();

    return result.map(item => item.items);
  }


      
    }


