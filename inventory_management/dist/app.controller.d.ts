import { AppService } from './app.service';
import { InventoryItemDTO } from "./dto/InventoryItemDTO";
import { UpdateInventoryItemDTO } from "./dto/UpdateInventoryItemDTO";
export declare class AppController {
    private readonly inventoryManagement;
    constructor(inventoryManagement: AppService);
    addInventoryItem(inventoryItemDto: InventoryItemDTO): Promise<import("src/inventoryItem.entity").Item>;
    getInventoryItem(id: any): Promise<import("src/inventoryItem.entity").Item>;
    getAllInventoryItems(): Promise<import("src/inventoryItem.entity").Item[]>;
    updateInventoryItem(id: any, updatedInventoryItemDto: UpdateInventoryItemDTO): Promise<import("src/inventoryItem.entity").Item>;
    deleteInventoryItem(id: any): Promise<"Not Deleted" | "Successfully Deleted">;
}
