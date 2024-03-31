import { AppService } from './app.service';
import { InventoryItemDTO } from "./dto/InventoryItemDTO";
import { UpdateInventoryItemDTO } from "./dto/UpdateInventoryItemDTO";
import { Item } from "./inventoryItem.entity";
export declare class AppController {
    private readonly inventoryManagement;
    constructor(inventoryManagement: AppService);
    addInventoryItem(inventoryItemDto: InventoryItemDTO): Promise<Item>;
    getInventoryItem(id: any): Promise<Item>;
    getAllInventoryItems(): Promise<Item[]>;
    updateInventoryItem(data: {
        id: number;
        updateItemDto: UpdateInventoryItemDTO;
    }): Promise<Item>;
    deleteInventoryItem(id: any): Promise<"Not Deleted" | "Successfully Deleted">;
}
