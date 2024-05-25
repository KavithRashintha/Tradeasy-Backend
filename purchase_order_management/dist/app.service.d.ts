import { PurchaseOrder } from './purchaseorder.entity';
import { Repository } from 'typeorm';
import { PurchaseOrderDTO } from './dto/purchaseOrderDTO';
import { Query } from 'express-serve-static-core';
export declare class AppService {
    private readonly purchaseOrder;
    constructor(purchaseOrder: Repository<PurchaseOrder>);
    createPurchaseOrder(purchaseOrderDTO: PurchaseOrderDTO): Promise<PurchaseOrder>;
    getAllPurchaseOrder(): Promise<PurchaseOrder[]>;
    getPurchaseOrderById(purchase_id: number): Promise<PurchaseOrder>;
    deletePurchaseOrder(purchase_id: number): Promise<"Not Deleted" | "Successfully Deleted">;
    getCountOfOrdersByStatus(status: string): Promise<number>;
    getCurrentMonthName(): string;
    searchAllOrders(query: Query): Promise<PurchaseOrder[]>;
}
