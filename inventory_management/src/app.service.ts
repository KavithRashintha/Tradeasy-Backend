import { Injectable } from '@nestjs/common';
import {InventoryItemDTO} from "./dto/InventoryItemDTO";
import {InventoryItem} from "./inventoryItem.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {UpdateInventoryItemDTO} from "./dto/UpdateInventoryItemDTO";

@Injectable()
export class AppService {

  constructor(
      @InjectRepository(InventoryItem)
      private readonly inventoryItemRepository: Repository<InventoryItem>,
  ) {}

  async addInventoryItem(inventoryItemDto : InventoryItemDTO): Promise<InventoryItem> {
      return await this.inventoryItemRepository.save(inventoryItemDto);
  }

  async getInventoryItem(id:any): Promise<InventoryItem> {
    return await this.inventoryItemRepository.findOneById(id);
  }

  async getAllInventoryItems(): Promise<InventoryItem[]> {
    return await this.inventoryItemRepository.find();
  }

  async updateInventoryItem(id:any, updatedInventoryItem: UpdateInventoryItemDTO): Promise<InventoryItem> {
    await this.inventoryItemRepository.update(id, updatedInventoryItem);
    return await this.inventoryItemRepository.findOneById(id);
  }

  async deleteInventoryItem(id: any) {
    const result = await this.inventoryItemRepository.delete(id);
    if(!result){
      return "Not Deleted";
    }else{
      return "Successfully Deleted";
    }
  }
}
