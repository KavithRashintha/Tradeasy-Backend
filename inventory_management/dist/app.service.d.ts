import { InventoryItemDTO } from "./dto/InventoryItemDTO";
import { Item } from "./inventoryItem.entity";
import { Repository } from "typeorm";
import { UpdateInventoryItemDTO } from "./dto/UpdateInventoryItemDTO";
export declare class AppService {
    private readonly inventoryItemRepository;
    constructor(inventoryItemRepository: Repository<Item>);
    addInventoryItem(inventoryItemDto: InventoryItemDTO): Promise<Item>;
    getInventoryItem(id: any): Promise<Item>;
    getAllInventoryItems(): Promise<Item[]>;
    updateInventoryItem(id: any, updatedInventoryItem: UpdateInventoryItemDTO): Promise<Item>;
    deleteInventoryItem(id: any): Promise<"Not Deleted" | "Successfully Deleted">;
}
