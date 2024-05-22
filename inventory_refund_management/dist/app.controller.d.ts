import { AppService } from './app.service';
import { InventoryRefundDTO } from './dto/inventoryRedundDTO';
import { InventoryRefund } from './inventory_refunds.entitiy';
export declare class AppController {
    private readonly inventoryRefundManagement;
    constructor(inventoryRefundManagement: AppService);
    createInventoryRefund(inventoryRefundDTO: InventoryRefundDTO): Promise<InventoryRefund>;
    getAllInventoryRefund(): Promise<InventoryRefund[]>;
    getInventoryRefundById(inventory_id: number): Promise<InventoryRefund>;
    deleteCustomerRefund(inventory_id: number): Promise<"Not Deleted" | "Successfully Deleted">;
    getAllApprovedRefunds(): Promise<InventoryRefund[]>;
}
