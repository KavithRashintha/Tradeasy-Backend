import { Injectable } from '@nestjs/common';
import { PurchaseOrder } from './purchaseorder.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PurchaseOrderDTO } from './dto/purchaseOrderDTO';

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
      
    }


