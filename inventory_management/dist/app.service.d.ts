import { Item } from './inventory.entity';
import { Repository } from 'typeorm';
import { InventoryItemDTO } from './dto/InventoryItemDTO';
import { UpdateInventoryItemDTO } from './dto/UpdateInventoryItemDTO';
export declare class AppService {
    private readonly itemRepository;
    constructor(itemRepository: Repository<Item>);
    addInventoryItem(createInventoryItemDto: InventoryItemDTO): Promise<Item>;
    getInventoryItem(id: number): Promise<Item>;
    getAllInventoryItems(): Promise<Item[]>;
    updateInventoryItem(id: number, updateInventoryItemDto: UpdateInventoryItemDTO): Promise<Item>;
    deleteInventoryItem(id: number): Promise<"Not Deleted" | "Successfully Deleted">;
    getInventoryItemByCategory(itemCategory: string): Promise<Item[]>;
}
