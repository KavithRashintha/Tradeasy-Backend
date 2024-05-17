import { AppService } from './app.service';
import { PurchaseOrderDTO } from './dto/purchaseOrderDTO';
export declare class AppController {
    private readonly purchasedOrder;
    constructor(purchasedOrder: AppService);
    createPurchaseOrder(purchaseOrderDTO: PurchaseOrderDTO): Promise<PurchaseOrderDTO>;
    getAllPurchaseOrder(): Promise<PurchaseOrderDTO[]>;
    getPurchaseOrderById(purchase_id: number): Promise<PurchaseOrderDTO>;
    deletePurchaseOrder(purchase_id: number): Promise<"Not Deleted" | "Successfully Deleted">;
    getCountOfOrdersByStatus(status: string): Promise<number>;
}
