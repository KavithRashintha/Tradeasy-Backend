import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {MessagePattern, Payload} from "@nestjs/microservices";
import {InventoryItemDTO} from "./dto/InventoryItemDTO";
import {UpdateInventoryItemDTO} from "./dto/UpdateInventoryItemDTO";
import {Item} from "./inventoryItem.entity";

@Controller()
export class AppController {
  constructor(private readonly inventoryManagement: AppService) {}

  @MessagePattern({cmd: "ADD_INVENTORY_ITEM"})
  async addInventoryItem(@Payload() inventoryItemDto : InventoryItemDTO){
    return await this.inventoryManagement.addInventoryItem(inventoryItemDto);
  }

  @MessagePattern({cmd: "GET_INVENTORY_ITEM"})
  async getInventoryItem(@Payload() id:any ){
    return await this.inventoryManagement.getInventoryItem(id);
  }

  @MessagePattern({cmd: "GET_ALL_INVENTORY_ITEMS"})
  async getAllInventoryItems(){
    return await this.inventoryManagement.getAllInventoryItems();
  }

  @MessagePattern({cmd: "UPDATE_INVENTORY_ITEM"})
  async updateInventoryItem(@Payload() data: { id: number, updateItemDto: UpdateInventoryItemDTO}): Promise<Item> {
    const { id, updateItemDto } = data;
    // @ts-ignore
    return await this.inventoryManagement.updateInventoryItem(id, updateItemDto);
  }

  @MessagePattern({cmd: 'DELETE_INVENTORY_ITEM'})
  async deleteInventoryItem(@Payload() id:any){
    return await this.inventoryManagement.deleteInventoryItem(id);
  }

}
