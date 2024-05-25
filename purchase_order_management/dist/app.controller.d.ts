import { AppService } from './app.service';
import { PurchaseOrderDTO } from './dto/purchaseOrderDTO';
import { Query } from 'express-serve-static-core';
export declare class AppController {
    private readonly purchasedOrder;
    constructor(purchasedOrder: AppService);
    createPurchaseOrder(purchaseOrderDTO: PurchaseOrderDTO): Promise<PurchaseOrderDTO>;
    getAllPurchaseOrder(): Promise<PurchaseOrderDTO[]>;
    getPurchaseOrderById(purchase_id: number): Promise<PurchaseOrderDTO>;
    deletePurchaseOrder(purchase_id: number): Promise<"Not Deleted" | "Successfully Deleted">;
    getCountOfOrdersByStatus(status: string): Promise<number>;
    getCurrentMonthName(): string;
    searchAllOrders(query: Query): Promise<PurchaseOrderDTO[]>;
}
