import { AppService } from './app.service';
import { InventoryItemDTO } from './dto/InventoryItemDTO';
import { Item } from './inventory.entity';
import { UpdateInventoryItemDTO } from './dto/UpdateInventoryItemDTO';
export declare class AppController {
    private readonly inventoryManagement;
    constructor(inventoryManagement: AppService);
    addInventoryItem(createInventoryItemDto: InventoryItemDTO): Promise<Item>;
    getInventoryItem(id: number): Promise<Item>;
    getInventoryItems(): Promise<Item[]>;
    updateInventoryItem(data: {
        id: number;
        updateInventoryItemDto: UpdateInventoryItemDTO;
    }): Promise<Item>;
    deleteInventoryItem(id: number): Promise<"Not Deleted" | "Successfully Deleted">;
    getInventoryItemByCategory(productCategory: string): Promise<Item[]>;
    getNumberOfItems(): Promise<any>;
}
