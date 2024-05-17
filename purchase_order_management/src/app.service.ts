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
        return await this.purchaseOrder.createQueryBuilder('purchaseOrder')
            .where('purchaseOrder.status = :status', { status })
            .getCount();
       }
    
    
      
    }


