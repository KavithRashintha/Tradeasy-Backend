import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { InventoryItemDTO } from './dto/InventoryItemDTO';
import { Item } from './inventory.entity';
import { UpdateInventoryItemDTO } from './dto/UpdateInventoryItemDTO';

@Controller()
export class AppController {
  constructor(private readonly inventoryManagement: AppService) {}

  @MessagePattern({ cmd: 'ADD_INVENTORY_ITEM' })
  async addInventoryItem(
    @Payload() createInventoryItemDto: InventoryItemDTO,
  ): Promise<Item> {
    return await this.inventoryManagement.addInventoryItem(
      createInventoryItemDto,
    );
  }

  @MessagePattern({ cmd: 'GET_INVENTORY_ITEM' })
  async getInventoryItem(@Payload() id: number): Promise<Item> {
    return await this.inventoryManagement.getInventoryItem(id);
  }

  @MessagePattern({ cmd: 'GET_ALL_INVENTORY_ITEMS' })
  async getInventoryItems(): Promise<Item[]> {
    return await this.inventoryManagement.getAllInventoryItems();
  }

  @MessagePattern({ cmd: 'UPDATE_INVENTORY_ITEM' })
  async updateInventoryItem(
    @Payload()
    data: {
      id: number;
      updateInventoryItemDto: UpdateInventoryItemDTO;
    },
  ): Promise<Item> {
    const { id, updateInventoryItemDto } = data;
    return await this.inventoryManagement.updateInventoryItem(
      id,
      updateInventoryItemDto,
    );
  }

  @MessagePattern({ cmd: 'DELETE_INVENTORY_ITEM' })
  async deleteInventoryItem(@Payload() id: number) {
    return await this.inventoryManagement.deleteInventoryItem(id);
  }

  @MessagePattern({cmd: 'GET_INVENTORY_ITEM_BY_CATEGORY'})
  async getInventoryItemByCategory(@Payload() productCategory: string): Promise<Item[]> {
    return await this.inventoryManagement.getInventoryItemByCategory(productCategory);
  }
}