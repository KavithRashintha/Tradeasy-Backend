import { Injectable } from '@nestjs/common';
import {InventoryItemDTO} from "./dto/InventoryItemDTO";
import {Item} from "./inventoryItem.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {UpdateInventoryItemDTO} from "./dto/UpdateInventoryItemDTO";

@Injectable()
export class AppService {

  constructor(
      @InjectRepository(Item)
      private readonly inventoryItemRepository: Repository<Item>,
  ) {}

  async addInventoryItem(inventoryItemDto : InventoryItemDTO): Promise<Item> {
      return await this.inventoryItemRepository.save(inventoryItemDto);
  }

  async getInventoryItem(id:any): Promise<Item> {
    return await this.inventoryItemRepository.findOneById(id);
  }

  async getAllInventoryItems(): Promise<Item[]> {
    return await this.inventoryItemRepository.find();
  }

  async updateInventoryItem(id:any, updatedInventoryItem: UpdateInventoryItemDTO): Promise<Item> {
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
