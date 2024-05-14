import { InventoryRefund } from './inventory_refunds.entitiy';
import { Repository } from 'typeorm';
import { InventoryRefundDTO } from './dto/inventoryRedundDTO';
export declare class AppService {
    private readonly inventoryRefundManagement;
    constructor(inventoryRefundManagement: Repository<InventoryRefund>);
    createInventoryRefund(inventoryRefundDTO: InventoryRefundDTO): Promise<InventoryRefund>;
    getAllInventoryRefund(): Promise<InventoryRefund[]>;
    getInventoryRefundById(inventory_id: number): Promise<InventoryRefund>;
    deleteCustomerRefund(inventory_id: number): Promise<"Not Deleted" | "Successfully Deleted">;
}
